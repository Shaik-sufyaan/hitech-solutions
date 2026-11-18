/**
 * Site-wide configuration. Destinations marked TODO need business confirmation
 * before launch; no link may point at a page that does not exist.
 */

export const site = {
  name: 'Hitech Solutions',
  /** Default description. DRAFT copy — needs business approval. */
  description:
    'Hitech Solutions helps employers find IT and technology professionals, and helps technology professionals find their next role.',

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
} as const;

export const candidateHref = site.careersUrl ?? site.jobSeekersFallbackHref;

