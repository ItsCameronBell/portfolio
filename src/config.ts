export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  name: 'Cameron Bell',
  role: 'Software Engineer',
} as const;

/*
 * The sidebar's icon row. Each label doubles as its icon's id in
 * public/icons.svg. Only http(s) links count as profiles in the page's
 * structured data, so the feed stays out of it.
 */
export const links: SocialLink[] = [
  { label: 'github', href: 'https://github.com/ItsCameronBell' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/bell-cameron' },
  { label: 'rss', href: '/rss.xml' },
];
