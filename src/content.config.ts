import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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

export const collections = { dsa, 'daily-log': dailyLog };
