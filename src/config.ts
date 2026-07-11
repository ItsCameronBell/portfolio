export interface SocialLink {
  label: string;
  href: string;
}

/**
 * Sidebar links, grouped into rows. The first group is how to reach me,
 * the second is what I'm into. Each inner array renders as one row.
 */
export const socialGroups: SocialLink[][] = [
  [
    { label: 'github', href: 'https://github.com/cameronbell' },
    { label: 'linkedin', href: 'https://www.linkedin.com/in/cameronbell' },
    { label: 'email', href: 'mailto:hello@cameronbell.email' },
  ],
  [
    { label: 'hardcover', href: 'https://hardcover.app/@cameronbell' },
    { label: 'letterboxd', href: 'https://letterboxd.com/cameronbell' },
  ],
];
