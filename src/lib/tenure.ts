/*
 * Tenure length, shared by the CV at build time and the browser script that
 * keeps a current role's length fresh between deploys. Kept free of
 * astro:content so it can ship to the client.
 */

/**
 * Months in a tenure. A finished one counts both its first and last month, so
 * Jan – Jul is 7. A current one counts only months that have run their course,
 * as the present month is still under way: a Sep 2025 start reads as a year in
 * Sep 2026. Never less than a month, so a brand-new role still shows one.
 */
export function tenureMonths(start: string, end?: string, now: Date = new Date()): number {
  const [startYear, startMonth] = start.split('-').map(Number);
  const from = startYear * 12 + startMonth;
  if (end) {
    const [endYear, endMonth] = end.split('-').map(Number);
    return endYear * 12 + endMonth - from + 1;
  }
  return Math.max(1, now.getFullYear() * 12 + now.getMonth() + 1 - from);
}

const count = (n: number, unit: string) => `${n} ${unit}${n === 1 ? '' : 's'}`;

/** 7 → "7 months", 12 → "1 year", 13 → "1 year 1 month". */
export function formatTenure(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return count(rest, 'month');
  return rest === 0 ? count(years, 'year') : `${count(years, 'year')} ${count(rest, 'month')}`;
}
