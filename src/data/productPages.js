export const productPages = {
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

export const analyticsKpis = [
  { label: 'Revenue', value: '↑ 18.4%' },
  { label: 'Margin', value: '↗ 6.2%' },
]

export const analyticsMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
