import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

type Experience = CollectionEntry<'experience'>;
type Education = CollectionEntry<'education'>;

export async function getSortedExperience(): Promise<Experience[]> {
  const items = await getCollection('experience');
  return items.sort((a, b) => a.data.order - b.data.order);
}

export async function getSortedEducation(): Promise<Education[]> {
  const items = await getCollection('education');
  return items.sort((a, b) => a.data.order - b.data.order);
}

export interface CompensationRow {
  period: string;
  company: string;
  role: string;
  salary: string;
}

export async function getCompensation(): Promise<CompensationRow[]> {
  const experience = await getSortedExperience();
  return experience.flatMap((exp) =>
    exp.data.roles
      .filter((role) => role.salary)
      .map((role) => ({
        period: role.range ?? exp.data.range,
        company: exp.data.company,
        role: role.title,
        salary: role.salary!,
      })),
  );
}
