// Content for the home page. Example records, figures, and policy references
// are illustrative, chosen to show how each product answers.

export const logos = [
  { file: 'sap.svg', name: 'SAP' },
  { file: 'oracle.png', name: 'Oracle' },
  { file: 'azure.png', name: 'Azure' },
  { file: 'aws.png', name: 'AWS' },
  { file: 'postgresql.svg', name: 'PostgreSQL' },
  { file: 'mysql.svg', name: 'MySQL' },
  { file: 'mongodb.svg', name: 'MongoDB' },
  { file: 'zoho.png', name: 'Zoho' },
  { file: 'googledrive.svg', name: 'Google Drive' },
  { file: 'googledocs.svg', name: 'Google Docs' },
  { file: 'outlook.png', name: 'Outlook' },
  { file: 'gmail.svg', name: 'Gmail' },
  { file: 'teams.png', name: 'Teams' },
  { file: 'slack.png', name: 'Slack' },
  { file: 'whatsapp.png', name: 'WhatsApp' },
  { file: 'basecamp.png', name: 'Basecamp' },
]

export const vision = [
  { label: 'The enterprise challenge', title: 'Knowledge and data live apart.', text: 'Business policies, tools, and structured and unstructured transactional data are disconnected.' },
  { label: 'The entaura.ai vision', title: 'One intelligent layer.', text: 'One intelligent layer connecting enterprise knowledge with business action.' },
  { label: 'Business value', title: 'Decide, comply, and act sooner.', text: 'Better decisions, improved compliance, and proactive management.' },
]

export const showcase = [
  {
    key: 'ask',
    name: 'Ask',
    tag: 'Knowledge',
    title: 'Ask the question. See the proof.',
    text: 'Unified data and document search. Ask connects directly to your ERP transactional database alongside your policy repositories.',
    points: ['One ERP connector fetches live transactional records', 'Scans unstructured policy and document stores', 'Isolates the exact database entry or document clause for validation'],
    question: 'Show the policy for customer credit limits.',
    to: '/ask.html',
  },
  {
    key: 'insight',
    name: 'Insight',
    tag: 'Smart & Trusted Analytics',
    title: 'Data and policy, analysed together.',
    text: 'Combined context and analytics. Insight combines transactional data with policy compliance in a single analytics query.',
    points: ['Queries policy limits and live transactions in one shot', 'Automated graphs, visual tables, SQL, and structured reasoning', 'A unified data store for fast, accurate answers'],
    question: 'Give me profit, margin, cost and tax by quarter.',
    to: '/insight.html',
  },
  {
    key: 'watch',
    name: 'Watch',
    tag: 'Autonomous Monitoring and Alerts',
    title: 'The real action engine.',
    text: 'Proactive action and anomaly alerts. Watch monitors operations continuously and notifies teams before critical business incidents occur.',
    points: ['Custom targets: what to watch, from ledgers to sensor telemetry', 'Custom triggers: real-time events, schedules, or thresholds', 'Custom logic: aggregations and agentic workflows that cut false positives'],
    question: 'Alert me when a distributor reaches 80% of the target required to qualify for the scheme.',
    to: '/watch.html',
  },
]

// Ask panel: the customer record behind a credit-limit answer.
export const askRecord = [
  ['Customer', 'Al Noor Trading'],
  ['Credit limit', 'SAR 250,000'],
  ['Outstanding', 'SAR 231,400'],
  ['Utilisation', '93%'],
  ['Payment terms', '30 days'],
]

// Insight panel: profit, margin, cost, and tax by quarter (deck sample, SAR).
export const quarterTable = [
  { quarter: 'Q4 2025', profit: 8.03, margin: '33.5%', cost: 15.95, tax: 3.59 },
  { quarter: 'Q1 2026', profit: 9.44, margin: '33.5%', cost: 18.75, tax: 4.22 },
  { quarter: 'Q2 2026', profit: 8.84, margin: '33.6%', cost: 17.49, tax: 3.94 },
  { quarter: 'Q3 2026', profit: 9.78, margin: '33.5%', cost: 19.46, tax: 4.38 },
]

export const watchRecipe = [
  { step: 'What to watch', items: ['Financial ledgers', 'Procurement policies', 'Sales quotas', 'Sensor telemetry', 'HR attendance'], active: 2 },
  { step: 'When to watch', items: ['Real-time events', 'Scheduled intervals', 'Threshold conditions'], active: 2 },
  { step: 'How to cook data', items: ['Custom aggregations', 'Policy limits on the fly', 'Agentic workflows'], active: 1 },
]

export const watchAlerts = [
  { channel: 'whatsapp', meta: 'entaura watch · Sales · 09:12', title: 'Al Faisal Distribution reached 80% of the scheme target', text: 'SAR 412,000 of SAR 515,000 · 9 days left to qualify.' },
  { channel: 'telegram', meta: 'entaura watch · Finance · 14:40', title: 'High-value credit sale held longer than usual', text: 'SO-7781 · SAR 186,000 · held 3 days (usual: under 1 day).' },
]

export const flow = {
  sources: ['ERP and transactions', 'Policy documents', 'Enterprise tools', 'IoT sensors', 'Ad hoc sources'],
  core: ['Retrieval-augmented generation', 'Agentic workflows', 'Unified data warehouse', 'Advanced LLMs'],
  products: ['ask', 'insight', 'watch'],
  channels: [
    { name: 'Microsoft Teams', icon: 'teams.png' },
    { name: 'Slack', icon: 'slack.png' },
    { name: 'WhatsApp', icon: 'whatsapp.png' },
    { name: 'Email', icon: 'gmail.svg' },
  ],
  steps: [
    { label: 'Connect', caption: 'Your data and policies flow in.' },
    { label: 'Understand', caption: 'entaura.ai reasons over them together.' },
    { label: 'Act', caption: 'The right product answers.' },
    { label: 'Deliver', caption: 'Your team is notified where they work.' },
  ],
  // One request traced end to end per product. Sources and channel are
  // indexes into `sources` and `channels`.
  scenarios: [
    { product: 'ask', sources: [0, 1], channel: 0, output: 'Evidence: PO-4471 · Policy §4.2', message: 'Answer with sources shared' },
    { product: 'insight', sources: [0, 2], channel: 1, output: 'Chart + SQL: overtime vs. cap', message: 'Report posted to #finance' },
    { product: 'watch', sources: [3, 1], channel: 2, output: 'CS-02 above 8°C for 12 min', message: 'Alert sent to the shift lead' },
  ],
}

// Two example questions per product, from the TEXOL demo data used on /try.
export const useCases = [
  { product: 'ask', questions: ['What is the refund request period?', 'What are the differences between TEXOL Start, Growth, and Enterprise?'] },
  { product: 'insight', questions: ['Which product had the highest revenue in March 2026?', 'What was the total Europe revenue in April 2026?'] },
  { product: 'watch', questions: ['Which invoice is overdue?', 'Which products are running low on stock?'] },
]
