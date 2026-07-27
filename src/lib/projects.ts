import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

export async function getSortedProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** A project earns its own page only once it has something written about it. */
export function hasPage(project: Project): boolean {
  return Boolean(project.body?.trim());
}

/** The page a project's name points at, if it has one to point at. */
export function projectHref(project: Project): string | undefined {
  return hasPage(project) ? `/projects/${project.id}/` : undefined;
}

const CODE_HOSTS: Record<string, string> = {
  'github.com': 'github',
  'gitlab.com': 'gitlab',
  'codeberg.org': 'codeberg',
  'git.sr.ht': 'sourcehut',
  'bitbucket.org': 'bitbucket',
};

/** Name the destination rather than the thing — "github", not "repo". */
function sourceLabel(url: string): string {
  try {
    return CODE_HOSTS[new URL(url).hostname.replace(/^www\./, '')] ?? 'source';
  } catch {
    return 'source';
  }
}

export interface ProjectLink {
  label: string;
  href: string;
}

/** Outbound links, in one place so the card and the page agree. */
export function projectLinks(project: Project): ProjectLink[] {
  const links: ProjectLink[] = [];
  if (project.data.repo) links.push({ label: sourceLabel(project.data.repo), href: project.data.repo });
  if (project.data.demo) links.push({ label: 'demo', href: project.data.demo });
  return links;
}

export const AI_USAGE = {
  full: { glyph: '●', label: 'built with ai' },
  partial: { glyph: '◐', label: 'ai-assisted' },
} as const;
