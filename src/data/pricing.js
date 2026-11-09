// Pricing page content, in US dollars. Prices are SAMPLE figures until
// management confirms them; yearly prices are the monthly ones less 15%.
export const plans = [
  {
    key: 'basic',
    name: 'Basic',
    products: ['ask'],
    text: 'Verify any fact against your own policies and documents, with the proof attached.',
    price: { monthly: 129, yearly: 110 },
    cta: { label: 'Start a free pilot', to: '/contact.html?interest=pilot' },
    lead: 'Includes:',
    features: [
      'entaura ask: questions in plain language',
      'Every answer cited to the exact clause, page or cell',
      'Upload PDF, Word, PowerPoint and Excel',
      'Connect Google Drive, Google Docs and Gmail',
      'Clarifying questions instead of guesses',
      '1 knowledge base, up to 5 members',
    ],
  },
  {
    key: 'standard',
    name: 'Standard',
    badge: 'Most popular',
    products: ['ask', 'insight'],
    text: 'Analyse live ERP data against your policy limits, with charts, tables and SQL.',
    price: { monthly: 349, yearly: 297 },
    cta: { label: 'Start a free pilot', to: '/contact.html?interest=pilot' },
    lead: 'Everything in Basic, plus:',
    features: [
      'entaura insight: analytics you can check',
      'ERP connectors: SAP, Oracle, MS SQL Server, PostgreSQL, MySQL, MongoDB and more',
      'Automated charts, tables and the SQL behind every figure',
      'Budgets and targets compared with actuals',
      'Industry templates for distribution, parts, food and HR',
      'Up to 6 knowledge bases and 10 members',
    ],
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    products: ['ask', 'insight', 'watch'],
    text: 'All three products, customised to your business, systems and policies.',
    price: null,
    cta: { label: 'Request a demo', to: '/demo.html', arrow: true },
    lead: 'Everything in Basic and Standard, plus:',
    features: [
      'entaura watch: alerts on WhatsApp, Telegram or email, on a schedule or when a limit is crossed',
      'Custom data model, metrics and business rules built with our team',
      'Custom connectors, including Vanforces, Taskforces, Zoho and your in-house systems',
      'Private AI models: vLLM, Ollama or any OpenAI-compatible server',
      'Embed in your own apps through the API and chart widget',
      'Unlimited knowledge bases, members and group companies',
      'Dedicated onboarding and priority support',
    ],
  },
]

// [feature, Basic, Standard, Enterprise]; null shows a dash.
export const comparison = [
  ['entaura ask (knowledge)', 'Yes', 'Yes', 'Yes'],
  ['entaura insight (analytics)', null, 'Yes', 'Yes'],
  ['entaura watch (alerts)', null, null, 'Yes'],
  ['Customised to your business', null, null, 'Yes'],
  ['Documents, Google Drive and Gmail', 'Yes', 'Yes', 'Yes'],
  ['ERP database connectors', null, 'Yes', 'Yes + custom'],
  ['Charts, tables and SQL', null, 'Yes', 'Yes'],
  ['WhatsApp, Telegram and email alerts', null, null, 'Yes'],
  ['Industry templates', null, 'All', 'All + custom'],
  ['Private AI models', null, null, 'Yes'],
  ['API and embedding', null, null, 'Yes'],
  ['Knowledge bases', '1', '6', 'Unlimited'],
  ['Members', '5', '10', 'Unlimited'],
  ['Support', 'Email', 'Email + chat', 'Priority, named contact'],
]

export const safety = [
  'Read-only, never writes back',
  'A separate database for each company',
  'Passwords and AI keys encrypted',
  'Every query logged with who asked',
]

export const pricingFaq = [
  {
    q: 'Is AI usage included in the price?',
    a: 'No. You connect your own OpenAI, Anthropic or private AI model, and that provider bills you directly for usage. Your data, your provider, no lock-in. Setup, training and support are included in every plan.',
  },
  {
    q: 'Can we start on Basic and upgrade later?',
    a: 'Yes. Move up to Standard or Enterprise at any time and keep your knowledge bases, members and history. There is no long contract to start.',
  },
  {
    q: 'Who counts as a member?',
    a: 'A member is anyone who signs in to ask questions or build reports. We confirm during the pilot how people who only receive Watch alerts are counted.',
  },
  {
    q: 'Can we try it before we buy?',
    a: 'Yes. Every plan starts with a free pilot on your own data: one business area, a few documents and, for Insight, read-only access to your ERP. You only pay once you have seen it work.',
  },
  {
    q: 'What if it doesn’t work for us?',
    a: 'If it doesn’t save your team time, you owe nothing and we delete your data.',
  },
  {
    q: 'Where is our data hosted?',
    a: 'In our managed cloud in Saudi Arabia, the UAE or India, in a workspace isolated for your company, or inside your own infrastructure if you prefer. Your data stays yours, and we delete it when you ask or when you leave. entaura is designed for Saudi PDPL, UAE PDPL and India DPDP.',
  },
  {
    q: 'How long does setup take?',
    a: 'Typical go-live is 4 to 6 weeks from the first call. Our team connects your sources, sets up your metrics and trains your users; you give read-only access and someone who knows the business.',
  },
]
