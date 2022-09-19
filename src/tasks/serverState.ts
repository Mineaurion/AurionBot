import { EmbedBuilder } from 'discord.js';
import { container, singleton } from 'tsyringe';
import { client, logger } from '../main.js';
import { ServerService } from '../services/serverService.js';
import { QueryServer } from '@mineaurion/api';
import { updateChannelWithEmbed } from './utils.js';
import { format } from 'util';
import { Discord } from 'discordx';

@Discord()
@singleton()
export class ServerState {
  private CHANNEL_ID =
    process.env.NODE_ENV === 'production'
      ? '940932749676642324'
      : '995323098192683019';

  private noPlayer = 'Aucun joueur connecté.\n';

  private singularPlayer = '%s joueur connecté %s';
  private pluralPlayer = '%s joueurs connectés %s\n';

  private singularTotalPlayer = '%s joueur connecté.\n';
  private pluralTotalPlayer = '%s joueurs connectés.\n';

  constructor() {
    if (process.env.TASKS_DISABLE !== 'true') {
      setInterval(async () => {
        logger.info('Update server state message');
        const serverService = container.resolve(ServerService);
        updateChannelWithEmbed(
          client,
          this.CHANNEL_ID,
          this.createEmbed(await serverService.getQueryServers()),
        );
      }, 60000 * 3);
    }
  }

  public createEmbed(
    queryServers: QueryServer[],
    displayPlayer = true,
  ): EmbedBuilder {
    const date = new Date().toLocaleDateString('fr-FR', {
      minute: 'numeric',
      hour: 'numeric',
      timeZone: 'Europe/Paris',
    });
    const embed = new EmbedBuilder()
      .setTitle('📈 État des Serveurs')
      .setColor(3447003)
      .setFooter({
        text: `Mineaurion\nLe ${date}`,
        iconURL:
          'https://forum.mineaurion.com/assets/uploads/system/touchicon-36.png',
      });
    let totalPlayer = 0;
    queryServers.forEach((server) => {
      const status = server.status ? '✅' : '❌';
      let players = this.noPlayer;
      if (server.players.length > 0) {
        players = format(
          server.players.length === 1 ? this.singularPlayer : this.pluralPlayer,
          server.onlinePlayers,
          displayPlayer ? ': ' + this.getPlayersName(server.players) : '',
        );
      }
      embed.addFields({
        name: `${server.name} : `,
        value: `\`${server.dns}\` ${status}\n${players}`,
      });
      totalPlayer += server.onlinePlayers;
    });

    embed.addFields({
      name: 'Nombre total de joueur(s) connecté(s):',
      value: this.getTextTotalPlayer(totalPlayer),
    });

    return embed;
  }

  private getPlayersName(players: string[]): string {
    let playersName = '';
    players.forEach((player, index) => {
      playersName += `\`${player}\``;
      if (index < players.length - 1) {
        playersName += ',';
      }
    });
    return playersName;
  }

  private getTextTotalPlayer(totalPlayer: number): string {
    let textTotalPlayer = this.noPlayer;
    if (totalPlayer > 0) {
      textTotalPlayer = format(
        totalPlayer === 1 ? this.singularTotalPlayer : this.pluralTotalPlayer,
        totalPlayer,
      );
    }
    return textTotalPlayer;
  }
}
