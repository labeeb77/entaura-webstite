// Head content per page. Only the keys a page defines are present in <head>.
export const pageMeta = {
  home: {
    file: 'index.html',
    themeColor: '#ffffff',
    description: 'entaura.ai connects enterprise policies, documents, and transactional data in one intelligent layer, with Ask, Insight, and Watch.',
    ogTitle: 'entaura.ai | Enterprise Agentic AI Platform',
    ogDescription: 'Verify facts, analyse data against policy, and monitor operations with Ask, Insight, and Watch.',
    ogType: 'website',
    ogImage: 'assets/entaura-mark.png',
    canonical: 'https://entaura.ai/',
    title: 'entaura.ai | Enterprise Agentic AI Platform',
  },
  ask: {
    file: 'ask.html',
    description: 'entaura ask answers questions across your documents, spreadsheets, and live databases, with the exact source behind every claim.',
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
    description: 'entaura insight turns your ERP data into certified answers, with the right chart and the query behind every number.',
    ogTitle: 'entaura insight | Numbers you can trust',
    canonical: 'https://entaura.ai/insight.html',
    title: 'entaura insight | Numbers you can trust',
  },
  solutions: {
    file: 'solutions.html',
    description: 'See how entaura.ai helps organizations connect policies, documents, and transactional data to decide better, stay compliant, and manage proactively.',
    ogTitle: 'entaura.ai Solutions | Better decisions, compliance, and foresight',
    ogDescription: 'Connect policies, documents, and transactional data across your organization.',
    canonical: 'https://entaura.ai/solutions.html',
    title: 'entaura.ai Solutions | Better decisions, compliance, and foresight',
  },
  integration: {
    file: 'integration.html',
    description: 'How entaura.ai is implemented: a five-phase engagement, managed or customer-hosted deployment, and what your team brings.',
    ogTitle: 'Integration | entaura.ai',
    ogDescription: 'Our team scopes, onboards, and deploys entaura with yours, in your infrastructure or ours.',
    canonical: 'https://entaura.ai/integration.html',
    title: 'Integration | entaura.ai',
  },
  try: {
    file: 'try.html',
    description: 'Try Entaura: a live demo on sample data.',
    ogTitle: 'Try Entaura',
    ogDescription: 'A live entaura.ai demo on sample data.',
    canonical: 'https://entaura.ai/try.html',
    title: 'Try Entaura | Live demo',
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
