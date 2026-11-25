/**
 * Site-wide configuration. Destinations marked TODO need business confirmation
 * before launch; no link may point at a page that does not exist.
 */

export const site = {
  name: 'Hitec Solutions',
  /** Default description. DRAFT copy — needs business approval. */
  description:
    'Hitec Solutions helps employers find IT and technology professionals, and helps technology professionals find their next role.',

  /** Primary employer journey (request-talent form). */
  requestTalentHref: '/request-talent',

  /**
   * Approved careers / job-board destination.
   * TODO(business): supply the ATS or careers URL. Until then candidate links
   * go to the job-seekers section on the homepage, which explains the route.
   */
  careersUrl: null as string | null,
  jobSeekersFallbackHref: '/job-seekers',

  /**
   * Employer-inquiry endpoint (POST, JSON). Set PUBLIC_LEAD_ENDPOINT once the
   * secure backend exists. Until then the form validates but reports honestly
   * that nothing was sent.
   */
  leadEndpoint: (import.meta.env.PUBLIC_LEAD_ENDPOINT as string | undefined) || null,

  /**
   * EXAMPLE contact details shown in the header's top bar (user asked for example
   * information, 2026-11-18). Fictional: 555-01xx numbers are reserved for fiction.
   * TODO(business): replace with Hitec's real phone number and office address.
   */
  contact: {
    phone: { label: '(555) 010-0199', href: 'tel:+15550100199' },
    address: '100 Corporate Drive, Suite 400, Dallas, TX 75201',
  },
} as const;

export const candidateHref = site.careersUrl ?? site.jobSeekersFallbackHref;

