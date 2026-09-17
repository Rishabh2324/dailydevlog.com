import { getCollection, type CollectionEntry } from 'astro:content';

type SeasonData = CollectionEntry<'ai-course'>['data'];
type ModuleData = SeasonData['modules'][number];
type TopicData = ModuleData['topics'][number];

export type Level = TopicData['level'];

export interface Topic extends TopicData {
  slug: string;
  href: string;
  lesson?: CollectionEntry<'ai-lessons'>;
  moduleId: string;
}

export interface Module extends Omit<ModuleData, 'topics'> {
  href: string;
  seasonNumber: number;
  topics: Topic[];
}

export interface Season extends Omit<SeasonData, 'modules'> {
  id: string;
  modules: Module[];
}

export const LEVELS: Record<Level, { label: string; description: string; variant: 'green-soft' | 'blue' | 'purple' | 'orange' | 'pink' }> = {
  L1: { label: 'Foundation', description: 'I can explain it', variant: 'green-soft' },
  L2: { label: 'Practical', description: 'I can build it', variant: 'blue' },
  L3: { label: 'Engineering', description: 'I can design it', variant: 'purple' },
  L4: { label: 'Advanced', description: 'I understand the internals', variant: 'orange' },
  L5: { label: 'Production', description: 'I can operate it at scale', variant: 'pink' },
};

export const COURSE_HREF = '/ai-course';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function moduleSlug(id: string): string {
  return `module-${id.replace(/\./g, '-')}`;
}

let cache: Promise<Season[]> | undefined;

/** The full course outline with published lessons attached. Throws on broken references so bad links fail the build. */
export function getCourse(): Promise<Season[]> {
  cache ??= loadCourse();
  return cache;
}

async function loadCourse(): Promise<Season[]> {
  const [seasonEntries, lessonEntries] = await Promise.all([
    getCollection('ai-course'),
    getCollection('ai-lessons', ({ data }) => !data.draft),
  ]);

  const lessonsByTopic = new Map(lessonEntries.map((lesson) => [lesson.data.topic, lesson]));
  const seenSlugs = new Set<string>();
  const topicIds = new Set<string>();

  const seasons = seasonEntries
    .sort((a, b) => a.data.number - b.data.number)
    .map(({ id, data }) => ({
      ...data,
      id,
      modules: data.modules.map((mod) => {
        const href = `${COURSE_HREF}/${moduleSlug(mod.id)}`;
        return {
          ...mod,
          href,
          seasonNumber: data.number,
          topics: mod.topics.map((topic) => {
            const slug = topic.slug ?? slugify(topic.title);
            if (seenSlugs.has(slug)) throw new Error(`[ai-course] Duplicate topic slug "${slug}"`);
            seenSlugs.add(slug);
            topicIds.add(topic.id);
            return { ...topic, slug, href: `${href}/${slug}`, moduleId: mod.id, lesson: lessonsByTopic.get(topic.id) };
          }),
        };
      }),
    }));

  for (const lesson of lessonEntries) {
    if (!topicIds.has(lesson.data.topic)) {
      throw new Error(`[ai-course] Lesson "${lesson.id}" has unknown topic "${lesson.data.topic}"`);
    }
    for (const prereq of lesson.data.prerequisites) {
      if (!topicIds.has(prereq)) {
        throw new Error(`[ai-course] Lesson "${lesson.id}" has unknown prerequisite "${prereq}"`);
      }
    }
  }

  return seasons;
}

export async function getAllModules(): Promise<Module[]> {
  return (await getCourse()).flatMap((season) => season.modules);
}

export async function getAllTopics(): Promise<Topic[]> {
  return (await getAllModules()).flatMap((mod) => mod.topics);
}

export async function getTopicById(id: string): Promise<Topic | undefined> {
  return (await getAllTopics()).find((topic) => topic.id === id);
}
