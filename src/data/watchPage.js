// entaura watch product page. Watch has no app of its own: it turns an Ask or
// Insight answer into an alert on WhatsApp or Telegram.

export const watchPage = {
  hero: {
    eyebrow: 'Alerts',
    title: 'Ask once.',
    gradientLines: ['Get told when it matters.'],
    text: 'Watch turns any Ask or Insight answer into an alert. Tap Notify me, choose WhatsApp or Telegram, and we’ll message you when it’s due, when the answer changes, or when a number crosses your limit.',
  },

  audience: {
    eyebrow: 'Who it’s for',
    title: 'For anyone who checks',
    gradient: 'the same number every day.',
    text: 'If you already ask it in Ask or Insight, you can be told about it automatically.',
    items: [
      { icon: 'chart', team: 'Finance', example: '“Tell me every morning which invoices went overdue.”' },
      { icon: 'rocket', team: 'Sales', example: '“Message me when a distributor reaches 80% of target.”' },
      { icon: 'server', team: 'Operations', example: '“Alert me if orders awaiting stock go above 10.”' },
      { icon: 'layers', team: 'Procurement and stock', example: '“Tell me when any SKU drops below its minimum.”' },
      { icon: 'people', team: 'HR', example: '“Headcount and absences every Sunday.”' },
      { icon: 'flag', team: 'Leadership', example: '“Send me today’s sales at 6 pm.”' },
    ],
  },

  problems: {
    eyebrow: 'Why Watch',
    outcomeLabel: 'With Watch',
    title: 'Stop checking.',
    gradient: 'Start getting told.',
    items: [
      {
        problem: 'You only find out when someone remembers to check a report.',
        outcome: 'The answer comes to you on its own, on time.',
      },
      {
        problem: 'Dashboards are built, then nobody opens them.',
        outcome: 'Alerts land in WhatsApp or Telegram, where people already are.',
      },
      {
        problem: 'Alert tools need rules, setup and someone to maintain them.',
        outcome: 'Any question you’ve already asked becomes an alert in two taps.',
      },
    ],
  },

  steps: {
    eyebrow: 'How it works',
    title: 'Three steps',
    gradient: 'from answer to alert.',
    items: [
      { screen: 'ask', title: 'Ask a question', text: 'Ask in Ask or Insight as usual. Every answer has a Notify me button.' },
      { screen: 'setup', title: 'Tap Notify me', text: 'Choose WhatsApp or Telegram, then when to be told: on a schedule, when it changes, or past a limit.' },
      { screen: 'message', title: 'Get the message', text: 'Watch re-runs the question and sends you the fresh answer. Reply STOP to cancel any time.' },
    ],
  },

  capabilities: {
    eyebrow: 'What you can do',
    title: 'Alerts that',
    gradient: 'stay out of your way.',
    items: [
      { icon: 'bell', title: 'On a schedule', text: 'Daily, weekly or hourly. Get the fresh answer without opening the app.' },
      { icon: 'eye', title: 'When the answer changes', text: 'Watch re-checks the question and only messages you when the result is different.' },
      { icon: 'flag', title: 'When a limit is crossed', text: 'Set a threshold, like overdue invoices above SAR 100K, and hear about it the moment it’s passed.' },
      { icon: 'link', title: 'WhatsApp and Telegram', text: 'Alerts arrive in the messenger your team already uses, on any phone.' },
      { icon: 'check', title: 'The same trusted answer', text: 'Every alert carries the same certified numbers and sources as the answer in the app.' },
      { icon: 'lock', title: 'Stop any time', text: 'Reply STOP to the message and the alert is cancelled straight away.' },
    ],
  },

  screens: {
    eyebrow: 'See it',
    title: 'What Watch',
    gradient: 'looks like.',
    text: 'From an answer to an alert on your phone, shown with sample data.',
  },

  integrations: {
    eyebrow: 'Works with',
    title: 'Built on Ask and Insight,',
    gradient: 'delivered where you chat.',
    groups: [
      {
        title: 'Starts from',
        note: 'Any answer from your connected documents and databases.',
        links: [['/ask.html', 'ask'], ['/insight.html', 'insight']],
        items: [],
      },
      {
        title: 'Delivered to',
        note: 'Pick the channel when you tap Notify me.',
        items: [['whatsapp.png', 'WhatsApp'], ['telegram', 'Telegram']],
      },
      {
        title: 'No extra setup',
        note: 'Watch uses the knowledge bases, data and access you already have.',
        items: [['icon:database', 'Same sources'], ['icon:people', 'Same access'], ['icon:check', 'Same answers']],
      },
    ],
    setup: 'There’s nothing to install. Once your knowledge base answers questions, every answer can become an alert.',
  },

  trust: {
    eyebrow: 'Security and control',
    title: 'Your alerts,',
    gradient: 'your rules.',
    items: [
      { icon: 'people', title: 'Same access rules', text: 'You only get alerts about knowledge bases you’re allowed to open.' },
      { icon: 'check', title: 'Same verified answer', text: 'Figures come from the same certified metrics and cited sources as the app.' },
      { icon: 'search', title: 'Only what you asked', text: 'Each alert re-runs one saved question. Nothing else is sent.' },
      { icon: 'lock', title: 'You’re in control', text: 'Reply STOP at any time and the alert ends immediately.' },
    ],
  },

  cta: {
    title: 'Turn your next answer into an alert.',
    text: 'Try the live demo, or talk to our team about your own data.',
  },
}
