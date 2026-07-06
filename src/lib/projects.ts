import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

export async function getSortedProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** The card's link target: repo first, demo as fallback, else none. */
export function projectHref(project: Project): string | undefined {
  return project.data.repo ?? project.data.demo;
}

export const AI_USAGE = {
  full: { glyph: '●', label: 'built with ai' },
  partial: { glyph: '◐', label: 'ai-assisted' },
  none: { glyph: '○', label: 'no ai' },
} as const;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Render an aiNote for the tooltip. The note is author-written frontmatter,
 * not full markdown: everything is escaped, then [text](https://url) becomes
 * an anchor. http(s) only, so a stray paren or odd URL can't inject markup.
 */
export function renderAiNote(note: string): string {
  return escapeHtml(note).replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
}
