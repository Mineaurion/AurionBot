import {
  ActionRowBuilder,
  ApplicationCommandType,
  CommandInteraction,
  MessageContextMenuCommandInteraction,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { ContextMenu, Discord, ModalComponent, Slash } from 'discordx';
import { injectable } from 'tsyringe';
import { IssueService } from './issueService.js';

@Discord()
@injectable()
export class Issue {
  constructor(private issueService: IssueService) {}

  @Slash('issue')
  async createIssueModal(interaction: CommandInteraction): Promise<void> {
    await this.showModal(interaction);
  }

  @ContextMenu(ApplicationCommandType.Message, 'Créer un ticket')
  async contextHandler(
    interaction: MessageContextMenuCommandInteraction,
  ): Promise<void> {
    await this.showModal(
      interaction,
      interaction.targetMessage.content +
        `\n Discord Link : ${interaction.targetMessage.url}`,
    );
  }

  @ModalComponent('modal-ticket')
  async handleModal(interaction: ModalSubmitInteraction): Promise<void> {
    const issue = await this.issueService.createIssue(
      interaction.fields.getTextInputValue('title'),
      interaction.fields.getTextInputValue('body'),
    );
    await interaction.reply({
      content: 'Lien du ticket ' + issue.data.html_url,
    });
  }

  private async showModal(
    interaction: CommandInteraction | MessageContextMenuCommandInteraction,
    body?: string,
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const channelName = interaction.channel.name as string;

    const modal = new ModalBuilder()
      .setTitle('Création du ticket')
      .setCustomId('modal-ticket');

    const defaultBody = `# ${channelName}\n\n#### Owner: ${
      interaction.user.username
    }\n---\n ## Description:\n---\n ${body || 'description with quality\n---\n'}`;

    modal.addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId('title')
          .setLabel('Titre du ticket')
          .setStyle(TextInputStyle.Short),
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId('body')
          .setLabel('Description')
          .setStyle(TextInputStyle.Paragraph)
          .setValue(defaultBody),
      ),
    );
    await interaction.showModal(modal);
  }
}
