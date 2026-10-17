export const problems = [
  { icon: '⌕', title: 'Proof is hard to find', text: 'Records and policies sit in different systems.' },
  { icon: '◈', title: 'Data ignores the rules', text: 'Analytics rarely check transactions against policy.' },
  { icon: '↗', title: 'Problems surface too late', text: 'Breaches are found after the damage is done.' },
  { icon: '✧', title: 'Answers are hard to trust', text: 'Results arrive without sources or reasoning.' },
]

export const industries = [
  { title: 'Retail and e-commerce', text: 'Demand, inventory, and sales performance.' },
  { title: 'Manufacturing', text: 'Quality, supply, maintenance, and delivery.' },
  { title: 'Distribution and logistics', text: 'Orders, service levels, routes, and exceptions.' },
  { title: 'Financial services', text: 'Portfolio, customer, and risk information.' },
  { title: 'SaaS and technology', text: 'Product, revenue, and support signals.' },
  { title: 'Healthcare and services', text: 'Approved knowledge and service activity.' },
  { title: 'Education', text: 'Administrative and learner information.' },
  { title: 'Professional services', text: 'Delivery, utilisation, and client decisions.' },
]

export const solutionDetails = [
  {
    id: 'solution-ask',
    icon: '⌕',
    title: 'entaura ask',
    lead: 'When proof is hard to find:',
    text: 'Searches ERP records and policy documents together and returns the exact entry or clause.',
    items: ['Verify answers against the source', 'Search records and policies in one place', 'See confidence and relevance scores'],
    to: '/ask.html',
    linkLabel: 'Explore Ask →',
  },
  {
    id: 'solution-insight',
    icon: '◈',
    title: 'entaura insight',
    lead: 'When data ignores the rules:',
    text: 'Combines transactions with policy limits in one query and shows how the answer was reached.',
    items: ['Charts and tables generated for you', 'Inspect the underlying SQL', 'Follow the reasoning step by step'],
    to: '/insight.html',
    linkLabel: 'Explore Insight →',
  },
  {
    id: 'solution-watch',
    icon: '↗',
    title: 'entaura watch',
    lead: 'When problems surface too late:',
    text: 'Turns limits, thresholds, and policy rules into monitors that alert teams early.',
    items: ['Events, schedules, or thresholds', 'Custom logic to reduce false positives', 'Alerts in your messaging apps'],
    to: '/watch.html',
    linkLabel: 'Explore Watch →',
  },
]
