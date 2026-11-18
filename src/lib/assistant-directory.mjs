// Only published internal destinations. Never turn model-generated URLs into links.
export const pages = [
  { id: 'hire', label: 'Hire IT talent', href: '/hire-talent', keywords: ['hire', 'hiring', 'staff', 'recruit', 'team', 'employer'], summary: 'Overview of the staffing arrangements described on this website.' },
  { id: 'request', label: 'Request talent', href: '/request-talent', keywords: ['request', 'contact', 'quote', 'pricing', 'cost', 'budget', 'meeting', 'book', 'call', 'consultation'], summary: 'Employer inquiry form. It is not connected to a submission backend yet; no request is sent.' },
  { id: 'jobs', label: 'For job seekers', href: '/job-seekers', keywords: ['job', 'jobs', 'career', 'apply', 'resume', 'cv', 'opportunities', 'vacancy', 'work', 'candidate'], summary: 'Information for technology professionals. No live job board or application destination has been supplied.' },
  { id: 'process', label: 'How we work', href: '/how-we-work', keywords: ['process', 'screen', 'interview', 'shortlist', 'timeline', 'how'], summary: 'Draft hiring process: define the need, review a shortlist, select and start. Timelines and availability must be confirmed.' },
  { id: 'privacy', label: 'Privacy notice', href: '/privacy', keywords: ['privacy', 'personal information', 'cookies', 'recorded', 'record'], summary: 'How this website and the Hitech Assistant handle information. Draft notice pending Hitech review.' },
  { id: 'faq', label: 'Common questions', href: '/faq', keywords: ['question', 'faq', 'remote', 'hybrid', 'location', 'office', 'phone', 'email'], summary: 'Common employer questions. Contacts, locations, pricing and coverage have not been confirmed.' },
  { id: 'specialties', label: 'IT specialties', href: '/specialties', keywords: ['specialties', 'skills', 'technology', 'roles', 'services'], summary: 'Draft technology specialty areas, subject to confirmation by Hitech.' },
  { id: 'contract', label: 'Contract staffing', href: '/hire-talent/contract-staffing', keywords: ['contract', 'temporary', 'project', 'short term'], summary: 'Describes contract staffing for projects and temporary needs; confirm availability and terms.' },
  { id: 'contract-to-hire', label: 'Contract-to-hire', href: '/hire-talent/contract-to-hire', keywords: ['contract to hire', 'contract-to-hire', 'try before'], summary: 'Describes beginning on contract with a possible later permanent hire; confirm terms with Hitech.' },
  { id: 'direct', label: 'Direct hire', href: '/hire-talent/direct-hire', keywords: ['direct hire', 'permanent', 'full time'], summary: 'Describes recruiting permanent employees; confirm terms with Hitech.' },
];
const groups = [
  ['software', 'Software engineering', 'software-engineering', ['software', 'developer', 'coding', 'programmer'], ['Full-stack developer', 'Back-end engineer', 'QA engineer']],
  ['cloud', 'Cloud and infrastructure', 'cloud-and-infrastructure', ['cloud', 'infrastructure', 'aws', 'azure', 'devops'], ['Cloud engineer', 'DevOps engineer', 'Systems administrator']],
  ['data', 'Data and AI', 'data-and-ai', ['data', 'analytics', 'machine learning', 'ai'], ['Data engineer', 'Data analyst', 'Machine learning engineer']],
  ['security', 'Cybersecurity', 'cybersecurity', ['security', 'cybersecurity', 'iam'], ['Security analyst', 'Security engineer', 'IAM specialist']],
  ['enterprise', 'Enterprise applications', 'enterprise-applications', ['erp', 'crm', 'sap', 'salesforce', 'enterprise'], ['ERP consultant', 'CRM developer', 'Business analyst']],
  ['support', 'IT support', 'it-support', ['support', 'help desk', 'network', 'desktop'], ['Service desk analyst', 'Desktop support technician', 'Network technician']],
];
for (const [id, label, slug, keywords, roles] of groups) {
  pages.push({ id, label, href: `/specialties/${slug}`, keywords, summary: `Draft specialty page covering ${roles.join(', ')}. These are example roles, not current vacancies.` });
  for (const role of roles) {
    const roleSlug = role.toLowerCase().replaceAll(' ', '-');
    pages.push({ id: roleSlug, label: role, href: `/specialties/${slug}/${roleSlug}`, keywords: [role.toLowerCase(), role.toLowerCase().replaceAll('-', ' ')], summary: `Example ${role} role information, not a vacancy or a promise of candidate availability.` });
  }
}
/** Pages whose keywords appear in the text, best match first (may be empty). */
export function rankPages(text) {
  const words = ` ${String(text).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()} `;
  return pages.map(page => ({ page, score: page.keywords.reduce((score, keyword) => {
    const term = keyword.replace(/[^a-z0-9]+/g, ' ');
    return score + (words.includes(` ${term} `) ? term.split(' ').length * 3 : 0);
  }, 0) })).filter(item => item.score > 0).sort((a, b) => b.score - a.score).map(item => item.page);
}

const toLink = ({ id, label, href }) => ({ id, label, href });

export function findPages(text) {
  const ranked = rankPages(text);
  return (ranked.length ? ranked.slice(0, 3) : pages.filter(page => ['hire', 'jobs', 'faq'].includes(page.id))).map(toLink);
}

/** True when the visitor explicitly asks to be taken to / shown a page. */
export function wantsNavigation(text) {
  const t = String(text);
  return /\b(take me|bring me|send me|navigate|link me|direct me|redirect me|go there)\b/i.test(t)
    || /\b(go to|open|show me|visit)\b[^.?!]*\bpage\b/i.test(t)
    || /\bopen (it|that|this)\b/i.test(t);
}

/** Directory pages named in a piece of text, in order of first mention. Longer labels win overlaps. */
export function pagesMentioned(text) {
  const haystack = String(text).toLowerCase();
  const found = [];
  const taken = [];
  for (const page of [...pages].sort((a, b) => b.label.length - a.label.length)) {
    const needle = page.label.toLowerCase();
    let from = 0;
    while (true) {
      const at = haystack.indexOf(needle, from);
      if (at === -1) break;
      const end = at + needle.length;
      const boundary = !/[a-z0-9]/.test(haystack[at - 1] ?? ' ') && !/[a-z0-9]/.test(haystack[end] ?? ' ');
      if (boundary && !taken.some(([s, e]) => at < e && end > s)) {
        taken.push([at, end]);
        found.push({ page, at });
        break;
      }
      from = at + 1;
    }
  }
  return found.sort((a, b) => a.at - b.at).map(item => item.page);
}

/** Resolve the page a navigation request refers to: the message itself, else the previous reply ("that page"). */
export function resolveTarget(text, previous = '') {
  return pagesMentioned(text)[0] ?? rankPages(text)[0] ?? pagesMentioned(previous)[0] ?? rankPages(previous)[0] ?? null;
}

export function guideReply(text, unavailable = false, previous = '') {
  if (wantsNavigation(text)) {
    const target = resolveTarget(text, previous);
    if (target) {
      return { mode: 'guide', answer: `Opening the ${target.label} page for you.`, links: [toLink(target)], navigate: toLink(target) };
    }
  }
  return {
    mode: 'guide',
    answer: unavailable
      ? 'AI replies are temporarily unavailable. I can still help you explore the website using the pages below.'
      : 'AI chat is not connected yet. These website pages may help with your question. The listed roles are examples, not live vacancies.',
    links: findPages(text),
  };
}
