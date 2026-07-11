export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  name: 'Cameron Bell',
  role: 'Software Engineer',
} as const;

export const socialGroups: SocialLink[][] = [
  [
    { label: 'github', href: 'https://github.com/ItsCameronBell' },
    { label: 'linkedin', href: 'https://www.linkedin.com/in/bell-cameron' },
    { label: 'email', href: 'mailto:hello@cameronbell.email' },
  ],
  [
    { label: 'hardcover', href: 'https://hardcover.app/@ItsCameronBell' },
    { label: 'letterboxd', href: 'https://letterboxd.com/ItsCameronBell' },
  ],
];
