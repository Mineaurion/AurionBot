import { singleton } from 'tsyringe';
import { Octokit } from 'octokit';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

@singleton()
export class IssueService {
  private octokit: Octokit;
  private github = {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    owner: process.env.GITHUB_REPO_OWNER!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    repo: process.env.GITHUB_REPO_NAME!,
  };

  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
  }

  public async createIssue(
    title: string,
    body: string,
  ): Promise<RestEndpointMethodTypes['issues']['create']['response']> {
    return this.octokit.rest.issues.create({
      owner: this.github.owner,
      repo: this.github.repo,
      title,
      body,
    });
  }
}
