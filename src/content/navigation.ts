/**
 * Header navigation, including the full-width menu panels.
 * Every link points at content that exists on the site today; menus grow as
 * real pages (services, careers, about) are added.
 */
import { engagement, process, specialties } from './home';
import { site } from './site';

export interface NavLink {
  label: string;
  href: string;
}

export interface MenuColumn {
  /** Column heading. Omit for a plain multi-column list. */
  title?: string;
  /** Makes the heading itself a link (e.g. a specialty above its roles). */
  href?: string;
  links: NavLink[];
}

export interface MenuPanel {
  title: string;
  columns: MenuColumn[];
  /** Optional row under a rule, e.g. the hiring steps. */
  row?: MenuColumn;
  cta?: NavLink;
}

export interface NavItem {
  label: string;
  href: string;
  panel?: MenuPanel;
}

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/** Lower-case a title for use mid-sentence, keeping acronyms (IT, AI) intact. */
export const inSentence = (title: string) =>
  title
    .split(' ')
    .map((word) => (/^[A-Z]{2,}$/.test(word) ? word : word.toLowerCase()))
    .join(' ');

export const routes = {
  hireTalent: '/hire-talent',
  specialties: '/specialties',
  howWeWork: '/how-we-work',
  jobSeekers: '/job-seekers',
  faq: '/faq',
} as const;

export const specialtyHref = (title: string) => `${routes.specialties}/${slugify(title)}`;
export const modelHref = (title: string) => `${routes.hireTalent}/${slugify(title)}`;
export const roleHref = (specialty: string, role: string) => `${specialtyHref(specialty)}/${slugify(role)}`;

export const primaryNav: NavItem[] = [
  {
    label: 'Hire talent',
    href: routes.hireTalent,
    panel: {
      title: 'Hire IT talent',
      columns: [
        {
          title: 'Ways to hire',
          links: engagement.models.map((m) => ({ label: m.title, href: modelHref(m.title) })),
        },
        {
          title: 'Get started',
          links: [
            { label: 'Hiring overview', href: routes.hireTalent },
            { label: 'Request talent', href: site.requestTalentHref },
            { label: 'Frequently asked questions', href: routes.faq },
          ],
        },
      ],
      cta: { label: 'Request talent', href: site.requestTalentHref },
    },
  },
  {
    label: 'Specialties',
    href: routes.specialties,
    panel: {
      title: 'Specialties',
      columns: specialties.groups.map((group) => ({
        title: group.title,
        href: specialtyHref(group.title),
        links: group.roles.map((role) => ({ label: role, href: roleHref(group.title, role) })),
      })),
      cta: { label: 'View all specialties', href: routes.specialties },
    },
  },
  {
    label: 'How we work',
    href: routes.howWeWork,
    panel: {
      title: 'How we work',
      columns: [
        {
          title: 'The process',
          links: process.steps.map((step, i) => ({ label: step.title, href: `${routes.howWeWork}#step-${i + 1}` })),
        },
        {
          title: 'What to expect',
          links: [
            { label: 'How we work overview', href: routes.howWeWork },
            { label: 'What working with us looks like', href: `${routes.howWeWork}#hire` },
            { label: 'Questions about the process', href: `${routes.howWeWork}#faq` },
          ],
        },
      ],
      cta: { label: process.ctaLabel, href: site.requestTalentHref },
    },
  },
  {
    label: 'Job seekers',
    href: routes.jobSeekers,
    panel: {
      title: 'Job seekers',
      columns: [
        {
          title: 'For candidates',
          links: [
            { label: 'Job seekers overview', href: routes.jobSeekers },
            ...(site.careersUrl ? [{ label: 'Explore opportunities', href: site.careersUrl }] : []),
            { label: 'Areas we recruit for', href: `${routes.jobSeekers}#areas` },
            { label: 'Frequently asked questions', href: routes.faq },
          ],
        },
        {
          title: 'Hiring instead?',
          links: [{ label: 'Hire IT talent', href: routes.hireTalent }],
        },
      ],
      cta: site.careersUrl
        ? { label: 'Explore opportunities', href: site.careersUrl }
        : { label: 'Job seekers overview', href: routes.jobSeekers },
    },
  },
  { label: 'FAQ', href: routes.faq },
];
