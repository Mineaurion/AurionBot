import { CommandInteraction } from 'discord.js';
import { Discord, Slash } from 'discordx';
import { injectable } from 'tsyringe';
import { ServerService } from '../../services/serverService.js';
import { ServerState } from '../../tasks/serverState.js';

@Discord()
@injectable()
export class Serveur {
  constructor(
    private serverState: ServerState,
    private serverService: ServerService,
  ) {}

  @Slash({ name: 'serveur', description: "L'etat des serveurs" })
  async createIssueModal(interaction: CommandInteraction): Promise<void> {
    interaction.reply({
      content: '',
      embeds: [
        this.serverState.createEmbed(
          await this.serverService.getQueryServers(),
          true,
        ),
      ],
    });
  }
}
