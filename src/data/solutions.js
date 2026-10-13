export const problems = [
  { icon: '⌕', title: 'Proof is hard to find', text: 'Ask isolates the exact record or policy clause, so teams verify instead of search.' },
  { icon: '◈', title: 'Data ignores the rules', text: 'Insight analyses transactions against policy limits in the same query.' },
  { icon: '↗', title: 'Problems surface too late', text: 'Watch monitors limits, sensor readings, and compliance, and alerts teams first.' },
  { icon: '✧', title: 'Answers are hard to trust', text: 'EntAura shows the confidence scores, sources, reasoning, and SQL behind what it tells you.' },
]

export const solutionSteps = [
  { label: 'ASK', title: 'For verification', text: 'Help finance, procurement, HR, and audit teams find the exact record or clause they need.' },
  { label: 'INSIGHT', title: 'For analysis', text: 'Help leaders see performance and policy compliance together, with the workings shown.' },
  { label: 'WATCH', title: 'For safeguarding', text: 'Help operations, finance, and compliance teams act before limits are breached.' },
]

export const industries = [
  { title: 'Retail and e-commerce', text: 'Understand demand, customer behavior, inventory signals, and sales performance.' },
  { title: 'Manufacturing', text: 'Connect production knowledge with quality, supply, maintenance, and delivery decisions.' },
  { title: 'Distribution and logistics', text: 'Monitor orders, service levels, exceptions, routes, and operational performance.' },
  { title: 'Financial services', text: 'Give teams clearer access to portfolio, customer, risk, and operational information.' },
  { title: 'SaaS and technology', text: 'Bring product, customer, revenue, support, and engineering signals into one view.' },
  { title: 'Healthcare and services', text: 'Help teams work with approved knowledge, service activity, and performance measures.' },
  { title: 'Education', text: 'Make administrative, learner, service, and institutional information easier to use.' },
  { title: 'Professional services', text: 'Support delivery, utilization, clients, projects, and commercial decisions with context.' },
]

export const solutionDetails = [
  {
    id: 'solution-ask',
    icon: '⌕',
    title: 'EntAura Ask',
    lead: 'When teams cannot find proof:',
    text: 'Ask searches ERP records and policy documents together and returns the exact entry or clause.',
    items: ['Verify answers against the source', 'Search records and policies in one place', 'See confidence and relevance scores'],
    to: '/ask.html',
    linkLabel: 'Explore Ask →',
  },
  {
    id: 'solution-insight',
    icon: '◈',
    title: 'EntAura Insight',
    lead: 'When data and policy sit apart:',
    text: 'Insight combines transactions with policy limits in one query and shows how the answer was reached.',
    items: ['Charts and tables generated for you', 'Inspect the underlying SQL', 'Follow the reasoning step by step'],
    to: '/insight.html',
    linkLabel: 'Explore Insight →',
  },
  {
    id: 'solution-watch',
    icon: '↗',
    title: 'EntAura Watch',
    lead: 'When issues are found too late:',
    text: 'Watch turns limits, thresholds, and policy rules into monitors that alert teams early.',
    items: ['Events, schedules, or thresholds', 'Custom logic to reduce false positives', 'Alerts in your messaging apps'],
    to: '/watch.html',
    linkLabel: 'Explore Watch →',
  },
]
