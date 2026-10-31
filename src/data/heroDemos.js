// Hero demo for each product. Answers are illustrative sample data for the
// fictional Nuvora company. In answer text, **bold** marks a value,
// ==highlight== marks the key result and [n] cites source n. Ask answers can
// also use "## " headings and "- " bullets, one per line. Each answer can list
// `followups`, which are answers in the same shape.

export const heroWords = ['policies', 'documents', 'transactional data']

// What each product stands for, shown beside the demo. Each point lights up
// when the demo reaches its stage (watch uses its flow's step number).
export const heroStory = {
  ask: {
    tagline: 'Answers from your documents, with proof.',
    points: [
      { text: 'Cites the exact clause or cell', at: 'answer' },
      { text: 'Shows its context and reasoning', at: 'extras' },
      { text: 'Follow-ups keep the thread going', at: 'followup' },
    ],
  },
  insight: {
    tagline: 'Live ERP numbers you can check.',
    points: [
      { text: 'Answers in plain words', at: 'answer' },
      { text: 'Bar, column or table in one tap', at: 'extras' },
      { text: 'The SQL behind every figure', at: 'proof' },
      { text: 'Follow-ups to keep digging', at: 'followup' },
    ],
  },
  watch: {
    tagline: 'WhatsApp or Telegram alerts that matter.',
    points: [
      { text: 'Turn any answer into a watch', at: 1 },
      { text: 'On a schedule or when a limit is hit', at: 4 },
      { text: 'Sent where your team already is', at: 5 },
    ],
  },
}

const lateRefunds = {
  q: 'Who approves late refunds?',
  steps: ['Understanding the follow-up', 'Searching the refund policy', 'Found Refund_Policy_2026.pdf · §2.3'],
  answer: '## Who approves\nRefunds requested after 30 days are approved by the ==Finance Manager== [1].\n## How it works\n- The request goes to the manager with the **original invoice** attached [1].\n- Amounts above **SAR 10,000** also need the **CFO**’s sign-off [1].\n- Rejected requests get a written reason within **3 working days** [2].',
  context: [
    { doc: 'Refund_Policy_2026.pdf · §2.3', text: 'Requests received after the refund window are escalated to the Finance Manager. Refunds above SAR 10,000 require CFO approval.' },
    { doc: 'Billing_FAQ.docx · Refunds', text: 'If a refund is declined, the customer receives the reason in writing within three working days.' },
  ],
  search: { chunks: 4, rows: 0 },
  thinking: 'This follows the refund question, so I stayed with the refund documents. §2.3 of the policy names the approvers and the SAR 10,000 limit; the billing FAQ gives the reply time for rejections.',
  sources: [{ name: 'Refund_Policy_2026.pdf', section: '§2.3' }, { name: 'Billing_FAQ.docx', section: 'Refunds' }],
}

const leavePayout = {
  q: 'Can unused leave be paid out?',
  steps: ['Understanding the follow-up', 'Searching HR policies', 'Found HR_Leave_Policy_v4.pdf · §3.4'],
  answer: '## Paying out leave\nUnused leave is paid out only when an employee ==leaves the company== [1].\n- Payment is based on the **basic salary** at the leaving date [1].\n- Days above the **10-day carry-over** that are not used by **31 March** are lost [2].',
  context: [
    { doc: 'HR_Leave_Policy_v4.pdf · §3.4', text: 'Accrued, unused annual leave is paid on separation, calculated on basic salary.' },
    { doc: 'Employee_Handbook_2026.pdf · §5.2', text: 'Carried-over leave not taken by 31 March is forfeited.' },
  ],
  search: { chunks: 5, rows: 0 },
  thinking: 'The question is about paying out leave, so I looked for separation and carry-over rules. The leave policy covers payment on leaving; the handbook adds the 31 March deadline.',
  sources: [{ name: 'HR_Leave_Policy_v4.pdf', section: '§3.4' }, { name: 'Employee_Handbook_2026.pdf', section: '§5.2' }],
}

const regionSplit = {
  q: 'Which region drove March for Nuvora Enterprise?',
  steps: ['Reading sales_invoices', 'Filtering to Nuvora Enterprise', 'Grouped 5 regions, Feb – Mar 2026'],
  answer: '==Saudi Arabia== brought in **SAR 820K** of Nuvora Enterprise’s March revenue, **45%** of it. The **UAE** grew fastest, up **21.1%** on February.',
  chart: {
    view: 'Table',
    series: ['March 2026', 'February 2026'],
    rows: [
      { label: 'Saudi Arabia', values: [820000, 760000] },
      { label: 'UAE', values: [460000, 380000] },
      { label: 'Europe', values: [330000, 310000] },
      { label: 'India', values: [150000, 125000] },
      { label: 'Rest of GCC', values: [80000, 68000] },
    ],
    meta: '1 query · 11 ms',
    source: { system: 'ERP', table: 'sales_invoices', rows: '1,286 rows read', period: 'Feb – Mar 2026' },
    kpis: [
      { label: 'Saudi Arabia · March', value: 820000, delta: 7.9 },
      { label: 'Fastest growth', text: 'UAE', delta: 21.1 },
      { label: 'Share of March', text: '45%' },
    ],
    callout: 'Saudi Arabia · 45% of March',
    result: '5 regions · table',
    sql: "SELECT region, SUM(amount) AS revenue\nFROM sales_invoices\nWHERE product = 'Nuvora Enterprise'\n  AND invoice_date BETWEEN '2026-02-01' AND '2026-03-31'\nGROUP BY region, DATE_TRUNC('month', invoice_date)\nORDER BY revenue DESC;",
  },
}

const enterpriseTrend = {
  q: 'How has Nuvora Enterprise trended over the last 6 months?',
  steps: ['Reading sales_invoices', 'Filtering to Nuvora Enterprise', 'Grouped by month, Oct – Mar'],
  answer: 'Nuvora Enterprise has grown for ==6 months in a row==, from **SAR 1.21M** in October to **SAR 1.84M** in March, **+52%**. Every month is also ahead of the same month last year.',
  chart: {
    view: 'Column',
    series: ['2025–26', '2024–25'],
    rows: [
      { label: 'Oct', values: [1210000, 1050000] },
      { label: 'Nov', values: [1290000, 1100000] },
      { label: 'Dec', values: [1420000, 1230000] },
      { label: 'Jan', values: [1500000, 1180000] },
      { label: 'Feb', values: [1643000, 1260000] },
      { label: 'Mar', values: [1840000, 1390000] },
    ],
    meta: '1 query · 9 ms',
    source: { system: 'ERP', table: 'sales_invoices', rows: '2,140 rows read', period: 'Oct 2024 – Mar 2026' },
    kpis: [
      { label: 'March 2026', value: 1840000, delta: 12.0 },
      { label: '6-month growth', text: '+52%' },
      { label: 'Vs. last year', text: 'Ahead', delta: 32.4 },
    ],
    callout: '6 months of growth',
    result: '6 months · column chart',
    sql: "SELECT DATE_TRUNC('month', invoice_date) AS month,\n  SUM(amount) AS revenue\nFROM sales_invoices\nWHERE product = 'Nuvora Enterprise'\n  AND invoice_date >= '2024-10-01'\nGROUP BY month\nORDER BY month;",
  },
  followups: [regionSplit],
}

const fastestCountry = {
  q: 'Which country grew fastest?',
  steps: ['Reading sales_invoices', 'Comparing April with March', 'Ranked 5 countries by growth'],
  answer: '==Spain== grew fastest, up **23.5%** to **SAR 210K** in April. **Germany** is still the biggest market at **SAR 1.02M**.',
  chart: {
    view: 'Column',
    series: ['April 2026', 'March 2026'],
    rows: [
      { label: 'Spain', values: [210000, 170000] },
      { label: 'Germany', values: [1020000, 940000] },
      { label: 'Netherlands', values: [310000, 290000] },
      { label: 'United Kingdom', values: [780000, 730000] },
      { label: 'France', values: [640000, 600000] },
    ],
    meta: '1 query · 6 ms',
    source: { system: 'ERP', table: 'sales_invoices', rows: '3,106 rows read', period: 'Mar – Apr 2026' },
    kpis: [
      { label: 'Spain · April 2026', value: 210000, delta: 23.5 },
      { label: 'Biggest market', text: 'Germany', delta: 8.5 },
      { label: 'Countries growing', text: '5 of 5' },
    ],
    callout: 'Spain · +23.5%',
    result: '5 countries · column chart',
    sql: "SELECT country, SUM(amount) AS revenue\nFROM sales_invoices\nWHERE region = 'Europe'\n  AND invoice_date BETWEEN '2026-03-01' AND '2026-04-30'\nGROUP BY country, DATE_TRUNC('month', invoice_date);",
  },
}

export const heroDemos = {
  ask: {
    tag: 'Knowledge',
    questions: [
      {
        q: 'What is the refund request period?',
        worth: 'No email to finance and no waiting for a reply',
        steps: ['Understanding the question', 'Searching 2 policy documents', 'Found Refund_Policy_2026.pdf · §2.1'],
        answer: '## Refund window\nCustomers can request a refund within ==30 days== of the invoice date [1].\n## After 30 days\n- Late requests need **manager approval** before finance processes them [1].\n- Approved refunds go back to the **original payment method** [1].\n- Card refunds usually appear within **5–7 working days** [2].',
        context: [
          { doc: 'Refund_Policy_2026.pdf · §2.1', text: 'Refund requests must be submitted within 30 days of the invoice date. Later requests require manager approval.' },
          { doc: 'Billing_FAQ.docx · Refunds', text: 'Refunds are returned to the original payment method. Card refunds normally appear within 5–7 working days.' },
        ],
        search: { chunks: 6, rows: 0 },
        thinking: 'The question asks about a policy period, so I searched the uploaded policy documents rather than the ERP. Refund_Policy_2026.pdf §2.1 states the 30-day window and the approval rule; Billing_FAQ.docx adds the processing time. Every sentence in the answer is backed by one of these two sources.',
        sources: [{ name: 'Refund_Policy_2026.pdf', section: '§2.1' }, { name: 'Billing_FAQ.docx', section: 'Refunds' }],
        followups: [lateRefunds],
      },
      {
        q: 'How many annual leave days do full-time employees receive?',
        worth: 'HR doesn’t have to answer this one again',
        steps: ['Understanding the question', 'Searching HR policies', 'Found HR_Leave_Policy_v4.pdf · §3'],
        answer: '## Annual leave\nFull-time employees receive ==30 calendar days== of paid annual leave a year [1].\n## How it builds up\n- Leave accrues at **2.5 days per month** of service [1].\n- Up to **10 unused days** can be carried into the next year [1].\n- Carried-over days must be used by **31 March** [2].',
        context: [
          { doc: 'HR_Leave_Policy_v4.pdf · §3', text: 'Full-time employees are entitled to 30 calendar days of paid annual leave, accrued at 2.5 days per month. A maximum of 10 days may be carried forward.' },
          { doc: 'Employee_Handbook_2026.pdf · §5.2', text: 'Carried-over leave must be taken by 31 March of the following year.' },
        ],
        search: { chunks: 6, rows: 0 },
        thinking: 'This is an HR policy question, so I searched the HR documents. The leave policy gives the entitlement, accrual and carry-over; the handbook adds the deadline for carried-over days.',
        sources: [{ name: 'HR_Leave_Policy_v4.pdf', section: '§3' }, { name: 'Employee_Handbook_2026.pdf', section: '§5.2' }],
        followups: [leavePayout],
      },
    ],
  },
  insight: {
    tag: 'Analytics',
    questions: [
      {
        q: 'Which product had the highest revenue in March 2026?',
        worth: 'Instead of a two-day report request',
        steps: ['Reading sales_invoices', 'Comparing March with February', 'Ranked 5 products by revenue'],
        answer: '==Nuvora Enterprise== led March 2026 with **SAR 1.84M** in revenue, **38%** of the month\'s total and **+12%** on February.',
        chart: {
          series: ['March 2026', 'February 2026'],
          rows: [
            { label: 'Nuvora Enterprise', values: [1840000, 1643000] },
            { label: 'Nuvora Growth', values: [1320000, 1280000] },
            { label: 'Services', values: [650000, 700000] },
            { label: 'Nuvora Start', values: [610000, 590000] },
            { label: 'Add-ons', values: [420000, 380000] },
          ],
          meta: '1 query · 29 ms',
          source: { system: 'ERP', table: 'sales_invoices', rows: '4,812 rows read', period: 'Feb – Mar 2026' },
          kpis: [
            { label: 'March 2026 revenue', value: 4840000, delta: 5.4 },
            { label: 'Top product', text: 'Nuvora Enterprise', delta: 12.0 },
            { label: 'Share of March', text: '38%' },
          ],
          callout: 'Nuvora Enterprise · 38% of March',
          result: '5 products · bar chart',
          sql: "SELECT product, SUM(amount) AS revenue\nFROM sales_invoices\nWHERE invoice_date BETWEEN '2026-02-01' AND '2026-03-31'\nGROUP BY product, DATE_TRUNC('month', invoice_date)\nORDER BY revenue DESC;",
        },
        followups: [enterpriseTrend, regionSplit],
      },
      {
        q: 'What was the total Europe revenue in April 2026?',
        worth: 'No spreadsheet exports or reconciling',
        steps: ['Reading sales_invoices', 'Filtering to Europe, March–April', 'Grouped 5 countries'],
        answer: 'Europe brought in ==SAR 2.96M== in April 2026, up **8.4%** on March. **Germany** contributed the most at **SAR 1.02M**.',
        chart: {
          series: ['April 2026', 'March 2026'],
          rows: [
            { label: 'Germany', values: [1020000, 940000] },
            { label: 'United Kingdom', values: [780000, 730000] },
            { label: 'France', values: [640000, 600000] },
            { label: 'Netherlands', values: [310000, 290000] },
            { label: 'Spain', values: [210000, 170000] },
          ],
          meta: '1 query · 7 ms',
          source: { system: 'ERP', table: 'sales_invoices', rows: '3,106 rows read', period: 'Mar – Apr 2026' },
          kpis: [
            { label: 'Europe · April 2026', value: 2960000, delta: 8.4 },
            { label: 'Top country', text: 'Germany', delta: 8.5 },
            { label: 'Fastest growth', text: 'Spain', delta: 23.5 },
          ],
          callout: 'Germany · 34% of the total',
          result: '5 countries · bar chart',
          sql: "SELECT country, SUM(amount) AS revenue\nFROM sales_invoices\nWHERE region = 'Europe'\n  AND invoice_date BETWEEN '2026-03-01' AND '2026-04-30'\nGROUP BY country, DATE_TRUNC('month', invoice_date);",
        },
        followups: [fastestCountry],
      },
    ],
  },
  watch: {
    tag: 'Alerts',
    // Each flow sets up a watch (what, when, how), then shows the alert it sends.
    flows: [
      {
        label: 'High-value orders',
        prompt: 'Notify me when a single order goes above SAR 100,000',
        what: 'Insight answer · sales orders',
        when: 'When a limit is crossed',
        how: 'Order value > SAR 100,000 · Credit Policy',
        alert: {
          title: 'A high-value order is added',
          rows: [
            { label: 'Order value', value: 'SAR 125,000' },
            { label: 'Customer', value: 'Al Noor Trading' },
            { label: 'Checked against', value: 'Credit Policy §2' },
          ],
          time: '9:41 AM',
        },
      },
      {
        label: 'Low stock',
        prompt: 'Notify me when any product drops below its minimum stock',
        what: 'Insight answer · Riyadh stock',
        when: 'When the answer changes',
        how: 'Below minimum · days left from 7-day sales',
        alert: {
          title: 'Qamh Flour 5kg is below minimum',
          rows: [
            { label: 'On hand', value: '42 units (min 100)' },
            { label: 'Runs out in', value: 'About 4 days' },
            { label: 'Warehouse', value: 'Riyadh' },
          ],
          time: '11:05 AM',
        },
      },
      {
        label: 'Overdue invoices',
        prompt: 'Notify me every morning about overdue invoices',
        what: 'Insight answer · receivables',
        when: 'Daily at 09:00',
        how: 'Past the 30-day term · Credit Policy §3',
        alert: {
          title: 'INV-2041 is overdue',
          rows: [
            { label: 'Amount', value: 'SAR 48,200' },
            { label: 'Customer', value: 'Al Noor Trading' },
            { label: 'Overdue by', value: '18 days' },
          ],
          time: '9:00 AM',
        },
      },
    ],
  },
}

export const notifyChannels = [
  { key: 'whatsapp', name: 'WhatsApp' },
  { key: 'telegram', name: 'Telegram' },
]
