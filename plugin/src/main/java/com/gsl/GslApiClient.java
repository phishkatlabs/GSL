package com.gsl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * HTTP client for communicating with the GSL backend API.
 * Uses OkHttpClient which is bundled with RuneLite.
 */
@Slf4j
public class GslApiClient
{
	private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
	private static final String USER_AGENT = "GSL-RuneLite-Plugin/1.0";

	private final OkHttpClient httpClient;
	private final Gson gson;
	private String baseUrl;

	public GslApiClient(OkHttpClient httpClient, String baseUrl)
	{
		this.httpClient = httpClient;
		this.gson = new Gson();
		this.baseUrl = baseUrl;
	}

	public void setBaseUrl(String baseUrl)
	{
		this.baseUrl = baseUrl;
	}

	/**
	 * Fetch the active season's board item IDs from the API.
	 * Returns a set of OSRS item IDs that are on the current board.
	 */
	public Set<Integer> fetchBoardItemIds() throws IOException
	{
		Request request = new Request.Builder()
			.url(baseUrl + "/api/board?season=active")
			.header("User-Agent", USER_AGENT)
			.get()
			.build();

		try (Response response = httpClient.newCall(request).execute())
		{
			if (!response.isSuccessful() || response.body() == null)
			{
				log.warn("GSL: Failed to fetch board: {}", response.code());
				return new HashSet<>();
			}

			String body = response.body().string();
			JsonObject json = gson.fromJson(body, JsonObject.class);
			JsonArray board = json.getAsJsonArray("board");

			Set<Integer> itemIds = new HashSet<>();
			for (JsonElement element : board)
			{
				JsonObject tile = element.getAsJsonObject();
				itemIds.add(tile.get("itemId").getAsInt());
			}

			log.info("GSL: Loaded {} board items for active season", itemIds.size());
			return itemIds;
		}
	}

	/**
	 * Submit a drop event to the GSL API.
	 */
	public DropResponse submitDrop(String rsn, int itemId, int npcId, int quantity, int world)
		throws IOException
	{
		JsonObject payload = new JsonObject();
		payload.addProperty("rsn", rsn);
		payload.addProperty("itemId", itemId);
		payload.addProperty("npcId", npcId);
		payload.addProperty("quantity", quantity);
		payload.addProperty("world", world);
		payload.addProperty("timestamp", System.currentTimeMillis() / 1000);

		RequestBody requestBody = RequestBody.create(JSON, gson.toJson(payload));

		Request request = new Request.Builder()
			.url(baseUrl + "/api/drop")
			.header("User-Agent", USER_AGENT)
			.post(requestBody)
			.build();

		try (Response response = httpClient.newCall(request).execute())
		{
			if (response.body() == null)
			{
				return new DropResponse(false, "No response body", 0);
			}

			String body = response.body().string();

			if (!response.isSuccessful())
			{
				JsonObject error = gson.fromJson(body, JsonObject.class);
				String message = error.has("error") ? error.get("error").getAsString() : "Unknown error";
				return new DropResponse(false, message, 0);
			}

			JsonObject json = gson.fromJson(body, JsonObject.class);
			boolean tileCompleted = json.get("tileCompleted").getAsBoolean();
			int totalPoints = json.get("totalPoints").getAsInt();
			String itemName = json.has("item") ? json.get("item").getAsString() : "Unknown";

			return new DropResponse(true, tileCompleted ? "New tile: " + itemName : "Drop logged", totalPoints);
		}
	}

	/**
	 * Response from the drop submission API.
	 */
	public static class DropResponse
	{
		public final boolean success;
		public final String message;
		public final int totalPoints;

		public DropResponse(boolean success, String message, int totalPoints)
		{
			this.success = success;
			this.message = message;
			this.totalPoints = totalPoints;
		}
	}
}
