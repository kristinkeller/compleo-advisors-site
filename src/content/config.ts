import { defineCollection, z } from 'astro:content';

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    author: z.string().default('Kristin Marvin Keller'),
    date: z.coerce.date(),
    topic: z.string(),
    status: z.enum(['draft', 'published']).default('draft'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { insights };
