import rss from '@astrojs/rss';
import { getAllActivity } from '../lib/activity';

export async function GET(context) {
  const activity = await getAllActivity();

  return rss({
    title: 'dailydevlog',
    description: 'A daily "learning in public" log of DSA problems and full-stack development notes.',
    site: context.site,
    items: activity.map((item) => ({
      title: item.title,
      description: item.summary,
      pubDate: item.date,
      link: item.href,
      categories: item.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
