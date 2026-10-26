// entaura insight product page. Each section answers one question a visitor has.
// Screen recreations use sample data for a fictional distributor.

export const insightPage = {
  hero: {
    eyebrow: 'Analytics',
    title: 'Ask your data.',
    gradientLines: ['Get numbers you can trust.'],
    text: 'Insight turns your ERP data into certified answers: the right chart, the exact figures, and the query behind every number.',
  },

  audience: {
    eyebrow: 'Who it’s for',
    title: 'For the people who',
    gradient: 'wait on reports.',
    text: 'Managers set up the data once. Staff only see the knowledge bases they’ve been given.',
    items: [
      { icon: 'chart', team: 'Finance', example: '“Revenue by branch compared with last year.”' },
      { icon: 'rocket', team: 'Sales leadership', example: '“Which reps missed their target this month?”' },
      { icon: 'server', team: 'Distribution and operations', example: '“Where are today’s orders getting stuck?”' },
      { icon: 'people', team: 'HR', example: '“Attrition by department this year.”' },
      { icon: 'flag', team: 'Trade marketing', example: '“Which promotions paid for their discount?”' },
      { icon: 'eye', team: 'Leadership', example: '“How is the business performing this quarter?”' },
    ],
  },

  problems: {
    eyebrow: 'Why Insight',
    outcomeLabel: 'With Insight',
    title: 'Answers in seconds,',
    gradient: 'not report requests.',
    items: [
      {
        problem: 'Every new question needs a report, a data team, and a few days.',
        outcome: 'Ask in plain words and get the chart in seconds.',
      },
      {
        problem: 'AI tools sound confident, then make up the numbers.',
        outcome: 'Every figure is fetched and calculated by code from certified metrics.',
      },
      {
        problem: 'Each team counts an “active customer” a different way.',
        outcome: 'Company definitions are shared, and Insight asks when a question could mean two things.',
      },
    ],
  },

  steps: {
    eyebrow: 'How it works',
    title: 'Three steps',
    gradient: 'from raw data to answers.',
    items: [
      { screen: 'connect', title: 'Connect your database', text: 'Insight analyses a synced, read-only copy in a sealed workspace, so questions never put load on your ERP.' },
      { screen: 'certify', title: 'Model and certify', text: 'Start from a ready-made data model. A new version goes live only when every golden check passes.' },
      { screen: 'ask', title: 'Ask and see the chart', text: 'Get the answer with the right chart, and open “How this was computed” to see every query behind it.' },
    ],
  },

  capabilities: {
    eyebrow: 'What you can do',
    title: 'Analytics that',
    gradient: 'shows its work.',
    items: [
      { icon: 'check', title: 'Certified metrics', text: 'Answers come from metrics your team has defined and tested, so the same question always gives the same number.' },
      { icon: 'chart', title: 'The right chart', text: 'KPI tiles, bars, lines, donuts or tables, chosen from the shape of the result. Download as CSV or PNG.' },
      { icon: 'search', title: 'How this was computed', text: 'Every answer shows the metrics, filters, dates and queries it used, so anyone can check it.' },
      { icon: 'support', title: 'Asks instead of guessing', text: 'When a question could mean two things, it shows the options with real counts and lets you choose.' },
      { icon: 'link', title: 'Follow-ups and files', text: '“Same for September” reuses the last query. Attach a budget sheet and compare it with actuals.' },
      { icon: 'document', title: 'Documents beside numbers', text: 'Contracts, reports and email threads are searched too, with citations to the exact page.' },
    ],
  },

  screens: {
    eyebrow: 'See it',
    title: 'What Insight',
    gradient: 'looks like.',
    text: 'Screens from the app, shown with sample data.',
  },

  integrations: {
    eyebrow: 'Works with your systems',
    title: 'Built for the ERP',
    gradient: 'you already run.',
    text: 'These are the most common. entaura connects to 600+ databases, apps, and file stores.',
    groups: [
      {
        title: 'Databases',
        note: 'Connected with a read-only account and synced on a schedule. Plus 600+ other sources.',
        more: '600+',
        items: [['postgresql.svg', 'PostgreSQL'], ['mysql.svg', 'MySQL'], ['mssqlserver.png', 'SQL Server'], ['oracle.png', 'Oracle'], ['sap.svg', 'SAP HANA'], ['snowflake.svg', 'Snowflake'], ['redshift.svg', 'Redshift'], ['icon:database', 'Db2'], ['mongodb.svg', 'MongoDB']],
      },
      {
        title: 'Documents',
        note: 'Uploaded or synced, then cited next to the numbers.',
        items: [['icon:document', 'PDF'], ['icon:document', 'Word'], ['icon:document', 'PowerPoint'], ['icon:chart', 'Excel'], ['googledrive.svg', 'Google Drive'], ['gmail.svg', 'Gmail']],
      },
      {
        title: 'Ready-made data models',
        note: 'Start from a tested template instead of a blank page.',
        items: [['icon:document', 'SAP-style billing'], ['icon:database', 'Order-based ERP'], ['icon:rocket', 'Van sales (FMCG)'], ['icon:people', 'HR and workforce']],
      },
    ],
    models: [['openai.png', 'OpenAI'], ['anthropic.png', 'Anthropic'], ['openrouter.png', 'OpenRouter'], ['icon:server', 'OpenAI-compatible']],
    setup: 'Your team connects a read-only account and we help map your data model. An API and an embeddable chart widget bring the same answers into your own apps.',
  },

  trust: {
    eyebrow: 'Security and data',
    title: 'Sealed off,',
    gradient: 'by design.',
    items: [
      { icon: 'layers', title: 'Isolated per knowledge base', text: 'Each knowledge base has its own databases and its own read-only user, even inside one company.' },
      { icon: 'server', title: 'Runs on a synced copy', text: 'Analytics run on a synced, read-only copy, so questions never put load on your ERP.' },
      { icon: 'check', title: 'Checked before it goes live', text: 'Golden checks must pass before a new data model is published. Otherwise the last good version keeps answering.' },
      { icon: 'lock', title: 'Read-only, with limits', text: 'Every query is read-only, with time and row caps.' },
      { icon: 'key', title: 'Encrypted credentials', text: 'Database passwords and AI keys are encrypted and never sent back to the browser.' },
      { icon: 'people', title: 'Role access and audit', text: 'Roles decide who can ask what, and every query is logged with who asked and what ran.' },
    ],
  },

  cta: {
    title: 'See Insight on your own data.',
    text: 'Try the live demo, or book a walkthrough with our team.',
  },
}
