// entaura ask product page. Each section answers one question a visitor has.
// Screen recreations use sample data for the fictional TEXOL company.

export const askPage = {
  hero: {
    eyebrow: 'Knowledge',
    title: 'Ask your business anything.',
    gradientLines: ['Get answers you can verify.'],
    text: 'Ask searches your documents, spreadsheets, and live databases at once, then answers in plain language with the exact source behind every claim.',
  },

  audience: {
    eyebrow: 'Who it’s for',
    title: 'For every team that',
    gradient: 'asks the same questions twice.',
    text: 'Admins connect the sources once. Everyone else just asks, and only sees the knowledge bases their role allows.',
    items: [
      { icon: 'chart', team: 'Finance', example: '“What is our refund window for annual plans?”' },
      { icon: 'rocket', team: 'Sales', example: '“Total sales orders by distributor this month.”' },
      { icon: 'people', team: 'HR', example: '“How many leave days carry over to next year?”' },
      { icon: 'server', team: 'Operations', example: '“Which branches missed their delivery target?”' },
      { icon: 'support', team: 'Customer support', example: '“What does the warranty cover for spare parts?”' },
      { icon: 'flag', team: 'Leadership', example: '“How is the business performing this quarter?”' },
    ],
  },

  problems: {
    eyebrow: 'Why Ask',
    outcomeLabel: 'With Ask',
    title: 'Less searching,',
    gradient: 'more knowing.',
    items: [
      {
        problem: 'Answers are buried in PDFs, spreadsheets, and ERP screens.',
        outcome: 'One question returns one clear answer, in seconds.',
      },
      {
        problem: 'AI answers sound right, but nobody can check them.',
        outcome: 'Every claim links to the file, page, or database query it came from.',
      },
      {
        problem: 'Policies and numbers live in different systems.',
        outcome: 'Documents and live records are searched together, in one conversation.',
      },
    ],
  },

  steps: {
    eyebrow: 'How it works',
    title: 'Three steps',
    gradient: 'from question to proof.',
    items: [
      { screen: 'connect', title: 'Connect your sources', text: 'Upload files or connect a database, drive, or mailbox to a knowledge base. Ask indexes them in the background.' },
      { screen: 'ask', title: 'Ask in plain language', text: 'Type or speak a question in your own words and language. No query syntax, no report builder.' },
      { screen: 'answer', title: 'Get a cited answer', text: 'See how the question was understood, the answer, and the sources it used, with tables and charts when the data allows.' },
    ],
  },

  capabilities: {
    eyebrow: 'What you can do',
    title: 'Built for answers',
    gradient: 'you can act on.',
    items: [
      { icon: 'check', title: 'Cited answers', text: 'Inline [1] citations open the exact page, figure, or table, so anyone can verify the answer.' },
      { icon: 'eye', title: 'Thinking summary', text: 'A short note on what was checked and why, so you know how much to trust the result.' },
      { icon: 'database', title: 'Live data answers', text: 'Questions about sales or invoices run read-only on your database and come back as a table, chart, or CSV.' },
      { icon: 'link', title: '9 languages', text: 'English, Arabic, Hindi, Urdu, Malayalam, Tamil, Telugu, Bengali and Kannada, with right-to-left layouts and read-aloud.' },
      { icon: 'layers', title: 'Knowledge groups', text: 'Group several knowledge bases and ask across all of them in one conversation.' },
      { icon: 'people', title: 'History and sharing', text: 'Every chat is saved. Share a link to an answer, and rate answers so quality improves.' },
    ],
  },

  screens: {
    eyebrow: 'See it',
    title: 'What Ask',
    gradient: 'looks like.',
    text: 'Screens from the app, shown with sample data.',
  },

  integrations: {
    eyebrow: 'Works with your systems',
    title: 'Connects to the tools',
    gradient: 'you already use.',
    text: 'These are the most common. Entaura connects to hundreds of databases, apps, and file stores.',
    groups: [
      {
        title: 'Files',
        note: 'Upload with tags. Images and scanned PDFs are read with OCR.',
        items: [['doc', 'PDF'], ['doc', 'DOCX'], ['doc', 'PPTX'], ['doc', 'XLSX'], ['doc', 'TXT'], ['doc', 'Images']],
      },
      {
        title: 'Databases',
        note: 'Sync selected tables, or query them live with a read-only account.',
        items: [['postgresql.svg', 'PostgreSQL'], ['mysql.svg', 'MySQL'], ['mssqlserver.png', 'SQL Server'], ['mongodb.svg', 'MongoDB']],
      },
      {
        title: 'Connectors',
        note: 'Pick the folders, buckets, or labels to sync. Hundreds more are available.',
        more: '100+',
        items: [['aws.png', 'AWS S3'], ['azure.png', 'Azure Blob'], ['googledrive.svg', 'Google Drive'], ['gmail.svg', 'Gmail'], ['doc', 'GitHub'], ['doc', 'GitLab'], ['doc', 'Manual FAQ']],
      },
    ],
    models: [['openai.png', 'OpenAI'], ['anthropic.png', 'Anthropic'], ['googlegemini.svg', 'Gemini'], ['openrouter.png', 'OpenRouter']],
    setup: 'Admins connect each source once from the knowledge base. Organization API keys let your own apps ask the same questions.',
  },

  trust: {
    eyebrow: 'Security and data',
    title: 'Your data stays',
    gradient: 'yours.',
    items: [
      { icon: 'layers', title: 'Isolated per organization', text: 'Documents, chats, and settings are kept separate for each organization.' },
      { icon: 'people', title: 'Role-based access', text: 'Roles decide which knowledge bases a person can open and ask.' },
      { icon: 'key', title: 'Encrypted credentials', text: 'Database passwords and AI provider keys are stored encrypted.' },
      { icon: 'lock', title: 'Read-only queries', text: 'Every database query is validated as read-only and row-limited before it runs.' },
      { icon: 'check', title: 'No guessing', text: 'If your sources don’t hold the answer, Ask says so instead of inventing one.' },
      { icon: 'eye', title: 'Nothing sensitive exposed', text: 'Answers never show passwords, API keys, or internal prompts.' },
    ],
  },

  cta: {
    title: 'See Ask on your own documents.',
    text: 'Try the live demo, or book a walkthrough with our team.',
  },
}
