import { EmbedBuilder } from 'discord.js';
import { container, singleton } from 'tsyringe';
import { client } from '../main.js';
import { ServerService } from '../services/serverService.js';
import { QueryAccess, QueryServer } from '@mineaurion/api';
import { updateChannelWithEmbed } from './utils.js';
import { Discord } from 'discordx';

enum Access {
  donator = 'Donateur',
  beta = 'Beta',
  paying = 'Payant',
}

@Discord()
@singleton()
export class ServerInformation {
  private CHANNEL_ID = '959838565842444308';

  constructor() {
    if (process.env.TASKS === 'true') {
      setInterval(async () => {
        console.log('Update server information message');
        const serverService = container.resolve(ServerService);
        updateChannelWithEmbed(
          client,
          this.CHANNEL_ID,
          this.createEmbed(await serverService.getQueryServers()),
        );
      }, 60000 * 3);
    }
  }

  private createEmbed(queryServers: QueryServer[]): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setTitle('📈 Versions des serveurs')
      .setColor(3447003)
      .setFooter({
        text: 'Mineaurion',
        iconURL:
          'https://forum.mineaurion.com/assets/uploads/system/touchicon-36.png',
      });
    try {
      queryServers.forEach((server) => {
        let infoServer = `${server.name} `;
        let details = '';
        const tags: string[] = [];

        (Object.keys(server.access) as (keyof QueryAccess)[]).forEach((key) => {
          if (key in Access && server.access[key]) {
            tags.push(Access[key]);
          }
        });
        if (tags.length > 0) {
          infoServer += `\`${tags.join(' - ')}\``;
        }
        if (tags.includes(Access.paying)) {
          details +=
            '**Serveur en accès payant, visitez la boutique [ici](https://shop.mineaurion.com)**\n';
        }
        details += `Adresse : \`${server.dns}\`\n`;
        details += `Version Minecraft : ${server.version.minecraft}\n`;
        details += `Version Serveur : ${server.version.modpack}\n`;
        details += `Type : ${server.type}\n`;
        if (server.schedule.reboot && server.schedule.reboot.length > 0) {
          details += `Heures de reboot : ${server.schedule.reboot.join(' - ')}`;
        }
        embed.addFields({ name: infoServer, value: details });
      });
    } catch (error) {
      console.error('Error when looking for queryServer');
      console.error(error);
    }
    return embed;
  }
}
