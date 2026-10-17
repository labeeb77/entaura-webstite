// Content for the integration page, from the enterprise engagement copy.
// Only states what the platform and team do today: no certifications,
// prices, or timelines.

export const phases = [
  { title: 'Discovery and scoping', text: 'We meet your stakeholders, onsite or remote, and agree scope and success criteria in a Statement of Work.' },
  { title: 'Solution design', text: 'We map your data sources, define key metrics and business terms, and choose the deployment model.' },
  { title: 'Data onboarding and modelling', text: 'We connect read-only to your ERP and systems, ingest your documents, and model the data into certified metrics.' },
  { title: 'Deployment and validation', text: 'We deploy in your environment or ours, and your team validates the results against existing reports.' },
  { title: 'Go-live and support', text: 'We train your users, provide hypercare after launch, and keep extending as your business changes.' },
]

export const weProvide = [
  'Discovery and scoping workshops',
  'Data onboarding and modelling by our team',
  'Managed or customer-hosted deployment',
  'User training and hypercare after go-live',
  'Ongoing support and platform updates',
]

export const youBring = [
  'Read-only access to your ERP database (or a read replica) and systems in scope',
  'The business documents you want answered, via upload, Google Drive, or Gmail',
  'Your KPI definitions and existing reports',
  'A few hours a week from subject matter experts',
  'An executive sponsor and a project lead',
  'IT and security sign-off, such as firewall allowlisting or VPN access',
]

export const deployments = [
  {
    title: 'Managed by entaura',
    line: 'Fully managed. We handle hosting, updates, and monitoring.',
    rows: [
      ['Where it runs', 'entaura’s cloud infrastructure'],
      ['Who operates it', 'entaura runs, monitors, and updates it'],
      ['Your data', 'Isolated for your organisation'],
    ],
    best: 'Fastest time to value, with no infrastructure to manage.',
  },
  {
    title: 'Customer-hosted',
    line: 'Your infrastructure, your control.',
    rows: [
      ['Where it runs', 'Your data centre or private cloud account'],
      ['Who operates it', 'Your IT team, with our support for installation and upgrades'],
      ['Your data', 'Never leaves your network'],
    ],
    best: 'Strict data residency, regulatory, or security requirements.',
  },
]

export const security = [
  { title: 'Isolated by design', text: 'Each knowledge base has its own databases, index, and storage.' },
  { title: 'Read-only access', text: 'We read from your sources and never write back.' },
  { title: 'Role-based access', text: 'People see only what they are granted, per knowledge base.' },
  { title: 'Encrypted credentials', text: 'Connection secrets are encrypted at rest and never shown.' },
  { title: 'Certified numbers', text: 'Figures come from governed metrics, not AI guesses.' },
  { title: 'Traceable answers', text: 'Document answers cite the passage they came from.' },
  { title: 'Validated releases', text: 'Model updates ship only after checks against known figures.' },
  { title: 'Your infrastructure', text: 'Host it yourself so data never leaves your network.' },
]

export const faqs = [
  { q: 'Will you change anything in our systems?', a: 'No. entaura only reads from your sources. It never writes back to them.' },
  { q: 'What data do you need from us?', a: 'Read-only access to your ERP and other systems in scope, the documents you want answered, and your existing KPI definitions and reports.' },
  { q: 'Can entaura run in our own infrastructure?', a: 'Yes. Host it in your own data centre or private cloud, or let entaura manage it for you.' },
  { q: 'Which ERP systems do you support?', a: 'entaura connects to your ERP’s database and models your data into certified metrics, whatever the system. We confirm the details for your setup during discovery.' },
  { q: 'How do we know the numbers are right?', a: 'Before go-live, your team validates the results against your existing reports. After launch, every update is checked against known-correct figures before it reaches users.' },
  { q: 'Can we start small?', a: 'Yes. Start with a focused pilot on one business area and expand from there.' },
]
