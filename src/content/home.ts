/**
 * Homepage copy. ALL COPY IS DRAFT and needs business approval before launch.
 * Rules: no invented metrics, clients, certifications, locations or capabilities.
 * Items marked CONFIRM describe services or process Hitech must verify.
 */

export const hero = {
  title: 'The right IT talent. Ready for what comes next.',
  /** Desktop line breaks: one sentence per line. */
  titleLines: ['The right IT talent.', 'Ready for what comes next.'],
  body: 'Build your technology team with Hitech Solutions. Tell us the skills you need, the work ahead, and how you want to hire.',
  primaryCta: 'Find IT talent',
  candidatePrompt: 'Looking for a technology role?',
  candidateCta: 'Explore opportunities',
  /** Supplied by the user (2026-11-18); matches the "at a glance" years card. Confirm before launch. */
  experience: { value: '30+', label: 'years of IT staffing experience' },
};

/**
 * Two image panels linking deeper into the site (user-requested 2026-11-18).
 * Photos are registered in photography.json under each photoKey.
 */
export const features = {
  title: 'Explore Hitech Solutions',
  cta: 'Learn more',
  panels: [
    {
      title: 'IT talent for the systems your business runs on.',
      body: 'Find specialists for a project, or build a team for the long term.',
      href: '/hire-talent/',
      photoKey: 'home-feature-talent',
      focus: '62% 50%',
    },
    {
      title: 'From first conversation to first day.',
      body: 'See how we match technology professionals to your team.',
      href: '/how-we-work/',
      photoKey: 'home-feature-process',
      focus: '50% 28%',
    },
  ],
};

/*
 * PENDING: partner programs and certifications as supplied by the user (2026-11-18).
 * Hitech must confirm each membership/certification before launch, and supply the
 * official partner badge issued by each program's portal (add as `src`). Until
 * then each item renders as its program name in text.
 */
export const credentials = {
  label: 'Partner programs & certifications',
  labelLines: ['Partner programs', '&', 'certifications'],
  // `src` logos are provisional placeholders (see public/logos/README.md).
  // `text` is shown beside symbol-only marks so the brand is recognisable.
  items: [
    { title: 'AWS Partner Network', src: '/logos/aws.svg', alt: 'AWS' },
    { title: 'Microsoft AI Cloud Partner Program', src: '/logos/microsoft.svg', alt: 'Microsoft' },
    { title: 'Google Cloud Partner Network', src: '/logos/googlecloud.svg', alt: '', text: 'Google Cloud' },
    { title: 'Salesforce Partner Program', src: '/logos/salesforce.svg', alt: 'Salesforce' },
    { title: 'ServiceNow Partner Program', src: '/logos/servicenow.svg', alt: 'ServiceNow' },
    { title: 'Red Hat Partner Program', src: '/logos/redhat.svg', alt: '', text: 'Red Hat' },
    { title: 'Snowflake Partner Network', src: '/logos/snowflake.svg', alt: '', text: 'Snowflake' },
    { title: 'Databricks Partner Program', src: '/logos/databricks.svg', alt: '', text: 'Databricks' },
    { title: 'Oracle PartnerNetwork', src: '/logos/oracle.svg', alt: 'Oracle' },
    { title: 'Workday Partner Program', src: '/logos/workday.svg', alt: 'Workday' },
    { title: 'Esri Partner Network', src: '/logos/esri.svg', alt: '', text: 'Esri' },
    // No free source for these certification seals; text until Hitech supplies its own.
    { title: 'NMSDC Certified MBE Program' },
    { title: 'WBENC Certified WBE Program' },
    { title: 'NGLCC Certified LGBTBE Program' },
    { title: 'Disability:IN DOBE Certification Program' },
  ],
};

export const overview = {
  title: 'How Hitech Solutions helps employers hire IT professionals.',
  paragraphs: [
    'Tell us the role, the timeline and how you want to engage. We focus the search on people who fit both the work and your team.',
  ],
  pointsTitle: 'What working with us looks like',
  // CONFIRM: these describe Hitech's recruiting method.
  points: [
    {
      title: 'A clear brief before the search begins',
      body: 'We agree the skills, level, location and terms with you first, so every candidate is measured against the same requirements.',
    },
    {
      title: 'A focused shortlist',
      body: 'You review candidates matched to the brief, with notes on why each one fits, rather than every application received.',
    },
    {
      title: 'One contact from shortlist to start date',
      body: 'Your Hitech contact coordinates interviews, feedback and offers, and stays in touch once the new hire begins.',
    },
  ],
  linkLabel: 'See how the process works',
};

// CONFIRM: specialty groups and example roles must match what Hitech recruits for.
export const specialties = {
  title: 'The technology roles we recruit for.',
  intro:
    'Bring in technology professionals for the work in front of you, whether that is one specialist for a project or several people for a growing team.',
  groups: [
    {
      title: 'Software engineering',
      body: 'Build and maintain the applications your business runs on.',
      roles: ['Full-stack developer', 'Back-end engineer', 'QA engineer'],
    },
    {
      title: 'Cloud and infrastructure',
      body: 'Design, migrate and operate reliable environments.',
      roles: ['Cloud engineer', 'DevOps engineer', 'Systems administrator'],
    },
    {
      title: 'Data and AI',
      body: 'Turn data into reporting, products and decisions.',
      roles: ['Data engineer', 'Data analyst', 'Machine learning engineer'],
    },
    {
      title: 'Cybersecurity',
      body: 'Protect systems, data and people from evolving threats.',
      roles: ['Security analyst', 'Security engineer', 'IAM specialist'],
    },
    {
      title: 'Enterprise applications',
      body: 'Implement and support the platforms behind your operations.',
      roles: ['ERP consultant', 'CRM developer', 'Business analyst'],
    },
    {
      title: 'IT support',
      body: 'Keep employees productive with dependable day-to-day support.',
      roles: ['Service desk analyst', 'Desktop support technician', 'Network technician'],
    },
  ],
  ctaLabel: 'Discuss a role',
  pending: 'Specialty areas and example roles are a draft until Hitech confirms what it recruits for.',
};

// CONFIRM: engagement models Hitech actually offers.
export const engagement = {
  title: 'Ways to hire through Hitech.',
  intro: 'Choose the arrangement that fits the work, your budget and how long you need the skills.',
  models: [
    {
      id: 'contract',
      title: 'Contract staffing',
      body: 'Add skilled people for a defined project, a busy period or cover while you recruit permanently.',
      bestFor: 'Projects, peaks and short-term gaps',
    },
    {
      id: 'contract-to-hire',
      title: 'Contract-to-hire',
      body: 'Work with a professional on contract first, then offer a permanent role once you are both confident in the fit.',
      bestFor: 'Roles where fit matters before commitment',
    },
    {
      id: 'direct-hire',
      title: 'Direct hire',
      body: 'Recruit a permanent employee, with Hitech managing the search, screening and shortlist.',
      bestFor: 'Long-term and core team positions',
    },
  ],
  pending: 'Hiring arrangements are a draft until Hitech confirms which ones it offers.',
};

// CONFIRM: Hitech's real recruiting workflow and hand-offs.
export const process = {
  title: 'How the hiring process works.',
  steps: [
    {
      title: 'Define the need',
      body: 'Tell us about the role, the skills that matter most, your timeline and how you want to engage. We agree a written brief before searching.',
    },
    {
      title: 'Review a shortlist',
      body: 'We present candidates who match the brief, with our notes on experience and fit, and arrange interviews at times that suit you.',
    },
    {
      title: 'Select and start',
      body: 'Once you choose, we coordinate the offer and the details needed for a smooth first day, and check in after the start.',
    },
  ],
  ctaLabel: 'Start with a brief',
};

/*
 * PENDING: Provisional "At a glance" figures requested for layout and review.
 * These are not verified claims and must be replaced or confirmed before launch.
 */
export const glance = {
  title: 'Hitech Solutions at a glance.',
  pending: 'Values shown are provisional and must be confirmed by Hitech before launch.',
  cards: [
    { label: 'Years placing technology professionals', value: '30+' as string | null }, // supplied by the user 2026-11-18
    { label: 'Technology professionals placed', value: '2,500+' as string | null },
  ],
  /** Percentages, 0 to 100. */
  rings: [
    { label: 'Contractor retention', value: 94 as number | null },
    { label: 'Client satisfaction', value: 97 as number | null },
    { label: 'Offers accepted', value: 92 as number | null },
  ],
};

/*
 * PENDING: SAMPLE stories written at the user's request (2026-11-18) as layout
 * placeholders. They describe no real client. Replace each with a real,
 * client-approved story (and permission to name the client) before launch.
 */
export const stories = {
  title: 'Client stories.',
  pending: 'Sample stories for layout only. Replace each with a real, client-approved story before launch.',
  label: 'Sample story. Replace before launch.',
  items: [
    {
      image: 'datacenter' as const,
      alt: 'Rows of server equipment in a dimly lit data centre.',
      title: 'Staffing a cloud team for a data-centre move',
      body: 'A growing services company needed cloud and network engineers on contract while it moved its workloads out of an ageing data centre.',
    },
    {
      image: 'code' as const,
      alt: 'A monitor showing lines of code in a dark room.',
      title: 'Contract-to-hire developers for a product rebuild',
      body: 'A software team rebuilding its core product added contract developers, with the option to bring the right people on permanently.',
    },
    {
      image: 'facade' as const,
      alt: 'The glass facade of a modern office building at dusk.',
      title: 'Direct hire for a new regional IT office',
      body: 'An organisation opening a regional office hired an IT manager and support specialists directly onto its own payroll.',
    },
  ],
};

export const jobSeekers = {
  title: 'Looking for your next technology role?',
  body: [
    'Hitech Solutions also works with technology professionals who are looking for their next role.',
  ],
  ctaLabel: 'Explore opportunities',
};

// CONFIRM: every answer must be approved by the business before launch.
export const faqs = {
  title: 'Frequently asked questions',
  items: [
    {
      q: 'What kinds of IT roles can Hitech Solutions help us fill?',
      // CONFIRM: must match the confirmed specialty list.
      a: 'Our specialty areas are listed on the Specialties page. If your role sits outside them, tell us about it and we will say plainly whether we can help.',
    },
    {
      q: 'Which hiring arrangements do you offer?',
      // CONFIRM: must match the confirmed hiring arrangements.
      a: 'Contract staffing, contract-to-hire and direct hire are described under Hire talent. We can talk through which one suits the work before you commit.',
    },
    {
      q: 'How does the process start?',
      a: 'Send a request with the role and the skills you need. A member of our team will contact you to confirm the brief, the timeline and the terms before the search begins.',
    },
    {
      q: 'How long does it take to see candidates?',
      a: 'It depends on the skills, seniority and location involved. We will give you a realistic estimate when we agree the brief rather than promise a fixed time.',
    },
    {
      q: 'Can you support remote, hybrid and on-site roles?',
      // CONFIRM: remote/hybrid/on-site coverage.
      a: 'Tell us where the work happens and how often people need to be on site. We will confirm whether we can support that arrangement when we agree the brief.',
    },
    {
      // Shown only once site.careersUrl is set.
      requiresCareers: true,
      q: 'I am looking for work. How do I apply?',
      // CONFIRM: wording once the careers destination exists.
      a: 'Use the Explore opportunities link to see current openings and apply for the roles that interest you.',
    },
  ],
};

/** Interior page headers. DRAFT copy. */
export const pages = {
  hireTalent: {
    title: 'Hire IT talent',
    lead: 'How hiring through Hitech Solutions works, the arrangements available and the technology areas we recruit for.',
  },
  specialties: {
    title: 'IT specialties',
    lead: 'The technology areas we recruit for, with examples of the roles in each.',
  },
  howWeWork: {
    title: 'How we work',
    lead: 'What to expect when you hire through Hitech Solutions, from the first conversation to a new hire’s first day.',
  },
  jobSeekers: {
    title: 'For technology professionals',
    lead: 'Hitech Solutions also works with technology professionals who are looking for their next role.',
  },
  faq: {
    title: 'Frequently asked questions',
    lead: 'Answers to common questions from employers. If yours is not covered, include it with your request.',
  },
};

export const closing = {
  title: 'Let’s build your next technology team.',
  body: 'Share your hiring priorities with Hitech Solutions and take the next step toward the team you need.',
  primaryCta: 'Find IT talent',
  candidatePrompt: 'Looking for a technology role?',
  candidateCta: 'Explore opportunities',
};
