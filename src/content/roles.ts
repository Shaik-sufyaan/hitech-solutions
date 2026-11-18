/**
 * Role pages. DRAFT copy.
 * These describe what each role generally involves in the industry; they are
 * not claims about Hitech's placements, clients or results.
 * CONFIRM: the role list must match what Hitech recruits for.
 */

export interface RoleDetail {
  title: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
}

/** Keyed by the role title used in content/home.ts specialties. */
export const roleDetails: Record<string, RoleDetail> = {
  // Software engineering
  'Full-stack developer': {
    title: 'Full-stack developer',
    summary: 'Builds features across the whole application, from the interface people use to the services and data behind it.',
    responsibilities: [
      'Design and build user-facing features and the APIs that support them',
      'Work with databases, authentication and third-party services',
      'Review code, write tests and keep releases reliable',
    ],
    skills: ['Front-end framework (for example React, Angular or Vue)', 'Back-end language and framework', 'Relational or document databases', 'API design', 'Testing and CI/CD'],
  },
  'Back-end engineer': {
    title: 'Back-end engineer',
    summary: 'Builds the services, APIs and data processing that applications depend on, with a focus on reliability and performance.',
    responsibilities: [
      'Design and maintain APIs and services',
      'Model data and tune queries for performance',
      'Monitor, troubleshoot and harden production systems',
    ],
    skills: ['Server-side language (for example Java, C#, Python, Go or Node.js)', 'API and service design', 'SQL and data modelling', 'Messaging or event-driven systems', 'Observability and on-call practices'],
  },
  'QA engineer': {
    title: 'QA engineer',
    summary: 'Makes sure software works as intended before and after release, through test planning, manual testing and automation.',
    responsibilities: [
      'Plan test coverage for new features and releases',
      'Build and maintain automated test suites',
      'Report, reproduce and track defects with the development team',
    ],
    skills: ['Test planning and test case design', 'UI or API test automation tools', 'Scripting for test automation', 'CI/CD pipeline integration', 'Performance or accessibility testing, if relevant'],
  },

  // Cloud and infrastructure
  'Cloud engineer': {
    title: 'Cloud engineer',
    summary: 'Designs, builds and runs infrastructure on cloud platforms, including migrations from on-premises environments.',
    responsibilities: [
      'Provision and manage cloud infrastructure as code',
      'Plan and carry out workload migrations',
      'Manage cost, security and availability of cloud environments',
    ],
    skills: ['Cloud platform (for example AWS, Azure or Google Cloud)', 'Infrastructure as code (for example Terraform)', 'Networking and identity in the cloud', 'Containers and orchestration', 'Cost management'],
  },
  'DevOps engineer': {
    title: 'DevOps engineer',
    summary: 'Connects development and operations so software can be built, tested and released quickly and safely.',
    responsibilities: [
      'Build and maintain CI/CD pipelines',
      'Automate environment setup and deployments',
      'Improve monitoring, alerting and incident response',
    ],
    skills: ['CI/CD tooling', 'Scripting and automation', 'Containers and Kubernetes', 'Infrastructure as code', 'Monitoring and logging tools'],
  },
  'Systems administrator': {
    title: 'Systems administrator',
    summary: 'Keeps servers, operating systems and core infrastructure running, patched and secure.',
    responsibilities: [
      'Install, configure and maintain servers and operating systems',
      'Manage backups, patching and user access',
      'Troubleshoot outages and performance problems',
    ],
    skills: ['Windows Server or Linux administration', 'Virtualisation', 'Directory services and access management', 'Backup and recovery', 'Scripting for routine tasks'],
  },

  // Data and AI
  'Data engineer': {
    title: 'Data engineer',
    summary: 'Builds the pipelines and platforms that move, clean and store data so it can be used for reporting and analysis.',
    responsibilities: [
      'Build and maintain data pipelines and integrations',
      'Design data models and warehouse or lakehouse structures',
      'Monitor data quality and pipeline reliability',
    ],
    skills: ['SQL and data modelling', 'Python or another pipeline language', 'Data warehouse or lakehouse platforms', 'Orchestration tools', 'Streaming or batch processing'],
  },
  'Data analyst': {
    title: 'Data analyst',
    summary: 'Turns data into reports, dashboards and answers that help teams make decisions.',
    responsibilities: [
      'Gather requirements and define the right measures',
      'Build reports and dashboards',
      'Analyse trends and present findings to stakeholders',
    ],
    skills: ['SQL', 'Business intelligence tools (for example Power BI or Tableau)', 'Spreadsheet modelling', 'Data visualisation', 'Stakeholder communication'],
  },
  'Machine learning engineer': {
    title: 'Machine learning engineer',
    summary: 'Builds, deploys and maintains machine learning models in production systems.',
    responsibilities: [
      'Prepare data and train models for a defined problem',
      'Deploy models and integrate them into applications',
      'Monitor model performance and retrain when needed',
    ],
    skills: ['Python and ML libraries', 'Model training and evaluation', 'MLOps and model deployment', 'Cloud ML services', 'Data engineering fundamentals'],
  },

  // Cybersecurity
  'Security analyst': {
    title: 'Security analyst',
    summary: 'Monitors systems for threats, investigates alerts and helps the organisation respond to security incidents.',
    responsibilities: [
      'Monitor and triage security alerts',
      'Investigate incidents and recommend remediation',
      'Track vulnerabilities and support security reviews',
    ],
    skills: ['SIEM and log analysis', 'Incident response procedures', 'Vulnerability management', 'Network and endpoint security', 'Relevant frameworks your organisation follows'],
  },
  'Security engineer': {
    title: 'Security engineer',
    summary: 'Designs and builds security controls into systems, networks and applications.',
    responsibilities: [
      'Design and implement security controls and tooling',
      'Harden infrastructure and application configurations',
      'Automate security checks in build and deployment processes',
    ],
    skills: ['Cloud or network security', 'Identity and access controls', 'Security tooling and automation', 'Secure development practices', 'Threat modelling'],
  },
  'IAM specialist': {
    title: 'IAM specialist',
    summary: 'Manages who can access which systems, through identity platforms, access policies and reviews.',
    responsibilities: [
      'Administer identity and access management platforms',
      'Design roles, policies and access workflows',
      'Run access reviews and support audits',
    ],
    skills: ['Identity platforms (for example Entra ID or Okta)', 'Single sign-on and multi-factor authentication', 'Role-based access design', 'Provisioning and lifecycle automation', 'Audit and compliance reporting'],
  },

  // Enterprise applications
  'ERP consultant': {
    title: 'ERP consultant',
    summary: 'Implements, configures and supports enterprise resource planning systems for finance, supply chain and operations.',
    responsibilities: [
      'Gather business requirements and map processes',
      'Configure and test ERP modules',
      'Support users, upgrades and ongoing improvements',
    ],
    skills: ['ERP platform and modules your business uses', 'Business process analysis', 'Configuration and testing', 'Data migration', 'User training'],
  },
  'CRM developer': {
    title: 'CRM developer',
    summary: 'Customises and extends customer relationship management platforms to fit sales, service and marketing teams.',
    responsibilities: [
      'Build custom features, workflows and integrations',
      'Maintain data quality and platform configuration',
      'Support releases and user adoption',
    ],
    skills: ['CRM platform (for example Salesforce or Dynamics 365)', 'Platform-specific development', 'Integration and APIs', 'Workflow automation', 'Data management'],
  },
  'Business analyst': {
    title: 'Business analyst',
    summary: 'Connects business needs and technology teams, turning goals into clear requirements and processes.',
    responsibilities: [
      'Gather and document requirements',
      'Map current and future processes',
      'Support testing, rollout and change',
    ],
    skills: ['Requirements gathering and documentation', 'Process mapping', 'Stakeholder workshops', 'User acceptance testing', 'Familiarity with the systems involved'],
  },

  // IT support
  'Service desk analyst': {
    title: 'Service desk analyst',
    summary: 'Is the first point of contact for employees with IT problems, resolving issues or routing them to the right team.',
    responsibilities: [
      'Log, prioritise and resolve support requests',
      'Reset access and guide users through common fixes',
      'Escalate complex issues with clear notes',
    ],
    skills: ['Ticketing and service management tools', 'Windows or macOS support', 'Account and access administration', 'Clear written and spoken communication', 'Service management practices'],
  },
  'Desktop support technician': {
    title: 'Desktop support technician',
    summary: 'Sets up, maintains and repairs the computers, devices and software employees use every day.',
    responsibilities: [
      'Deploy and configure laptops, desktops and peripherals',
      'Troubleshoot hardware and software issues on site or remotely',
      'Support device rollouts, moves and replacements',
    ],
    skills: ['Hardware troubleshooting', 'Operating system imaging and deployment', 'Device management tools', 'Office and collaboration software support', 'Asset tracking'],
  },
  'Network technician': {
    title: 'Network technician',
    summary: 'Installs, maintains and troubleshoots the networks that connect offices, devices and services.',
    responsibilities: [
      'Install and configure switches, routers and wireless access points',
      'Monitor network performance and resolve faults',
      'Document network changes and support upgrades',
    ],
    skills: ['Routing and switching', 'Wireless networking', 'Firewalls and VPNs', 'Network monitoring tools', 'Cabling and site work, if relevant'],
  },
};

/** "a QA engineer", "an ERP consultant", "an IAM specialist". */
export const withArticle = (role: string) => {
  const first = role.split(' ')[0];
  const isAcronym = /^[A-Z]{2,}$/.test(first);
  const anSound = isAcronym ? /^[AEFHILMNORSX]/.test(first) : /^[aeiou]/i.test(first);
  return `${anSound ? 'an' : 'a'} ${isAcronym ? role : role.charAt(0).toLowerCase() + role.slice(1)}`;
};
