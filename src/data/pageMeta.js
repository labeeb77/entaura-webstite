// Head content per page. Only the keys a page defines are present in <head>.
export const pageMeta = {
  home: {
    file: 'index.html',
    themeColor: '#ffffff',
    description: 'entaura.ai connects enterprise policies, documents, and transactional data in one intelligent layer, with Ask, Insight, and Watch.',
    ogTitle: 'entaura.ai | Enterprise agentic AI platform',
    ogDescription: 'Verify facts, analyse data against policy, and monitor operations with Ask, Insight, and Watch.',
    ogType: 'website',
    ogImage: 'assets/entaura-mark.png',
    canonical: 'https://entaura.ai/',
    title: 'entaura.ai | Enterprise agentic AI platform',
  },
  ask: {
    file: 'ask.html',
    description: 'entaura ask searches ERP records and policy documents together and returns the exact entry or clause behind every answer.',
    ogTitle: 'entaura ask | Answers you can verify',
    canonical: 'https://entaura.ai/ask.html',
    title: 'entaura ask | Answers you can verify',
  },
  watch: {
    file: 'watch.html',
    description: 'entaura watch monitors limits, sensor data, and compliance continuously and alerts teams before incidents occur.',
    ogTitle: 'entaura watch | Monitor changes before incidents',
    canonical: 'https://entaura.ai/watch.html',
    title: 'entaura watch | Monitor changes before incidents',
  },
  insight: {
    file: 'insight.html',
    description: 'entaura insight combines transactional data with policy limits in one query and shows the charts, SQL, and reasoning.',
    ogTitle: 'entaura insight | Data and policy, analysed together',
    canonical: 'https://entaura.ai/insight.html',
    title: 'entaura insight | Data and policy, analysed together',
  },
  solutions: {
    file: 'solutions.html',
    description: 'See how entaura.ai helps organizations connect policies, documents, and transactional data to decide better, stay compliant, and manage proactively.',
    ogTitle: 'entaura.ai Solutions | Better decisions, compliance, and foresight',
    ogDescription: 'Connect policies, documents, and transactional data across your organization.',
    canonical: 'https://entaura.ai/solutions.html',
    title: 'entaura.ai Solutions | Better decisions, compliance, and foresight',
  },
  try: {
    file: 'try.html',
    description: 'Try entaura ask for free: ask questions about sample policies, pricing, revenue, and invoices and see answers with their sources.',
    ogTitle: 'Try entaura ask for free',
    ogDescription: 'Ask a live entaura.ai demo about policies, pricing, revenue, and invoices.',
    canonical: 'https://entaura.ai/try.html',
    title: 'Try entaura ask | Free live demo',
  },
  contact: {
    file: 'contact.html',
    themeColor: '#ffffff',
    description: 'Contact entaura.ai to discuss business knowledge, monitoring, analytics, and connected workflows.',
    ogTitle: 'Contact entaura.ai | Talk to our team',
    ogDescription: 'Tell us what your team needs to know, monitor, or understand.',
    canonical: 'https://entaura.ai/contact.html',
    title: 'Contact entaura.ai | Talk to our team',
  },
}

// [meta key, tag, identifying attribute, identifying value, value attribute]
export const metaTags = [
  ['themeColor', 'meta', 'name', 'theme-color', 'content'],
  ['description', 'meta', 'name', 'description', 'content'],
  ['ogTitle', 'meta', 'property', 'og:title', 'content'],
  ['ogDescription', 'meta', 'property', 'og:description', 'content'],
  ['ogType', 'meta', 'property', 'og:type', 'content'],
  ['ogImage', 'meta', 'property', 'og:image', 'content'],
  ['canonical', 'link', 'rel', 'canonical', 'href'],
]
