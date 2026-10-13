// Content for the home page. Example records, figures, and policy references
// are illustrative, chosen to show how each product answers.

export const heroScenes = [
  {
    key: 'ask',
    label: 'Ask',
    caption: 'Targeted verification',
    question: 'Is PO-4471 within the approved procurement limit?',
    answer: 'No. PO-4471 totals SAR 186,400, above the SAR 150,000 department-head limit. CFO approval is required before release.',
    evidence: [
      { kind: 'ERP', text: 'purchase_orders · PO-4471 · SAR 186,400' },
      { kind: 'Policy', text: 'Purchase Policy v3.1 · §4.2 Approval limits' },
    ],
    confidence: 96,
  },
  {
    key: 'insight',
    label: 'Insight',
    caption: 'Smart cross-analysis',
    question: 'Compare overtime cost with the HR policy cap, by department.',
    bars: [
      { label: 'Ops', value: 92 },
      { label: 'Sales', value: 58 },
      { label: 'Finance', value: 41 },
      { label: 'Logistics', value: 77 },
      { label: 'IT', value: 35 },
    ],
    cap: 70,
    sql: 'SELECT dept, SUM(ot_cost) FROM payroll\nWHERE month = :current GROUP BY dept;',
    finding: 'Ops and Logistics exceed the 70% overtime cap in HR Policy §7.1.',
  },
  {
    key: 'watch',
    label: 'Watch',
    caption: 'Autonomous safeguard',
    question: 'Alert me when cold-storage temperature stays above 8°C for 10 minutes.',
    rules: [
      { label: 'What', value: 'IoT sensor · Cold room CS-02' },
      { label: 'When', value: 'Above 8°C for 10 min' },
      { label: 'How', value: 'Skip defrost cycles per SOP-12' },
    ],
    alert: { channel: 'Microsoft Teams', time: '02:14', text: 'CS-02 held 9.4°C for 12 min. Warehouse team notified.' },
  },
]

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
  { label: 'The challenge', title: 'Knowledge and data live apart.', text: 'Business policies, tools, and structured and unstructured transactional data sit in disconnected systems.' },
  { label: 'The EntAura vision', title: 'One intelligent layer.', text: 'EntAura connects enterprise knowledge with business action, so every answer draws on the full picture.' },
  { label: 'The value', title: 'Decide, comply, and act sooner.', text: 'Better decisions, improved compliance, and proactive management across the organization.' },
]

export const showcase = [
  {
    key: 'ask',
    name: 'Ask',
    tag: 'Targeted verification',
    title: 'Ask the question. See the proof.',
    text: 'Search live ERP records and policy repositories together. Ask isolates the exact database entry or document clause behind each answer, so teams validate instead of trusting.',
    points: ['One ERP connector for live transactional records', 'Scans unstructured policy and document stores', 'Evidence extracted separately for targeted validation'],
    to: '/ask.html',
  },
  {
    key: 'insight',
    name: 'Insight',
    tag: 'Smart cross-analysis',
    title: 'Data and policy, analysed together.',
    text: 'Query policy limits and live transactions in one shot. Insight returns charts, tables, the underlying SQL, and structured reasoning from a unified, optimized data store.',
    points: ['Automatic graphs and visual tables', 'SQL you can inspect and reuse', 'Step-by-step reasoning for every result'],
    to: '/insight.html',
  },
  {
    key: 'watch',
    name: 'Watch',
    tag: 'Autonomous safeguard',
    title: 'Act before issues become incidents.',
    text: 'The real action engine. Define what to watch, when to check, and how to read the data, and Watch alerts the right people across the messengers they already use.',
    points: ['Custom targets, from ledgers to sensor telemetry', 'Event, schedule, or threshold triggers', 'Agentic logic that removes false positives'],
    to: '/watch.html',
  },
]

export const askRecord = [
  ['PO number', 'PO-4471'],
  ['Vendor', 'Gulf Industrial Supplies'],
  ['Department', 'Operations'],
  ['Amount', 'SAR 186,400'],
  ['Approver', 'Dept. head'],
]

export const insightTable = [
  ['Ops', '92%', 'Over cap'],
  ['Logistics', '77%', 'Over cap'],
  ['Sales', '58%', 'Within'],
]

export const watchRecipe = [
  { step: 'What to watch', items: ['Financial ledgers', 'Procurement policy', 'Sales quotas', 'Sensor telemetry', 'HR attendance'], active: 3 },
  { step: 'When to watch', items: ['Real-time events', 'Scheduled intervals', 'Threshold conditions'], active: 2 },
  { step: 'How to read it', items: ['Custom aggregations', 'Policy limits on the fly', 'Agentic workflows'], active: 1 },
]

export const anatomy = [
  { n: 1, title: 'Confidence and relevance', text: 'Every answer is scored, so teams know how far to rely on it.' },
  { n: 2, title: 'Source evidence', text: 'The exact record and clause, linked back to where they live.' },
  { n: 3, title: 'Logical reasoning', text: 'The steps that led from the question to the conclusion.' },
  { n: 4, title: 'Dynamic SQL', text: 'The query run against your ERP, tools, IoT, and ad hoc sources.' },
  { n: 5, title: 'Interactive disambiguation', text: 'When a question lacks context, EntAura asks before it answers.' },
]

export const flow = {
  sources: ['ERP and transactions', 'Policy documents', 'Enterprise tools', 'IoT sensors', 'Ad hoc sources'],
  core: ['Retrieval-augmented generation', 'Agentic workflows', 'Unified data warehouse', 'Advanced LLMs'],
  products: ['ask', 'insight', 'watch'],
  channels: ['Microsoft Teams', 'Slack', 'WhatsApp', 'Email'],
}

export const useCases = [
  {
    team: 'Finance',
    prompts: [
      { product: 'ask', text: 'Which invoices this month exceeded the approved credit limit?' },
      { product: 'insight', text: 'Show budget versus actual by cost centre against the spending policy.' },
      { product: 'watch', text: 'Notify me when receivables over 90 days pass SAR 500,000.' },
    ],
  },
  {
    team: 'Procurement',
    prompts: [
      { product: 'ask', text: 'What does the purchase policy say about quote approvals, and did this order follow it?' },
      { product: 'insight', text: 'Which vendors had the most single-source purchases this quarter?' },
      { product: 'watch', text: 'Flag any PO raised without three quotations above the policy threshold.' },
    ],
  },
  {
    team: 'HR',
    prompts: [
      { product: 'ask', text: 'How many leave days is this employee entitled to under the current policy?' },
      { product: 'insight', text: 'Compare overtime by department with the HR policy cap.' },
      { product: 'watch', text: 'Alert managers when attendance drops below 90% for a week.' },
    ],
  },
  {
    team: 'Operations & IoT',
    prompts: [
      { product: 'ask', text: 'What is the safety procedure for a cold-room temperature breach?' },
      { product: 'insight', text: 'Chart machine downtime against the maintenance schedule.' },
      { product: 'watch', text: 'Message the shift lead when vibration on line 3 crosses its limit.' },
    ],
  },
]
