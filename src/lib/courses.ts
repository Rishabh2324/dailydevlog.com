import { getCollection, type CollectionEntry } from 'astro:content';

type SeasonData = CollectionEntry<'ai-course'>['data'];
type ModuleData = SeasonData['modules'][number];
type TopicData = ModuleData['topics'][number];
type LessonEntry = CollectionEntry<'ai-course-lessons'> | CollectionEntry<'ai-native-engineering-lessons'>;

export type Level = TopicData['level'];
type LevelVariant = 'green-soft' | 'blue' | 'purple' | 'orange' | 'pink';

const LEVEL_VARIANTS: Record<Level, LevelVariant> = {
  L1: 'green-soft',
  L2: 'blue',
  L3: 'purple',
  L4: 'orange',
  L5: 'pink',
};

/**
 * Every course on the site. The key is both the URL segment and the content folder
 * (`src/content/<id>/`), whose outline and lessons are the `<id>` and `<id>-lessons` collections.
 */
export const COURSES = {
  'ai-course': {
    name: 'AI Engineering',
    navLabel: 'AI Course',
    eyebrow: 'Self-paced · written · build-first',
    headline: 'AI Engineering, from first principles to production',
    intro:
      'A written course for software engineers who want to build real AI products: how LLMs work, prompting and APIs, embeddings, RAG, tools, agents, MCP, evaluation, security and production architecture. Concepts first, frameworks second, TypeScript throughout.',
    loop: 'Understand → Visualize → Explain → Build → Break → Debug → Apply',
    description:
      'A self-paced, written AI engineering curriculum for software engineers — from how LLMs work to production RAG, agents and MCP.',
    levels: {
      L1: { label: 'Foundation', description: 'I can explain it' },
      L2: { label: 'Practical', description: 'I can build it' },
      L3: { label: 'Engineering', description: 'I can design it' },
      L4: { label: 'Advanced', description: 'I understand the internals' },
      L5: { label: 'Production', description: 'I can operate it at scale' },
    },
  },
  'ai-native-engineering': {
    name: 'AI-Native Software Engineering',
    navLabel: 'AI-Native SWE',
    eyebrow: 'Self-paced · written · workflow-first',
    headline: 'AI-Native Software Engineering',
    intro:
      'How developers use AI to design, build, test, ship, maintain and automate software — across the whole lifecycle, from requirements and architecture to code review, CI/CD and incident response. AI augments engineering judgment; it never replaces it.',
    loop: 'Understand → Plan → Contextualize → Generate → Verify → Review → Ship → Learn → Automate',
    description:
      'A self-paced, written course on using AI across the software development lifecycle with strong engineering judgment.',
    levels: {
      L1: { label: 'Aware', description: 'I can explain the workflow' },
      L2: { label: 'Practitioner', description: 'I use it on real tasks' },
      L3: { label: 'Designer', description: 'I can design the workflow' },
      L4: { label: 'Expert', description: 'I know its limits and failure modes' },
      L5: { label: 'Leader', description: 'I can roll it out to a team' },
    },
  },
} as const satisfies Record<string, CourseConfig>;

interface CourseConfig {
  name: string;
  navLabel: string;
  eyebrow: string;
  headline: string;
  intro: string;
  loop: string;
  description: string;
  levels: Record<Level, { label: string; description: string }>;
}

export type CourseId = keyof typeof COURSES;
export const COURSE_IDS = Object.keys(COURSES) as CourseId[];

export function courseHref(course: CourseId): string {
  return `/${course}`;
}

export function levelInfo(course: CourseId, level: Level) {
  return { ...COURSES[course].levels[level], variant: LEVEL_VARIANTS[level] };
}

export interface Topic extends TopicData {
  slug: string;
  href: string;
  lesson?: LessonEntry;
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function moduleSlug(id: string): string {
  return `module-${id.replace(/\./g, '-')}`;
}

const cache = new Map<CourseId, Promise<Season[]>>();

/** A course outline with published lessons attached. Throws on broken references so bad links fail the build. */
export function getCourse(course: CourseId): Promise<Season[]> {
  if (!cache.has(course)) cache.set(course, loadCourse(course));
  return cache.get(course)!;
}

async function loadCourse(course: CourseId): Promise<Season[]> {
  const [seasonEntries, lessonEntries] = await Promise.all([
    getCollection(course),
    getCollection(`${course}-lessons`, ({ data }) => !data.draft) as Promise<LessonEntry[]>,
  ]);

  const tag = `[${course}]`;
  const lessonsByTopic = new Map<string, LessonEntry>();
  for (const lesson of lessonEntries) {
    if (lessonsByTopic.has(lesson.data.topic)) {
      throw new Error(`${tag} Two lessons claim topic "${lesson.data.topic}"`);
    }
    lessonsByTopic.set(lesson.data.topic, lesson);
  }
  const seenSlugs = new Set<string>();
  const topicIds = new Set<string>();

  const seasons = seasonEntries
    .sort((a, b) => a.data.number - b.data.number)
    .map(({ id, data }) => ({
      ...data,
      id,
      modules: data.modules.map((mod) => {
        const href = `${courseHref(course)}/${moduleSlug(mod.id)}`;
        return {
          ...mod,
          href,
          seasonNumber: data.number,
          topics: mod.topics.map((topic) => {
            const slug = topic.slug ?? slugify(topic.title);
            if (seenSlugs.has(slug)) throw new Error(`${tag} Duplicate topic slug "${slug}"`);
            seenSlugs.add(slug);
            topicIds.add(topic.id);
            return { ...topic, slug, href: `${href}/${slug}`, moduleId: mod.id, lesson: lessonsByTopic.get(topic.id) };
          }),
        };
      }),
    }));

  for (const lesson of lessonEntries) {
    if (!topicIds.has(lesson.data.topic)) {
      throw new Error(`${tag} Lesson "${lesson.id}" has unknown topic "${lesson.data.topic}"`);
    }
    for (const prereq of lesson.data.prerequisites) {
      if (!topicIds.has(prereq)) {
        throw new Error(`${tag} Lesson "${lesson.id}" has unknown prerequisite "${prereq}"`);
      }
    }
  }

  return seasons;
}

export async function getAllTopics(course: CourseId): Promise<Topic[]> {
  return (await getCourse(course)).flatMap((season) => season.modules.flatMap((mod) => mod.topics));
}
