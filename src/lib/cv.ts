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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2025-06" → ["Jun", "2025"] */
function splitMonth(stamp: string): [string, string] {
  const [year, month] = stamp.split('-');
  return [MONTHS[Number(month) - 1], year];
}

/**
 * Renders a tenure, dropping the year off the start when both ends share one —
 * "Jan – Jun 2025", not "Jan 2025 – Jun 2025". An absent end reads as current.
 */
export function formatRange(start: string, end?: string): string {
  const [fromMonth, fromYear] = splitMonth(start);
  if (!end) return `${fromMonth} ${fromYear} – now`;
  if (start === end) return `${fromMonth} ${fromYear}`;

  const [toMonth, toYear] = splitMonth(end);
  return fromYear === toYear
    ? `${fromMonth} – ${toMonth} ${toYear}`
    : `${fromMonth} ${fromYear} – ${toMonth} ${toYear}`;
}
