export const problems = [
  { icon: 'search', title: 'Proof is hard to find', text: 'Records and policies sit in different systems.' },
  { icon: 'shield', title: 'Data ignores the rules', text: 'Analytics rarely check transactions against policy.' },
  { icon: 'bell', title: 'Problems surface too late', text: 'Overdue invoices and missed targets are found after the damage is done.' },
  { icon: 'check', title: 'Answers are hard to trust', text: 'Results arrive without sources or reasoning.' },
]

// The industries entaura ships ready-made data models for. Each question
// opens the live demo with that question ready to ask.
export const industries = [
  {
    icon: 'rocket',
    title: 'FMCG distribution',
    text: 'Van routes and visits, pre-orders, focused SKUs, promotions and stock.',
    questions: ['Which vans are underperforming today?', 'Which promotions paid for their discount?', 'What stock is at risk of expiring before it sells?'],
  },
  {
    icon: 'layers',
    title: 'Parts and manufacturing',
    text: 'SAP-style billing with credit memos, cancellations and multiple currencies.',
    questions: ['Which customers had the most credit memos this quarter?', 'Net sales by currency this fiscal year', 'Which invoices were cancelled after dispatch?'],
  },
  {
    icon: 'database',
    title: 'Food distribution',
    text: 'Order-based ERP with salesmen, routes and monthly targets.',
    questions: ['Which salesmen are behind their monthly target?', 'Where are today’s orders getting stuck?', 'Compare this month’s sales with the budget I attached.'],
  },
  {
    icon: 'people',
    title: 'Gulf HR and workforce',
    text: 'Headcount, people cost, attrition and recruitment across KSA and UAE.',
    questions: ['Attrition by department this year', 'People cost as a share of revenue by company', 'Which roles have been open the longest?'],
  },
]

export const solutionDetails = [
  {
    id: 'solution-ask',
    icon: 'search',
    title: 'entaura ask',
    lead: 'When proof is hard to find:',
    text: 'Searches ERP records and policy documents together and returns the exact entry or clause.',
    items: ['Verify answers against the source', 'Search records and policies in one place', 'Ask in Arabic, English, Hindi and more'],
    to: '/ask.html',
    linkLabel: 'Explore Ask →',
  },
  {
    id: 'solution-insight',
    icon: 'chart',
    title: 'entaura insight',
    lead: 'When data ignores the rules:',
    text: 'Combines transactions with policy limits in one query and shows how the answer was reached.',
    items: ['Charts and tables generated for you', 'See how every number was computed', 'Tested against your own reports'],
    to: '/insight.html',
    linkLabel: 'Explore Insight →',
  },
  {
    id: 'solution-watch',
    icon: 'bell',
    title: 'entaura watch',
    lead: 'When problems surface too late:',
    text: 'Turns any Ask or Insight answer into an alert, so the right person hears about it in time.',
    items: ['On a schedule, on change, or past a limit', 'Alerts on WhatsApp or Telegram', 'Reply STOP to cancel any time'],
    to: '/watch.html',
    linkLabel: 'Explore Watch →',
  },
]
