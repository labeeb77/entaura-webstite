export const productPages = {
  ask: {
    meta: 'ask',
    hero: {
      eyebrow: '01 / Targeted verification',
      title: 'Ask the question.',
      gradientLines: ['See the proof.'],
      text: 'EntAura Ask searches your ERP records and policy repositories together and returns the exact entry or clause that answers the question.',
    },
    detail: {
      eyebrow: 'Unified data and document search',
      title: 'One question across records and policies.',
      paragraphs: [
        'Ask connects directly to your ERP transactional database alongside your policy repositories. Ask about an invoice, a limit, a customer, or a procedure in your own words.',
        'It then isolates the exact database entries or document clauses, so you can validate the answer instead of taking it on trust.',
      ],
      diagram: 'knowledge',
    },
    examples: {
      eyebrow: 'See Ask in action',
      title: 'Questions your team',
      gradient: 'can ask today.',
      items: [
        { label: 'Finance', text: '“Which invoices this month exceeded the approved credit limit?”' },
        { label: 'Procurement', text: '“What does our purchase policy say about quote approvals, and did this order follow it?”' },
        { label: 'HR', text: '“How many leave days is this employee entitled to under the current policy?”' },
      ],
    },
    steps: {
      eyebrow: 'Evidence, not just an answer',
      title: 'Built for confidence',
      gradient: 'at the speed of work.',
      items: [
        { label: '01 / CONNECT', title: 'Link records and policies', text: 'One connector for live ERP data, plus your document stores.' },
        { label: '02 / ASK', title: 'Use your own words', text: 'If a question is unclear, Ask checks what you mean first.' },
        { label: '03 / VERIFY', title: 'See the evidence', text: 'The record or clause, with confidence and relevance scores.' },
      ],
    },
    sources: {
      eyebrow: 'Configure what Ask understands',
      title: 'Bring your business',
      gradient: 'into the conversation.',
      text: 'Connect transactional data, policy documents, enterprise tools, IoT inputs, and ad hoc sources so every question is answered with the right context.',
      items: [
        '▦ ERP transactional data',
        '▤ Policy and procedure documents',
        '◈ Enterprise tools',
        '◌ IoT sensor inputs',
        '☁ Document and file storage',
        '✦ Ad hoc data sources',
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
      eyebrow: '02 / Smart cross-analysis',
      title: 'One AI.',
      gradientLines: ['Multiple sources.', 'Lightning-fast insights.'],
      text: 'EntAura Insight combines transactional data with policy limits in a single query and shows the charts, tables, SQL, and reasoning behind the result.',
    },
    detail: {
      eyebrow: 'Combined context and analytics',
      title: 'Analyse the numbers and the rules together.',
      paragraphs: [
        'Insight answers questions that span live transactions and policy limits in one step, such as where spending has drifted from the approved policy and why.',
        'Disparate enterprise sources are pooled into a unified data store, so answers come back fast and stay consistent.',
      ],
      diagram: 'analytics',
    },
    examples: {
      eyebrow: 'See Insight in action',
      title: 'Answers that reveal',
      gradient: 'what is next.',
      items: [
        { label: 'Finance', text: '“Which departments exceeded their travel policy limits last quarter, and by how much?”' },
        { label: 'Sales', text: '“Show discounts given above the approved threshold, by region.”' },
        { label: 'Procurement', text: '“Compare supplier spend this year against the agreed contract terms.”' },
      ],
    },
    steps: {
      eyebrow: 'From numbers to understanding',
      title: 'Confidence for the',
      gradient: 'decisions that count.',
      items: [
        { label: '01 / COMBINE', title: 'Bring sources together', text: 'Pool enterprise data into one unified store.' },
        { label: '02 / ASK', title: 'Query data and policy at once', text: 'One question covers transactions and limits.' },
        { label: '03 / EXPLAIN', title: 'See how it was answered', text: 'Charts, tables, SQL, and structured reasoning.' },
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
      eyebrow: '03 / Autonomous safeguard',
      title: 'Monitor changes',
      gradientLines: ['before they become incidents.'],
      text: 'EntAura Watch continuously monitors your operations against the limits and policies you set, and notifies the right people before a critical incident occurs.',
    },
    detail: {
      eyebrow: 'Proactive action and anomaly alerts',
      title: 'Decide what to watch, when, and how.',
      paragraphs: [
        'Monitor anything from financial ledgers, procurement policies, and sales quotas to sensor telemetry and HR attendance. Run checks on real-time events, at scheduled intervals, or when a threshold is crossed.',
        'Custom logic combines transactional data with policy limits using aggregations and agentic workflows, which cuts down false positives.',
      ],
      diagram: 'connector',
    },
    examples: {
      eyebrow: 'See Watch in action',
      title: 'Signals worth',
      gradient: 'paying attention to.',
      items: [
        { label: 'Finance', text: '“Alert the finance team when overdue invoices exceed the agreed threshold.”' },
        { label: 'Operations', text: '“Notify the supervisor when a sensor reading stays outside its safe range for 10 minutes.”' },
        { label: 'HR', text: '“Send a weekly summary when attendance falls below policy in any department.”' },
      ],
    },
    steps: {
      eyebrow: 'What, when, and how',
      title: 'Turn change into',
      gradient: 'the next right action.',
      items: [
        { label: '01 / TARGET', title: 'Choose what to watch', text: 'Ledgers, policies, quotas, sensors, or attendance.' },
        { label: '02 / TRIGGER', title: 'Decide when to check', text: 'Real-time events, schedules, or thresholds.' },
        { label: '03 / LOGIC', title: 'Define how it is judged', text: 'Custom aggregations and agentic workflows.' },
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

export const knowledgeNodes = ['▤ Policy documents', '◈ ERP records', '▦ Enterprise tools']

export const analyticsKpis = [
  { label: 'Revenue', value: '↑ 18.4%' },
  { label: 'Margin', value: '↗ 6.2%' },
]

export const analyticsMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
