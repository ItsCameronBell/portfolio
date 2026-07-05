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
