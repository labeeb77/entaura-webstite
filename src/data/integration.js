// Content for the integration page, from the enterprise engagement copy.
// Plain words first, the formal term as a small chip. Only states what the
// platform and team do today: no certifications or prices. The rollout
// timeframe (4 to 6 weeks) is a sample until confirmed.

export const glance = {
  systems: [['database', 'ERP database'], ['document', 'Documents'], ['chart', 'Reports']],
  team: [['search', 'Cited answers'], ['chart', 'Checked numbers'], ['bell', 'Alerts']],
}

export const phases = [
  { icon: 'workshop', title: 'We learn your business', text: 'Workshops with your team, onsite or remote.', term: 'Discovery · SOW' },
  { icon: 'layers', title: 'We design the solution', text: 'Map your data sources and agree key metrics.', term: 'Solution design' },
  { icon: 'plug', title: 'We connect your data', text: 'Read-only access, modelled into metrics your team agrees.', term: 'Data connection' },
  { icon: 'check', title: 'You check the numbers', text: 'Results matched against your own reports.', term: 'UAT' },
  { icon: 'rocket', title: 'You go live, we stay', text: 'Training, extra care after launch, ongoing support.', term: 'Hypercare · SLA' },
]

export const weProvide = [
  { icon: 'workshop', title: 'Discovery workshops', note: 'Scope and success criteria, agreed together' },
  { icon: 'layers', title: 'Connecting and modelling your data', note: 'Done by our team' },
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
    rows: [['Runs on', 'entaura’s cloud infrastructure'], ['Operated by', 'entaura: hosting, updates, monitoring'], ['Your data', 'Yours, in a workspace isolated for your company']],
    best: 'Fastest time to value, nothing to manage.',
  },
  {
    key: 'hosted',
    label: 'Customer-hosted',
    place: 'Your network',
    icon: 'server',
    rows: [['Runs on', 'Your data centre or private cloud'], ['Operated by', 'Your IT team, with our support'], ['Your data', 'Stays in your network, with your own AI model']],
    best: 'Strict data residency or security rules.',
  },
]

export const security = [
  { icon: 'layers', title: 'Isolated by design', text: 'Separate data per knowledge base', detail: 'Each knowledge base has its own databases and its own read-only user.' },
  { icon: 'eye', title: 'Read-only', text: 'Never writes back to your systems', detail: 'Every query is read-only, with time and row limits.' },
  { icon: 'people', title: 'Role-based access', text: 'People see only what they’re granted', detail: 'Staff only see the knowledge bases they were given.' },
  { icon: 'key', title: 'Encrypted credentials', text: 'Encrypted at rest, never shown', detail: 'Database passwords, AI keys and Google access are never sent back to the browser.' },
  { icon: 'check', title: 'Calculated, not guessed', text: 'Numbers come from code, not the AI', detail: 'Figures are fetched and calculated by code, not written by the model.' },
  { icon: 'link', title: 'Traceable answers', text: 'Every answer cites its source', detail: 'Open the exact page, cells or query behind each answer.' },
  { icon: 'shield', title: 'Validated releases', text: 'Checked against known figures first', detail: 'Updates go live only when they match known figures from your own reports.' },
  { icon: 'server', title: 'Audited and self-hostable', text: 'Every action logged', detail: 'Admin actions and every query are logged. Run it in your own infrastructure if you need to.' },
]

// Section nav chips: [section id, label].
export const sections = [
  ['connectors', 'Connectors'],
  ['how', 'How it connects'],
  ['apps', 'Into your apps'],
  ['checklist', 'Checklist'],
  ['rollout', 'Rollout'],
  ['security', 'Security'],
  ['faq', 'FAQ'],
]

export const heroFacts = [['plug', '600+ connectors'], ['eye', 'Read-only access'], ['cloud', 'Our cloud or yours']]

// How each kind of source connects, shown when a tile is opened.
const viaDatabase = { how: 'Read-only database account, tested before saving', sync: 'Refreshed on a schedule or by hand', products: ['ask', 'insight', 'watch'] }
const viaUpload = { how: 'Drag and drop, up to 40 MB per file', sync: 'Ready to ask as soon as it’s added', products: ['ask', 'insight'] }
const viaApp = { how: 'Read-only access to the ERP or app database', sync: 'Refreshed on a schedule or by hand', products: ['ask', 'insight', 'watch'] }
const viaModel = { how: 'Your own API key, encrypted and never shown again', sync: 'Used for every answer', products: ['ask', 'insight'] }

// [logo file or '' for a letter badge, name, category, details]
export const connectors = [
  ['postgresql.svg', 'PostgreSQL', 'databases', viaDatabase],
  ['mysql.svg', 'MySQL', 'databases', viaDatabase],
  ['mssqlserver.png', 'SQL Server', 'databases', viaDatabase],
  ['oracle.png', 'Oracle', 'databases', viaDatabase],
  ['sap.svg', 'SAP HANA', 'databases', viaDatabase],
  ['snowflake.svg', 'Snowflake', 'databases', viaDatabase],
  ['redshift.svg', 'Redshift', 'databases', viaDatabase],
  ['icon:database', 'Db2', 'databases', viaDatabase],
  ['mongodb.svg', 'MongoDB', 'databases', viaDatabase],
  ['sap.svg', 'SAP', 'business', viaApp],
  ['zoho.png', 'Zoho', 'business', viaApp],
  ['vanforces.png', 'Vanforces', 'business', viaApp],
  ['taskforces.svg', 'Taskforces', 'business', viaApp],
  ['speakorder.png', 'Speak Order', 'business', viaApp],
  ['whatasol.png', 'Whatasol', 'business', viaApp],
  ['icon:document', 'PDF', 'documents', viaUpload],
  ['icon:document', 'Word', 'documents', viaUpload],
  ['icon:document', 'PowerPoint', 'documents', viaUpload],
  ['icon:chart', 'Excel', 'documents', viaUpload],
  ['icon:document', 'Text', 'documents', viaUpload],
  ['icon:eye', 'Images (OCR)', 'documents', { ...viaUpload, how: 'Scanned pages and images are read with OCR' }],
  ['googledrive.svg', 'Google Drive', 'storage', { how: 'Google sign-in, then pick folders and shared drives', sync: 'Checked every 15 minutes, or refresh now', products: ['ask', 'insight'] }],
  ['aws.png', 'AWS S3', 'storage', { how: 'Read-only access to a bucket or prefix', sync: 'Pick the objects, then refresh', products: ['ask'] }],
  ['azure.png', 'Azure Blob', 'storage', { how: 'Read access to a container', sync: 'Pick the files, then refresh', products: ['ask'] }],
  ['gmail.svg', 'Gmail', 'email', { how: 'Google sign-in; choose labels, senders and a start date', sync: 'New mail as it arrives, fully checked every 6 hours', products: ['ask', 'insight'] }],
  ['github.svg', 'GitHub', 'email', { how: 'Repository docs and issues', sync: 'Refreshed on request', products: ['ask'] }],
  ['gitlab.svg', 'GitLab', 'email', { how: 'Project docs and repository files', sync: 'Refreshed on request', products: ['ask'] }],
  ['icon:support', 'Manual FAQ', 'email', { how: 'Type questions and answers straight in', sync: 'Available immediately', products: ['ask'] }],
  ['openai.png', 'OpenAI', 'ai', viaModel],
  ['anthropic.png', 'Anthropic', 'ai', viaModel],
  ['googlegemini.svg', 'Gemini', 'ai', { ...viaModel, products: ['ask'] }],
  ['openrouter.png', 'OpenRouter', 'ai', viaModel],
  ['icon:server', 'OpenAI-compatible', 'ai', { ...viaModel, how: 'Your own server: vLLM, Ollama, LiteLLM or a gateway' }],
  ['whatsapp.png', 'WhatsApp', 'apps', { how: 'Tap Notify me on any answer', sync: 'On a schedule, on change, or past a limit', products: ['watch'] }],
  ['telegram', 'Telegram', 'apps', { how: 'Tap Notify me on any answer', sync: 'On a schedule, on change, or past a limit', products: ['watch'] }],
  ['icon:link', 'API', 'apps', { how: 'A key per member, shown once and revocable at any time', sync: 'Answers stream as they’re written', products: ['ask', 'insight'] }],
  ['icon:chart', 'Chart widget', 'apps', { how: 'One script on any web page or mobile app', sync: 'Same charts as the app', products: ['insight'] }],
]

// How each kind of source connects, step by step.
export const sourceGuides = [
  {
    icon: 'database',
    title: 'Databases',
    lead: 'Your ERP or any SQL database.',
    steps: ['Add the host and a read-only user', 'Test the connection', 'Tick the tables and views to use', 'Refresh on a schedule, or by hand'],
    access: 'Only the tables and views you tick, read-only. Disconnect at any time.',
    never: 'Write, change or delete anything. Passwords are encrypted and never shown again.',
  },
  {
    icon: 'document',
    title: 'Documents',
    lead: 'Policies, contracts, reports and email.',
    steps: ['Drag and drop files, up to 40 MB each', 'Or pick Google Drive folders and shared drives', 'Or choose Gmail labels and senders', 'Scanned pages are read with OCR'],
    access: 'Only the files, folders and labels you choose. Remove any of them at any time.',
    never: 'Change or delete your files. If access is lost, updates stop and tell you.',
  },
  {
    icon: 'key',
    title: 'AI models',
    lead: 'Use the provider your company already trusts.',
    steps: ['Add an OpenAI, Anthropic or OpenRouter key', 'Or point to your own OpenAI-compatible server', 'Test it before saving', 'Pick the default model for new chats'],
    access: 'The question plus the evidence found for it. Numbers are calculated by code, not the model.',
    never: 'Show your key again after saving. Keys are encrypted at rest.',
  },
]

// Ways to bring entaura into other tools.
export const appIntegrations = [
  {
    icon: 'link',
    title: 'API',
    text: 'Ask questions from your portal, ERP or mobile app. Answers stream back with the text, charts and sources.',
    points: ['Each key sees only what its member can see', 'Revoke a key and it stops at once', 'Keys never reach a visitor’s browser'],
    code: 'connect  /api/v1/ws\nask      "Top 5 products this month"\n→ answer · chart · sources',
  },
  {
    icon: 'chart',
    title: 'Chart widget',
    text: 'Add one script to show entaura’s charts and tables on any web page, with CSV and PNG download.',
    points: ['Matches your colours and font', 'Never clashes with your page styles', 'Works inside mobile apps'],
    code: '<script src="…/entaura-widget.js"></script>\n<entaura-widget></entaura-widget>',
  },
  {
    icon: 'bell',
    title: 'Alerts with Watch',
    text: 'Turn any answer into a WhatsApp, Telegram or email alert: on a schedule, on change, or past a limit.',
    points: ['Tap Notify me on any answer', 'Reply STOP to cancel', 'The same checked figures as the app'],
    channels: true,
    to: '/watch.html',
  },
]

export const checklist = [
  { title: 'A read-only database user', note: 'Or a read replica of your ERP database' },
  { title: 'Network access', note: 'An IP allowlist or VPN so we can reach the database' },
  { title: 'The tables and views in scope', note: 'We help pick them during discovery' },
  { title: 'Document folders or mailbox labels', note: 'Google Drive folders, Gmail labels, or files you choose' },
  { title: 'An AI provider key', note: 'OpenAI, Anthropic, OpenRouter, or your own model server' },
  { title: 'Who should get access', note: 'Admins, managers and the staff for each knowledge base' },
]

export const faqGroups = [
  {
    title: 'Data and connections',
    items: [
      { q: 'Which ERP systems do you support?', a: 'entaura connects to your ERP’s database, whatever the system: PostgreSQL, MySQL, SQL Server, Oracle, SAP HANA and many more. We confirm the details for your setup during discovery.' },
      { q: 'How often is our data updated?', a: 'Databases refresh on a schedule you set, or by hand with one click. Google Drive checks for changes every 15 minutes, and Gmail picks up new mail as it arrives.' },
      { q: 'Do you query our ERP directly?', a: 'No. Insight reads the tables you pick into a workspace isolated for your company, so questions never slow down your ERP. You choose what is included, and you can disconnect at any time.' },
      { q: 'What happens if a source is unavailable?', a: 'Answers keep working from the last successful update. A failed update never deletes anything; it stops with a clear message so your team can reconnect.' },
      { q: 'Which files can we use?', a: 'PDF, Word, PowerPoint, Excel, text files and images, up to 40 MB each. Scanned pages are read with OCR.' },
      { q: 'We use a system that isn’t listed. Can you connect it?', a: 'Most likely. entaura connects to 600+ sources. Tell us what you use and we’ll confirm.' },
    ],
  },
  {
    title: 'Security and access',
    items: [
      { q: 'Will you change anything in our systems?', a: 'No. entaura only reads from your sources and never writes back.' },
      { q: 'Who owns our data?', a: 'You do. entaura only reads what you choose to connect, keeps it in a workspace isolated for your company, and deletes it when you ask or when you leave.' },
      { q: 'Who can see what?', a: 'Admins and managers decide which staff can use each knowledge base. Staff only see the knowledge bases they’re given, and nobody can read anyone else’s chats.' },
      { q: 'Can we use our own AI model?', a: 'Yes. Bring a key for OpenAI, Anthropic or OpenRouter, or connect your own OpenAI-compatible model server. Keys are encrypted and never shown again.' },
      { q: 'Can entaura run in our own infrastructure?', a: 'Yes. Host it in your own data centre or private cloud, with your own AI model if you prefer, so your data stays in your network. Or let entaura manage it for you.' },
    ],
  },
  {
    title: 'Rollout',
    items: [
      { q: 'What do you need from us?', a: 'Read-only access to the systems in scope, the documents you choose to include, and your KPI definitions and reports. The checklist above covers the technical side.' },
      { q: 'How do we know the numbers are right?', a: 'Your team checks the results against your existing reports before go-live, and every later update is tested against known-correct figures before it’s published.' },
      { q: 'Can we start small?', a: 'Yes. Start with a focused pilot on one business area and expand from there.' },
    ],
  },
]
