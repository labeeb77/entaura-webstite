export const productPages = {
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
