import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const dsa = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/dsa' }),
  schema: () =>
    z.object({
      title: z.string(),
      difficulty: z.enum(['Easy', 'Medium', 'Hard']),
      pattern: z.array(z.string()),
      date: z.coerce.date(),
      problemUrl: z.string().url().optional(),
      timeComplexity: z.string(),
      spaceComplexity: z.string(),
      summary: z.string(),
      draft: z.boolean().default(false),
    }),
});

const dailyLog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/daily-log' }),
  schema: () =>
    z.object({
      day: z.number(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      summary: z.string(),
      links: z
        .array(
          z.object({
            label: z.string(),
            href: z.string(),
          })
        )
        .default([]),
    }),
});

const level = z.enum(['L1', 'L2', 'L3', 'L4', 'L5']);
const maturity = z.enum(['Established', 'Emerging', 'Experimental', 'Hype']);

const courseOutline = (course: string) =>
  defineCollection({
    loader: file(`src/content/${course}/course.yaml`),
    schema: () =>
      z.object({
        number: z.number(),
        title: z.string(),
        summary: z.string(),
        modules: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            summary: z.string(),
            frontend: z.boolean().default(false),
            topics: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                slug: z.string().optional(),
                level,
                maturity: maturity.optional(),
                volatile: z.boolean().default(false),
              })
            ),
          })
        ),
      }),
  });

const courseLessons = (course: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: `./src/content/${course}/lessons` }),
    schema: () =>
      z.object({
        topic: z.string(),
        date: z.coerce.date(),
        lastVerified: z.coerce.date().optional(),
        summary: z.string(),
        estimatedMinutes: z.number(),
        prerequisites: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
        references: z
          .array(
            z.object({
              title: z.string(),
              source: z.string(),
              url: z.string().url(),
              tier: z.enum(['must', 'should', 'optional']),
              level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
              why: z.string(),
            })
          )
          .default([]),
        draft: z.boolean().default(false),
      }),
  });

// Course ids must match COURSES in src/lib/courses.ts.
export const collections = {
  dsa,
  'daily-log': dailyLog,
  'ai-course': courseOutline('ai-course'),
  'ai-course-lessons': courseLessons('ai-course'),
  'ai-native-engineering': courseOutline('ai-native-engineering'),
  'ai-native-engineering-lessons': courseLessons('ai-native-engineering'),
};
