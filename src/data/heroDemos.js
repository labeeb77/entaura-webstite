// Hero demo for each product. Answers are illustrative sample data for the
// fictional TEXOL company. In answer text, **bold** marks a value and
// ==highlight== marks the key result.

export const heroWords = ['Policies', 'Documents', 'Transactional Data']

export const heroDemos = {
  ask: {
    tag: 'Knowledge',
    questions: [
      {
        q: 'What is the refund request period?',
        answer: 'Customers can request a refund within ==30 days== of the invoice date. Requests after that need **manager approval**, and refunds go back to the **original payment method** [1].',
        facts: [
          { value: '30 days', label: 'Refund window' },
          { value: 'Manager', label: 'Approves late requests' },
          { value: 'Original', label: 'Payment method refunded' },
        ],
        sources: ['[1] Refund_Policy_2026.pdf · §2.1', '[2] Billing_FAQ.docx'],
        followups: ['How do I submit a refund request?', 'Who approves late refunds?'],
      },
      {
        q: 'How many annual leave days do full-time employees receive?',
        answer: 'Full-time employees receive ==30 calendar days== of paid annual leave a year, accrued at **2.5 days per month** [1]. Up to **10 unused days** can be carried into the next year [1].',
        facts: [
          { value: '30 days', label: 'Paid leave a year' },
          { value: '2.5 days', label: 'Accrued each month' },
          { value: '10 days', label: 'Max carry-over' },
        ],
        sources: ['[1] HR_Leave_Policy_v4.pdf · §3'],
        followups: ['Can unused leave be paid out?'],
      },
      {
        q: 'What is the price of TEXOL Growth per user per month?',
        answer: 'TEXOL Growth costs ==$24 per user per month== on annual billing, or **$28** on monthly billing [1]. Teams over **50 seats** qualify for volume pricing [1].',
        facts: [
          { value: '$24', label: 'Per user, billed yearly' },
          { value: '$28', label: 'Per user, billed monthly' },
          { value: '50+', label: 'Seats for volume pricing' },
        ],
        sources: ['[1] Pricing_2026.pdf · Growth plan'],
        followups: ['What are the differences between TEXOL Start, Growth, and Enterprise?'],
      },
    ],
  },
  insight: {
    tag: 'Smart & Trusted Analytics',
    questions: [
      {
        q: 'Which product had the highest revenue in March 2026?',
        answer: '==TEXOL Enterprise== led March 2026 with **SAR 1.84M** in revenue, **38%** of the month\'s total and **+12%** on February.',
        kpis: [
          { value: 'SAR 1.84M', label: 'Top product revenue' },
          { value: '38%', label: 'Share of March' },
          { value: '+12%', label: 'vs. February', up: true },
        ],
        chart: {
          title: 'Revenue by product',
          subtitle: 'March 2026 vs. February 2026 · SAR',
          series: ['March 2026', 'February 2026'],
          rows: [
            { label: 'TEXOL Enterprise', values: [1840000, 1643000] },
            { label: 'TEXOL Growth', values: [1320000, 1280000] },
            { label: 'Services', values: [650000, 700000] },
            { label: 'TEXOL Start', values: [610000, 590000] },
            { label: 'Add-ons', values: [420000, 380000] },
          ],
          meta: '1 query · 5 ms',
          sql: "SELECT product, SUM(amount) AS revenue\nFROM sales_invoices\nWHERE invoice_date BETWEEN '2026-02-01' AND '2026-03-31'\nGROUP BY product, DATE_TRUNC('month', invoice_date)\nORDER BY revenue DESC;",
        },
      },
      {
        q: 'What was the total Europe revenue in April 2026?',
        answer: 'Europe brought in ==SAR 2.96M== in April 2026, up **8.4%** on March. **Germany** contributed the most at **SAR 1.02M**.',
        kpis: [
          { value: 'SAR 2.96M', label: 'Europe, April' },
          { value: '+8.4%', label: 'vs. March', up: true },
          { value: 'Germany', label: 'Largest market' },
        ],
        chart: {
          title: 'Europe revenue by country',
          subtitle: 'April 2026 vs. March 2026 · SAR',
          series: ['April 2026', 'March 2026'],
          rows: [
            { label: 'Germany', values: [1020000, 940000] },
            { label: 'United Kingdom', values: [780000, 730000] },
            { label: 'France', values: [640000, 600000] },
            { label: 'Netherlands', values: [310000, 290000] },
            { label: 'Spain', values: [210000, 170000] },
          ],
          meta: '1 query · 7 ms',
          sql: "SELECT country, SUM(amount) AS revenue\nFROM sales_invoices\nWHERE region = 'Europe'\n  AND invoice_date BETWEEN '2026-03-01' AND '2026-04-30'\nGROUP BY country, DATE_TRUNC('month', invoice_date);",
        },
      },
    ],
  },
  watch: {
    tag: 'Autonomous Monitoring and Alerts',
    questions: [
      {
        q: 'Which products are running low on stock?',
        answer: 'Stock is low for ==2 products== at the Riyadh warehouse.',
        items: [
          { name: 'Qamh Flour 5kg', value: '42 units left', note: 'Minimum 100', level: 0.42, ring: '42%' },
          { name: 'Nadeef Detergent 3L', value: '65 units left', note: 'Minimum 120', level: 0.54, ring: '54%' },
        ],
        // Units on hand over the last six days, then the projection at the current sales rate.
        trend: {
          title: 'Qamh Flour 5kg · units on hand',
          history: [176, 151, 124, 98, 71, 42],
          projected: [42, 31, 21, 10, 0],
          minimum: 100,
          caption: 'At the current sales rate, both run out in about **4 days**.',
        },
        notify: 'Notify me when stock falls below the minimum',
      },
      {
        q: 'Which invoice is overdue?',
        answer: '==1 invoice== is overdue: **INV-2041** for Al Noor Trading.',
        items: [
          { name: 'INV-2041 · Al Noor Trading', value: 'SAR 48,200', note: '18 days overdue', level: 0.6, ring: '48d' },
        ],
        timeline: {
          title: 'INV-2041 · payment timeline',
          steps: [
            { label: 'Issued', date: '12 Mar', day: 0 },
            { label: 'Due', date: '11 Apr', day: 30 },
            { label: 'Today', date: '29 Apr', day: 48 },
          ],
          caption: 'It is past the **30-day credit term** in the Credit Policy §3.',
        },
        notify: 'Notify finance when overdue invoices exceed the threshold',
      },
    ],
  },
}

export const notifyChannels = [
  { key: 'whatsapp', name: 'WhatsApp' },
  { key: 'telegram', name: 'Telegram' },
]
