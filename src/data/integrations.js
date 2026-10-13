// Source types rather than vendor names. An item may carry `icon` (a file in
// /assets/integrations) instead of `badge` to show a logo.
export const connectorCategories = [
  {
    title: 'Transactional systems',
    items: [
      { label: 'ERP', badge: 'ERP' },
      { label: 'CRM', badge: 'CRM' },
      { label: 'Finance and accounting', badge: '$' },
      { label: 'Procurement', badge: 'PO' },
      { label: 'Sales', badge: '↗' },
      { label: 'HR and attendance', badge: 'HR' },
      { label: 'And more', badge: '＋' },
    ],
  },
  {
    title: 'Documents and policies',
    items: [
      { label: 'Policy repositories', badge: '§' },
      { label: 'Document stores', badge: '▤' },
      { label: 'Cloud storage', badge: '☁' },
      { label: 'Spreadsheets and files', badge: '▦' },
      { label: 'And more', badge: '＋' },
    ],
  },
  {
    title: 'Operational data',
    items: [
      { label: 'Databases', badge: 'DB' },
      { label: 'Data warehouses', badge: 'DW' },
      { label: 'IoT sensors', badge: '◌' },
      { label: 'Ad hoc sources', badge: '✦' },
      { label: 'And more', badge: '＋' },
    ],
  },
  {
    title: 'Alerts and collaboration',
    items: [
      { label: 'Instant messengers', badge: 'IM' },
      { label: 'Email', badge: '@' },
      { label: 'Team chat', badge: '◈' },
      { label: 'And more', badge: '＋' },
    ],
  },
]

export const policyTags = [
  'Corporate policies',
  'Purchase policy',
  'Human resource guidelines',
  'IT policy',
  'Business policy',
  'Proposals and templates',
  'Safety policy',
  'Financial governance',
  'Invoices and collections',
  'Promotion documents',
  'ERP records',
  'Alerts and checks',
]
