package com.gsl;

import com.google.inject.Provides;
import lombok.extern.slf4j.Slf4j;
import net.runelite.api.Client;
import net.runelite.api.GameState;
import net.runelite.api.events.GameStateChanged;
import net.runelite.client.config.ConfigManager;
import net.runelite.client.eventbus.Subscribe;
import net.runelite.client.events.ServerNpcLoot;
import net.runelite.client.game.ItemStack;
import net.runelite.client.plugins.Plugin;
import net.runelite.client.plugins.PluginDescriptor;
import okhttp3.OkHttpClient;

import javax.inject.Inject;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ScheduledExecutorService;

@PluginDescriptor(
	name = "Gielinor Scavenger League",
	description = "Automatic drop tracking for the GSL weekly competition",
	tags = {"competition", "scavenger", "bingo", "drops", "loot", "league"}
)
@Slf4j
public class GslPlugin extends Plugin
{
	@Inject
	private Client client;

	@Inject
	private GslConfig config;

	@Inject
	private OkHttpClient okHttpClient;

	@Inject
	private ScheduledExecutorService executor;

	private GslApiClient apiClient;
	private Set<Integer> activeSeasonItemIds = new HashSet<>();

	@Override
	protected void startUp() throws Exception
	{
		log.info("GSL: Plugin starting up");
		apiClient = new GslApiClient(okHttpClient, config.apiUrl());
		refreshBoard();
	}

	@Override
	protected void shutDown() throws Exception
	{
		log.info("GSL: Plugin shutting down");
		activeSeasonItemIds.clear();
	}

	@Provides
	GslConfig provideConfig(ConfigManager configManager)
	{
		return configManager.getConfig(GslConfig.class);
	}

	/**
	 * Refresh the board item IDs from the API on a background thread.
	 */
	private void refreshBoard()
	{
		executor.submit(() ->
		{
			try
			{
				apiClient.setBaseUrl(config.apiUrl());
				Set<Integer> itemIds = apiClient.fetchBoardItemIds();
				if (!itemIds.isEmpty())
				{
					activeSeasonItemIds = itemIds;
					log.info("GSL: Board refreshed with {} items", itemIds.size());
				}
			}
			catch (Exception e)
			{
				log.warn("GSL: Failed to refresh board", e);
			}
		});
	}

	/**
	 * Refresh board when the player logs in.
	 */
	@Subscribe
	public void onGameStateChanged(GameStateChanged event)
	{
		if (event.getGameState() == GameState.LOGGED_IN)
		{
			refreshBoard();
		}
	}

	/**
	 * Primary loot detection: fires when an NPC drops loot.
	 * This is the same event used by RuneLite's built-in loot tracker.
	 */
	@Subscribe
	public void onServerNpcLoot(ServerNpcLoot event)
	{
		if (!config.enabled())
		{
			return;
		}

		if (activeSeasonItemIds.isEmpty())
		{
			return;
		}

		String rsn = client.getLocalPlayer() != null ? client.getLocalPlayer().getName() : null;
		if (rsn == null)
		{
			return;
		}

		int npcId = event.getComposition().getId();
		Collection<ItemStack> items = event.getItems();

		for (ItemStack item : items)
		{
			int itemId = item.getId();
			int quantity = item.getQuantity();

			if (activeSeasonItemIds.contains(itemId))
			{
				log.info("GSL: Board item detected! Item {} (qty: {}) from NPC {}",
					itemId, quantity, npcId);

				final String playerName = rsn;
				final int world = client.getWorld();

				executor.submit(() ->
				{
					try
					{
						GslApiClient.DropResponse response =
							apiClient.submitDrop(playerName, itemId, npcId, quantity, world);

						if (response.success)
						{
							log.info("GSL: Drop submitted - {} (Points: {})",
								response.message, response.totalPoints);
						}
						else
						{
							log.warn("GSL: Drop submission failed - {}", response.message);
						}
					}
					catch (Exception e)
					{
						log.warn("GSL: Failed to submit drop", e);
					}
				});
			}
		}
	}
}
