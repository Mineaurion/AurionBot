import {
  APIEmbed,
  ApplicationCommandOptionType,
  AutocompleteInteraction,
  CommandInteraction,
  EmbedAuthorOptions,
  EmbedBuilder,
  EmbedFooterOptions,
  JSONEncodable,
} from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';
import { logger } from '../../main.js';
import { isSecondChoice, supportEmbed } from './config.js';

@Discord()
export class Support {
  @Slash('support')
  async support(
    @SlashOption('choix-1', {
      type: ApplicationCommandOptionType.String,
      autocomplete: true,
    })
    firstChoice: string,
    @SlashOption('choix-2', {
      type: ApplicationCommandOptionType.String,
      autocomplete: true,
      required: false,
    })
    secondChoice: string | undefined,
    interaction: CommandInteraction,
  ): Promise<unknown> {
    if (interaction.isAutocomplete()) {
      const autoInteraction = interaction as AutocompleteInteraction;
      const focusedOption = autoInteraction.options.getFocused(true);
      if (focusedOption.name === 'choix-1') {
        autoInteraction.respond(
          Object.keys(supportEmbed).map((keys) => {
            return { name: keys, value: keys };
          }),
        );
      } else if (focusedOption.name === 'choix-2') {
        if (firstChoice in supportEmbed) {
          autoInteraction.respond(
            Object.keys(supportEmbed[firstChoice]).map((keys) => {
              return { name: keys, value: keys };
            }),
          );
        }
      }
    } else {
      const author: EmbedAuthorOptions = {
        name: 'AurionBot',
        iconURL: 'https://i.imgur.com/oYd0rhO.png',
        url: 'https://mineaurion.com',
      };

      const footer: EmbedFooterOptions = {
        text: 'AurionBot',
        iconURL: 'https://i.imgur.com/oYd0rhO.png',
      };

      let choice = supportEmbed[firstChoice];

      if (isSecondChoice(choice)) {
        if (secondChoice === undefined) {
          return await interaction.reply({
            content: 'Tu dois choisir faire un deuxième choix sur la commande',
            ephemeral: true,
          });
        }
        choice = choice[secondChoice];
      }

      const embeds: (APIEmbed | JSONEncodable<APIEmbed>)[] = [];
      choice.forEach((embed) => {
        embeds.push(
          new EmbedBuilder()
            .setAuthor(author)
            .setFooter(footer)
            .setTimestamp()
            .setColor(embed.color)
            .setTitle(embed.title)
            .setImage(embed.image || null)
            .setURL(embed.url || null)
            .setDescription(embed.description || null)
            .addFields(...embed.fields),
        );
      });

      return await interaction.reply({ embeds });
    }
  }
}
