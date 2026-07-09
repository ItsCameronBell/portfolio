import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    repo: z.url().optional(),
    demo: z.url().optional(),
    stack: z.array(z.string()).default([]),
    order: z.number().default(0),
    ai: z.enum(['full', 'partial', 'none']).optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    url: z.url().optional(),
    range: z.string(),
    order: z.number().default(0),
    roles: z
      .array(
        z.object({
          title: z.string(),
          range: z.string().optional(),
          salary: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/education' }),
  schema: z.object({
    degree: z.string(),
    institution: z.string(),
    url: z.url().optional(),
    range: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { posts, projects, experience, education };
