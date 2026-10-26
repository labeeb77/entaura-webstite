// Head content per page. Only the keys a page defines are present in <head>.
export const pageMeta = {
  home: {
    file: 'index.html',
    themeColor: '#ffffff',
    description: 'entaura.ai connects enterprise policies, documents, and transactional data in one intelligent layer, with Ask, Insight, and Watch.',
    ogTitle: 'entaura.ai | Enterprise Agentic AI Platform',
    ogDescription: 'Verify facts, analyse data against policy, and monitor operations with Ask, Insight, and Watch.',
    ogType: 'website',
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
    description: 'entaura watch turns any Ask or Insight answer into a WhatsApp or Telegram alert: on a schedule, when the answer changes, or when a limit is crossed.',
    ogTitle: 'entaura watch | Get told when it matters',
    canonical: 'https://entaura.ai/watch.html',
    title: 'entaura watch | Get told when it matters',
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
  privacy: {
    file: 'privacy.html',
    themeColor: '#ffffff',
    description: 'How entaura.ai collects, uses and protects information on this website and in the platform.',
    ogTitle: 'Privacy policy | entaura.ai',
    canonical: 'https://entaura.ai/privacy.html',
    title: 'Privacy policy | entaura.ai',
  },
  terms: {
    file: 'terms.html',
    themeColor: '#ffffff',
    description: 'The terms for using the entaura.ai website and live demo.',
    ogTitle: 'Terms of use | entaura.ai',
    canonical: 'https://entaura.ai/terms.html',
    title: 'Terms of use | entaura.ai',
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

// Every page shares the same absolute share image, so link previews always find it.
const shareImage = 'https://entaura.ai/assets/entaura-mark.png'
for (const meta of Object.values(pageMeta)) meta.ogImage ??= shareImage

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
