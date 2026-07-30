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
  }),
});

/*
 * Tenure is stored to the month so a six-month stint reads as one. Quoted in
 * frontmatter because bare YYYY-MM-DD would parse as a YAML timestamp, and a
 * Date here would only have to be turned back into a month.
 */
const month = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Expected a month as "YYYY-MM", e.g. "2025-06"');

const experience = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experience' }),
  // An omitted end means the role is still current.
  schema: z.object({
    company: z.string(),
    url: z.url().optional(),
    start: month,
    end: month.optional(),
    order: z.number().default(0),
    roles: z
      .array(
        z.object({
          title: z.string(),
          // Only worth setting when a role covers part of the company's span.
          start: month.optional(),
          end: month.optional(),
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
