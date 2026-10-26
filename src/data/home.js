// Content for the home page. Example records, figures, and policy references
// are illustrative, chosen to show how each product answers.

export const logos = [
  { file: 'sap.svg', name: 'SAP' },
  { file: 'oracle.png', name: 'Oracle' },
  { file: 'azure.png', name: 'Azure' },
  { file: 'aws.png', name: 'AWS' },
  { file: 'postgresql.svg', name: 'PostgreSQL' },
  { file: 'mysql.svg', name: 'MySQL' },
  { file: 'mssqlserver.png', name: 'MS SQL Server' },
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
  { file: 'vanforces.png', name: 'Vanforces' },
  { file: 'taskforces.svg', name: 'Taskforces' },
  { file: 'speakorder.png', name: 'Speak Order' },
  { file: 'whatasol.png', name: 'Whatasol' },
]

export const vision = [
  { label: 'The enterprise challenge', title: 'Knowledge and data live apart.', text: 'Business policies, tools, and structured and unstructured transactional data are disconnected.' },
  { label: 'The entaura.ai vision', title: 'One intelligent layer.', text: 'Connecting enterprise knowledge with business action.' },
  { label: 'Business value', title: 'Decide, comply, and act sooner.', text: 'Better decisions, improved compliance, and proactive management.' },
]

export const showcase = [
  {
    key: 'ask',
    name: 'Ask',
    tag: 'Knowledge',
    title: 'Ask the question. See the proof.',
    text: 'Connects your ERP data and document repositories, and isolates the exact proof on demand.',
    points: ['Reads your ERP records and documents, read-only', 'Ask in Arabic, English, Hindi, Urdu, Malayalam, Tamil and more', 'Isolates the exact database entry or document clause for validation'],
    question: 'Show the policy for customer credit limits.',
    to: '/ask.html',
  },
  {
    key: 'insight',
    name: 'Insight',
    tag: 'Smart & Trusted Analytics',
    title: 'Data and policy, analysed together.',
    text: 'Combines transactional data with policy limits and returns charts, tables, SQL, and reasoning.',
    points: ['Queries policy limits and live transactions in one shot', 'Automated graphs, visual tables, SQL, and structured reasoning', 'A unified data store for fast, accurate answers'],
    question: 'Give me profit, margin, cost and tax by quarter.',
    to: '/insight.html',
  },
  {
    key: 'watch',
    name: 'Watch',
    tag: 'Alerts from your answers',
    title: 'Get told when it matters.',
    text: 'Tap Notify me on any Ask or Insight answer and get it on WhatsApp or Telegram.',
    points: ['On a schedule: the fresh answer every day, week, or hour', 'When the answer changes, or a number crosses your limit', 'Reply STOP at any time to cancel'],
    question: 'Notify me when a distributor reaches 80% of the target required to qualify for the scheme.',
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
  { step: 'Start from', items: ['An Ask answer', 'An Insight answer'], active: 1 },
  { step: 'When to tell me', items: ['On a schedule', 'When the answer changes', 'Above or below a limit'], active: 2 },
  { step: 'Where', items: ['WhatsApp', 'Telegram'], active: 0 },
]

export const watchAlerts = [
  { channel: 'whatsapp', meta: 'entaura watch · Sales · 09:12', title: 'Al Faisal Distribution reached 80% of the scheme target', text: 'SAR 412,000 of SAR 515,000 · 9 days left to qualify.' },
  { channel: 'telegram', meta: 'entaura watch · Finance · 14:40', title: 'High-value credit sale held longer than usual', text: 'SO-7781 · SAR 186,000 · held 3 days (usual: under 1 day).' },
]

export const flow = {
  sources: ['ERP and transactions', 'Policy documents', 'Enterprise tools', 'Email and drives', 'Ad hoc sources'],
  core: ['Retrieval-augmented generation', 'Agentic workflows', 'Unified data warehouse', 'Advanced LLMs'],
  products: ['ask', 'insight', 'watch'],
  // Answers appear in the app; Watch alerts go to WhatsApp or Telegram.
  channels: [
    { name: 'entaura app', src: '/assets/entaura-mark-sm.png' },
    { name: 'WhatsApp', channel: 'whatsapp' },
    { name: 'Telegram', channel: 'telegram' },
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
    { product: 'insight', sources: [0, 2], channel: 0, output: 'Chart + query: overtime vs. cap', message: 'Chart ready for finance' },
    { product: 'watch', sources: [0, 1], channel: 1, output: 'INV-2041 is 18 days overdue', message: 'Alert sent to the finance lead' },
  ],
}

// Two example questions per product, in line with the product pages and the live demo on /try.
// `before` and `now` say what changes for the team that asks it.
export const useCases = [
  {
    product: 'ask',
    questions: [
      { q: 'What is our credit limit policy for new retailers?', before: 'email finance and wait', now: 'the clause, cited, in seconds' },
      { q: 'How many leave days can employees carry over to next year?', before: 'HR answers it every month', now: 'staff check it themselves' },
    ],
  },
  {
    product: 'insight',
    questions: [
      { q: 'Which vans are underperforming today?', before: 'spotted in next week’s report', now: 'fix today’s route today' },
      { q: 'Which promotions paid for their discount?', before: 'guesswork after the campaign', now: 'stop the ones losing money' },
    ],
  },
  {
    product: 'watch',
    questions: [
      { q: 'Which invoice is overdue?', before: 'found at month-end', now: 'an alert the day it slips' },
      { q: 'Which products are running low on stock?', before: 'noticed when the shelf is empty', now: 'reorder before the lost sale' },
    ],
  },
]

// Why answers can be trusted: the platform's safeguards, in plain words.
export const trustPoints = [
  { icon: 'support', title: 'It asks before it guesses', text: 'If a question can be read two ways, you see each reading with the result it gives, and pick one.' },
  { icon: 'chart', title: 'Numbers come from code, not the AI', text: 'Every figure is fetched and calculated from certified metrics. The AI never writes a number.' },
  { icon: 'check', title: 'Tested before it goes live', text: 'Updates must match known figures from your own reports. If one fails, the last good version keeps answering.' },
  { icon: 'lock', title: 'Sealed and audited', text: 'Each workspace has its own data and read-only access. Keys are encrypted and every query is logged.' },
  { icon: 'server', title: 'Your choice of AI model', text: 'Use OpenAI, Anthropic, OpenRouter, or a private model server that keeps data in-house.' },
  { icon: 'people', title: 'Role-based access', text: 'Admins, managers and staff each see only the knowledge bases they’re given.' },
]
