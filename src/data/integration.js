// Content for the integration page, from the enterprise engagement copy.
// Plain words first, the formal term as a small chip. Only states what the
// platform and team do today: no certifications, prices, or timelines.

export const glance = {
  systems: [['database', 'ERP database'], ['document', 'Documents'], ['chart', 'Reports']],
  team: [['search', 'Cited answers'], ['chart', 'Certified numbers'], ['bell', 'Alerts']],
}

export const phases = [
  { icon: 'workshop', title: 'We learn your business', text: 'Workshops with your team, onsite or remote.', term: 'Discovery · SOW' },
  { icon: 'layers', title: 'We design the solution', text: 'Map your data sources and agree key metrics.', term: 'Solution design' },
  { icon: 'plug', title: 'We connect your data', text: 'Read-only access, modelled into certified metrics.', term: 'Data onboarding' },
  { icon: 'check', title: 'You check the numbers', text: 'Results matched against your own reports.', term: 'UAT' },
  { icon: 'rocket', title: 'You go live, we stay', text: 'Training, extra care after launch, ongoing support.', term: 'Hypercare · SLA' },
]

export const weProvide = [
  { icon: 'workshop', title: 'Discovery workshops', note: 'Scope and success criteria, agreed together' },
  { icon: 'layers', title: 'Data onboarding and modelling', note: 'Done by our team' },
  { icon: 'cloud', title: 'Deployment, managed or self-hosted', note: 'In our cloud or your infrastructure' },
  { icon: 'training', title: 'Training and hypercare', note: 'Extra care right after go-live' },
  { icon: 'support', title: 'Ongoing support and updates', note: 'With an agreed service level' },
]

export const youBring = [
  { icon: 'database', title: 'Read-only ERP access', note: 'Database or read replica, plus systems in scope' },
  { icon: 'document', title: 'Your business documents', note: 'Upload, Google Drive, or Gmail' },
  { icon: 'chart', title: 'KPI definitions and reports', note: 'So we match figures you already trust' },
  { icon: 'people', title: 'A few hours from experts', note: 'Mainly during discovery and validation' },
  { icon: 'flag', title: 'A sponsor and a project lead', note: 'One owns the outcome, one runs the day to day' },
  { icon: 'shield', title: 'IT and security sign-off', note: 'Network access, such as allowlisting or VPN' },
]

export const deployments = [
  {
    key: 'managed',
    label: 'Managed by entaura',
    place: 'entaura cloud',
    icon: 'cloud',
    rows: [['Runs on', 'entaura’s cloud infrastructure'], ['Operated by', 'entaura: hosting, updates, monitoring'], ['Your data', 'Isolated for your organisation']],
    best: 'Fastest time to value, nothing to manage.',
  },
  {
    key: 'hosted',
    label: 'Customer-hosted',
    place: 'Your network',
    icon: 'server',
    rows: [['Runs on', 'Your data centre or private cloud'], ['Operated by', 'Your IT team, with our support'], ['Your data', 'Never leaves your network']],
    best: 'Strict data residency or security rules.',
  },
]

export const security = [
  { icon: 'layers', title: 'Isolated by design', text: 'Separate data per knowledge base' },
  { icon: 'eye', title: 'Read-only', text: 'Never writes back to your systems' },
  { icon: 'people', title: 'Role-based access', text: 'People see only what they’re granted' },
  { icon: 'key', title: 'Encrypted credentials', text: 'Encrypted at rest, never shown' },
  { icon: 'check', title: 'Certified numbers', text: 'Governed metrics, not AI guesses' },
  { icon: 'link', title: 'Traceable answers', text: 'Every answer cites its source' },
  { icon: 'shield', title: 'Validated releases', text: 'Checked against known figures first' },
  { icon: 'server', title: 'Your infrastructure', text: 'Self-host when you need to' },
]

export const faqs = [
  { q: 'Will you change anything in our systems?', a: 'No. entaura only reads from your sources and never writes back.' },
  { q: 'What data do you need from us?', a: 'Read-only access to your ERP and other systems in scope, the documents you want answered, and your KPI definitions and reports.' },
  { q: 'Can entaura run in our own infrastructure?', a: 'Yes. Host it in your own data centre or private cloud, or let entaura manage it for you.' },
  { q: 'Which ERP systems do you support?', a: 'entaura connects to your ERP’s database, whatever the system. We confirm the details for your setup during discovery.' },
  { q: 'How do we know the numbers are right?', a: 'Your team checks the results against your existing reports before go-live, and every later update is tested against known-correct figures.' },
  { q: 'Can we start small?', a: 'Yes. Start with a focused pilot on one business area and expand from there.' },
]
