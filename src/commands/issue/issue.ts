import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';
import { injectable } from 'tsyringe';
import { IssueService } from './issueService.js';

@Discord()
@injectable()
export class Issue {
  constructor(private issueService: IssueService) {}

  @Slash('issue')
  async createIssue(
    @SlashOption('title', {
      type: ApplicationCommandOptionType.String,
      description: 'Titre du ticket',
      required: true,
    })
    title: string,
    @SlashOption('body', {
      type: ApplicationCommandOptionType.String,
      description: 'Body du ticket',
      required: true,
    })
    body: string,
    interaction: CommandInteraction,
  ): Promise<unknown> {
    await interaction.deferReply();
    const issue = await this.issueService.createIssue(title, body);
    interaction.editReply({
      content: 'Link ' + issue.data.html_url,
    });
    return;
  }
}
