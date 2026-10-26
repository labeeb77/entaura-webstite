// Hero demo for each product. Answers are illustrative sample data for the
// fictional Nuvora company. In answer text, **bold** marks a value and
// ==highlight== marks the key result.

export const heroWords = ['policies', 'documents', 'transactional data']

export const heroDemos = {
  ask: {
    tag: 'Knowledge',
    questions: [
      {
        q: 'What is the refund request period?',
        worth: 'No email to finance and no waiting for a reply',
        steps: ['Understanding the question', 'Searching 2 policy documents', 'Found Refund_Policy_2026.pdf · §2.1'],
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
        worth: 'HR doesn’t have to answer this one again',
        steps: ['Understanding the question', 'Searching HR policies', 'Found HR_Leave_Policy_v4.pdf · §3'],
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
        q: 'What is the credit limit for a new retailer?',
        worth: 'Risky orders are held before dispatch',
        steps: ['Understanding the question', 'Searching credit policies', 'Found Credit_Policy_v2.pdf · §4.1'],
        answer: 'New retailers start with a credit limit of ==SAR 50,000== on **30-day terms** [1]. Orders that take a customer above **90%** of their limit need **Finance Manager approval** before dispatch [1].',
        facts: [
          { value: 'SAR 50K', label: 'Starting credit limit' },
          { value: '30 days', label: 'Payment terms' },
          { value: '90%', label: 'Approval needed above' },
        ],
        sources: ['[1] Credit_Policy_v2.pdf · §4.1'],
        followups: ['Which customers are above 90% of their limit?'],
      },
    ],
  },
  insight: {
    tag: 'Smart & Trusted Analytics',
    questions: [
      {
        q: 'Which product had the highest revenue in March 2026?',
        worth: 'Instead of a two-day report request',
        steps: ['Reading sales_invoices', 'Comparing March with February', 'Ranked 5 products by revenue'],
        answer: '==Nuvora Enterprise== led March 2026 with **SAR 1.84M** in revenue, **38%** of the month\'s total and **+12%** on February.',
        chart: {
          title: 'Revenue by product',
          subtitle: 'March 2026 vs. February 2026 · SAR',
          series: ['March 2026', 'February 2026'],
          rows: [
            { label: 'Nuvora Enterprise', values: [1840000, 1643000] },
            { label: 'Nuvora Growth', values: [1320000, 1280000] },
            { label: 'Services', values: [650000, 700000] },
            { label: 'Nuvora Start', values: [610000, 590000] },
            { label: 'Add-ons', values: [420000, 380000] },
          ],
          meta: '1 query · 5 ms',
          source: { system: 'ERP', table: 'sales_invoices', rows: '4,812 rows read', period: 'Feb – Mar 2026' },
          sql: "SELECT product, SUM(amount) AS revenue\nFROM sales_invoices\nWHERE invoice_date BETWEEN '2026-02-01' AND '2026-03-31'\nGROUP BY product, DATE_TRUNC('month', invoice_date)\nORDER BY revenue DESC;",
        },
      },
      {
        q: 'What was the total Europe revenue in April 2026?',
        worth: 'No spreadsheet exports or reconciling',
        steps: ['Reading sales_invoices', 'Filtering to Europe, March–April', 'Grouped 5 countries'],
        answer: 'Europe brought in ==SAR 2.96M== in April 2026, up **8.4%** on March. **Germany** contributed the most at **SAR 1.02M**.',
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
          source: { system: 'ERP', table: 'sales_invoices', rows: '3,106 rows read', period: 'Mar – Apr 2026' },
          sql: "SELECT country, SUM(amount) AS revenue\nFROM sales_invoices\nWHERE region = 'Europe'\n  AND invoice_date BETWEEN '2026-03-01' AND '2026-04-30'\nGROUP BY country, DATE_TRUNC('month', invoice_date);",
        },
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
