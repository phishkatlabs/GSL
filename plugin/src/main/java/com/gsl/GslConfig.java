package com.gsl;

import net.runelite.client.config.Config;
import net.runelite.client.config.ConfigGroup;
import net.runelite.client.config.ConfigItem;

@ConfigGroup("gsl")
public interface GslConfig extends Config
{
	@ConfigItem(
		keyName = "apiUrl",
		name = "API URL",
		description = "Gielinor Scavenger League server URL"
	)
	default String apiUrl()
	{
		return "https://gsl.vercel.app";
	}

	@ConfigItem(
		keyName = "enabled",
		name = "Enable Tracking",
		description = "Enable automatic drop submission to GSL"
	)
	default boolean enabled()
	{
		return true;
	}
}
