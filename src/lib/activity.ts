import { getCollection, type CollectionEntry } from 'astro:content';
import { getAllTopics } from './ai-course';

export type ActivityKind = 'dsa' | 'daily-log' | 'ai-course';

export interface ActivityItem {
  kind: ActivityKind;
  slug: string;
  href: string;
  title: string;
  date: Date;
  summary: string;
  tags: string[];
}

function dsaToActivity(entry: CollectionEntry<'dsa'>): ActivityItem {
  return {
    kind: 'dsa',
    slug: entry.id,
    href: `/dsa/${entry.id}`,
    title: entry.data.title,
    date: entry.data.date,
    summary: entry.data.summary,
    tags: [entry.data.difficulty, ...entry.data.pattern],
  };
}

function dailyLogToActivity(entry: CollectionEntry<'daily-log'>): ActivityItem {
  return {
    kind: 'daily-log',
    slug: entry.id,
    href: `/daily-log/${entry.id}`,
    title: `Day ${entry.data.day}`,
    date: entry.data.date,
    summary: entry.data.summary,
    tags: entry.data.tags,
  };
}

export async function getAllActivity(): Promise<ActivityItem[]> {
  const [dsaEntries, dailyLogEntries, topics] = await Promise.all([
    getCollection('dsa', ({ data }) => !data.draft),
    getCollection('daily-log'),
    getAllTopics(),
  ]);

  const lessonItems: ActivityItem[] = topics.flatMap((topic) =>
    topic.lesson
      ? [
          {
            kind: 'ai-course' as const,
            slug: topic.slug,
            href: topic.href,
            title: `${topic.id} ${topic.title}`,
            date: topic.lesson.data.date,
            summary: topic.lesson.data.summary,
            tags: [topic.level, ...topic.lesson.data.tags],
          },
        ]
      : []
  );

  const items = [...dsaEntries.map(dsaToActivity), ...dailyLogEntries.map(dailyLogToActivity), ...lessonItems];

  return items.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getSortedActivityByKind(kind: ActivityKind): Promise<ActivityItem[]> {
  const all = await getAllActivity();
  return all.filter((item) => item.kind === kind);
}

export async function getStreak(): Promise<{ day: number; goal: number; lastDate: Date | null }> {
  const dailyLogEntries = await getCollection('daily-log');
  const goal = 120;
  if (dailyLogEntries.length === 0) return { day: 0, goal, lastDate: null };
  const sorted = [...dailyLogEntries].sort((a, b) => b.data.day - a.data.day);
  return { day: sorted[0].data.day, goal, lastDate: sorted[0].data.date };
}
