import { Client, EmbedBuilder } from 'discord.js';

export const updateChannelWithEmbed = async (
  client: Client,
  channelId: string,
  embed: EmbedBuilder | EmbedBuilder[],
): Promise<void> => {
  const channel = client.channels.cache.get(channelId);
  if (channel && channel.isTextBased() && !channel.isVoiceBased()) {
    const message = (await channel.messages.fetchPinned()).first();
    const payload = {
      content: ' ',
      embeds: Array.isArray(embed) ? embed : [embed],
    };
    if (message) {
      message.edit(payload);
    } else {
      (await channel.send(payload)).pin();
    }
  } else {
    throw new Error("This channel is not text based or doesn't exist");
  }
};
