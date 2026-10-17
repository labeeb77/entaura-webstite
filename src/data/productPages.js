export const productPages = {
  ask: {
    meta: 'ask',
    hero: {
      eyebrow: '01 / Knowledge',
      title: 'Ask the question.',
      gradientLines: ['See the proof.'],
      text: 'Unified search across your ERP records and policy documents.',
    },
    detail: {
      eyebrow: 'Unified data and document search',
      title: 'One question across records and policies.',
      paragraphs: [
        'One ERP connector fetches live transactional records while Ask scans your policy and document stores. If a question is unclear, it asks what you mean first.',
        'Each answer isolates the exact database entry or document clause, with confidence and relevance scores, so you can validate it.',
      ],
      diagram: 'knowledge',
    },
    examples: {
      eyebrow: 'See Ask in action',
      title: 'Questions',
      gradient: 'it answers.',
      items: [
        '“Show the policy for customer credit limits.”',
        '“Give total sales orders by distributor.”',
        '“Which retailers buying biscuits are not buying our beverages?”',
      ],
    },
    cta: {
      title: 'Give your team answers they can verify.',
      text: 'Tell us which records and policies your teams need to search.',
    },
  },
  insight: {
    meta: 'insight',
    hero: {
      eyebrow: '02 / Smart & trusted analytics',
      title: 'One AI.',
      gradientLines: ['Multiple sources.', 'Lightning-fast insights.'],
      text: 'Analyse transactions and policy limits together in a single query.',
    },
    detail: {
      eyebrow: 'Combined context and analytics',
      title: 'Analyse the numbers and the rules together.',
      paragraphs: [
        'Insight queries policy limits and live transactions in one shot, and shows automated graphs, visual tables, the underlying SQL, and structured reasoning.',
        'Disparate enterprise sources are pooled into a unified data store for fast, accurate answers.',
      ],
      diagram: 'analytics',
    },
    examples: {
      eyebrow: 'See Insight in action',
      title: 'Answers that reveal',
      gradient: 'what is next.',
      items: [
        '“Compare sales and collections for the last six months.”',
        '“Which promotions paid for their discount?”',
        '“Where are last quarter’s orders getting stuck?”',
      ],
    },
    cta: {
      title: 'Give every decision a stronger foundation.',
      text: 'Tell us which questions your data should be answering.',
    },
  },
  watch: {
    meta: 'watch',
    hero: {
      eyebrow: '03 / Autonomous monitoring and alerts',
      title: 'Monitor changes',
      gradientLines: ['before they become incidents.'],
      text: 'The action engine that notifies teams before critical incidents occur.',
    },
    detail: {
      eyebrow: 'Proactive action and anomaly alerts',
      title: 'Decide what to watch, when, and how.',
      paragraphs: [
        'Watch anything from financial ledgers and sales quotas to sensor telemetry and HR attendance, on real-time events, schedules, or thresholds.',
        'Custom aggregations and agentic workflows combine transactions with policy limits to cut false positives.',
      ],
      diagram: 'connector',
    },
    examples: {
      eyebrow: 'See Watch in action',
      title: 'Signals worth',
      gradient: 'paying attention to.',
      items: [
        '“Notify finance if overdue invoices rise above the threshold.”',
        '“Alert me when a distributor reaches 80% of the scheme target.”',
        '“Alert me whenever high-value credit sales are held longer than usual.”',
      ],
    },
    cta: {
      title: 'Make important change impossible to miss.',
      text: 'Tell us what your team needs to monitor.',
    },
  },
}

// `type` selects the chip's accent colour in styles.css.
export const connectorColumns = {
  left: [
    { type: 'database', badge: 'ERP', label: 'ERP data' },
    { type: 'storage', badge: '§', label: 'Policies' },
    { type: 'marketing', badge: '◌', label: 'IoT sensors' },
  ],
  right: [
    { type: 'sales', badge: '$', label: 'Finance' },
    { type: 'finance', badge: 'PO', label: 'Procurement' },
    { type: 'engineering', badge: 'HR', label: 'HR & attendance' },
  ],
}

// Ask's connected sources, drawn as logos on three orbits around the core.
// `size` is the ring diameter as a percentage of the diagram's width.
export const knowledgeOrbits = [
  { size: 44, duration: 38, logos: [['sap.svg', 'SAP'], ['googledrive.svg', 'Google Drive'], ['postgresql.svg', 'PostgreSQL'], ['outlook.png', 'Outlook']] },
  { size: 70, duration: 56, logos: [['oracle.png', 'Oracle'], ['slack.png', 'Slack'], ['mysql.svg', 'MySQL'], ['googledocs.svg', 'Google Docs'], ['zoho.png', 'Zoho'], ['teams.png', 'Microsoft Teams']] },
  { size: 96, duration: 80, logos: [['azure.png', 'Azure'], ['gmail.svg', 'Gmail'], ['mongodb.svg', 'MongoDB'], ['aws.png', 'AWS'], ['whatsapp.png', 'WhatsApp'], ['basecamp.png', 'Basecamp']] },
]

export const analyticsKpis = [
  { label: 'Revenue', value: '↑ 18.4%' },
  { label: 'Margin', value: '↗ 6.2%' },
]

export const analyticsMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
