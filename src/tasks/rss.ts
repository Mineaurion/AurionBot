import { singleton } from 'tsyringe';
import { client, logger } from '../main.js';
import { Discord } from 'discordx';
import FeedEmitter from 'rss-feed-emitter';

@Discord()
@singleton()
export class Rss {
  private urlRss =
    process.env.URL_RSS || 'https://forum.mineaurion.com/category/1.rss';

  private CHANNEL_ID =
    process.env.NODE_ENV === 'production'
      ? '208876822388015104'
      : '995323098192683019';

  constructor() {
    logger.debug('RSS - Watching url ' + this.urlRss);
    const feeder = new FeedEmitter({ skipFirstLoad: true });
    feeder.add({
      url: this.urlRss,
      refresh: 5 * 60,
    });
    feeder.on('new-item', (item: Record<string, string>) =>
      this.sendMessage(item),
    );
  }

  private async sendMessage(item: Record<string, string>): Promise<void> {
    if (item.link) {
      const channel = client.channels.cache.get(this.CHANNEL_ID);
      const cleanLink = item.link.substring(0, item.link.lastIndexOf('/'));
      logger.debug('Publishing new topic on forum');
      if (channel && channel.isTextBased() && !channel.isVoiceBased()) {
        await channel.send(`📢 ${cleanLink}`);
      }
    }
  }
}
