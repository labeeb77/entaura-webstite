export const products = [
  {
    key: 'ask',
    tag: '01 / Targeted verification',
    name: 'EntAura Ask',
    dotClass: 'dot-teal',
    text: 'Ask in plain language and get the exact record or document clause that proves the answer, drawn from your ERP data and policy repositories.',
    features: ['Natural language', 'ERP records', 'Policy documents', 'Source evidence'],
    to: '/ask.html',
    linkLabel: 'Explore Ask',
    detail: {
      title: 'Ask for proof',
      copy: 'Search ERP records and policy documents together and see exactly where each answer comes from.',
      items: ['Exact records and clauses', 'Confidence and relevance scores', 'Clarifying questions when needed'],
    },
  },
  {
    key: 'insight',
    tag: '02 / Smart cross-analysis',
    name: 'EntAura Insight',
    dotClass: 'dot-blue',
    text: 'Combine transactional data with policy limits in one question and get charts, tables, the underlying SQL, and the reasoning behind each answer.',
    features: ['Charts and tables', 'Visible SQL', 'Clear reasoning', 'Unified data store'],
    to: '/insight.html',
    linkLabel: 'Explore Insight',
    detail: {
      title: 'Analyse in context',
      copy: 'Question live transactions and policy limits together, and see how each result was produced.',
      items: ['Automatic charts and tables', 'SQL you can inspect', 'Step-by-step reasoning'],
    },
  },
  {
    key: 'watch',
    tag: '03 / Autonomous safeguard',
    name: 'EntAura Watch',
    dotClass: 'dot-purple',
    text: 'Choose what to watch, when to check, and the logic to apply. Watch monitors continuously and alerts the right people before a problem becomes an incident.',
    features: ['Custom targets', 'Flexible triggers', 'Threshold alerts', 'Messenger alerts'],
    to: '/watch.html',
    linkLabel: 'Explore Watch',
    detail: {
      title: 'Watch what matters',
      copy: 'Turn limits, thresholds, and policy rules into monitors that run on their own.',
      items: ['Events, schedules, or thresholds', 'Custom logic to cut false positives', 'Alerts in your messaging apps'],
    },
  },
]

export const insightBarHeights = ['35%', '54%', '44%', '68%', '61%', '84%', '97%']
