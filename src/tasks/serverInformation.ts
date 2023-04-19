import { EmbedBuilder } from 'discord.js';
import { container, singleton } from 'tsyringe';
import { client, logger } from '../main.js';
import { ServerService } from '../services/serverService.js';
import { QueryAccess, QueryServer } from '@mineaurion/api';
import { updateChannelWithEmbed } from './utils.js';
import { Discord } from 'discordx';

enum Access {
  donator = 'Donateur',
  beta = 'Beta',
  paying = 'Payant',
}

enum ServerTypeLogo {
  overworld = 'https://imgur.com/E8XrmcT.png',
  skyblock = 'https://i.imgur.com/SEKeq2O.png',
  default = 'https://imgur.com/Fww10bp.png',
}

@Discord()
@singleton()
export class ServerInformation {
  private CHANNEL_ID =
    process.env.NODE_ENV === 'production'
      ? '959838565842444308'
      : '995323049467457687';

  private noPlayer = 'Aucun joueur connecté.\n';

  constructor() {
    if (process.env.TASKS_DISABLE !== 'true') {
      setInterval(async () => {
        logger.info('Update server information message');
        const serverService = container.resolve(ServerService);
        updateChannelWithEmbed(
          client,
          this.CHANNEL_ID,
          this.createEmbed(await serverService.getQueryServers()),
        );
      }, 600 * 3);
    }
  }

  private createEmbed(queryServers: QueryServer[]): EmbedBuilder[] {
    const embeds = [] as EmbedBuilder[];
    try {
      queryServers.forEach((server) => {
        const tags: string[] = [];
        let infoServer = '';
        (Object.keys(server.access) as (keyof QueryAccess)[]).forEach((key) => {
          if (key in Access && server.access[key]) {
            tags.push(Access[key]);
          }
        });

        if (tags.length > 0) {
          infoServer += '- ';
          tags.forEach((tag) => (infoServer += `\`${tag}\` `));
        }

        const embed = new EmbedBuilder()
          .setTitle(`${server.name} ${infoServer}`)
          .setColor(server.status ? 'Green' : 'Red');
        let players = this.noPlayer;

        if (server.players.length > 0) {
          players = this.getPlayersName(server.players);
        }

        embed.addFields(
          {
            name: 'Version',
            value: ' ',
            inline: true,
          },
          {
            name: `Minecraft \`${server.version.minecraft}\``,
            value: ' ',
            inline: true,
          },
          {
            name: `Modpack \`${server.version.modpack}\``,
            value: ' ',
            inline: true,
          },
          {
            name: `Joueur(s) connecté(s): ${server.onlinePlayers}/${server.maxPlayers}`,
            value: players,
            inline: true,
          },
        );
        if (server.schedule.nextReboot) {
          const nextSchedule: string = server.schedule.nextReboot.toString();
          embed.addFields({
            name: 'Redémarrage',
            value: `<t:${nextSchedule}:R>`,
            inline: true,
          });
        }
        embed.setThumbnail(
          this.isServerTypeLogo(server.type)
            ? ServerTypeLogo[server.type]
            : ServerTypeLogo.default,
        );
        embeds.push(embed);
      });
    } catch (error) {
      logger.error('Error when looking for queryServer');
      logger.error(error);
    }
    return embeds;
  }
  private getPlayersName(players: string[]): string {
    const playersName: string[] = [''];
    let playersNameIndex = 0;
    players.forEach((player) => {
      const nextLenght =
        playersName[playersNameIndex].length + `\`${player}\``.length;
      if (nextLenght >= 32) {
        playersNameIndex += 1;
        playersName[playersNameIndex] = '';
      }
      playersName[playersNameIndex] += `\`${player}\` `;
    });
    return playersName.join('\n');
  }

  private isServerTypeLogo(
    maybeServerType: string,
  ): maybeServerType is keyof typeof ServerTypeLogo {
    return maybeServerType in ServerTypeLogo;
  }
}
