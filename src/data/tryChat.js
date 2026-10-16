// Suggested questions for the /try demo. They match the sample TEXOL data set.
export const suggestionGroups = [
  {
    label: 'Product & pricing',
    questions: [
      'What are the differences between TEXOL Start, Growth, and Enterprise?',
      'What is the price of TEXOL Growth per user per month?',
      'How long is the TEXOL Start trial?',
      'Does TEXOL support Google Drive?',
    ],
  },
  {
    label: 'Support & policy',
    questions: [
      'What is the refund request period?',
      'What should I do if I cannot sign in?',
      'How many annual leave days do full-time employees receive?',
      'Compare the support commitments for Start, Growth, and Enterprise.',
    ],
  },
  {
    label: 'Finance & data',
    questions: [
      'Which product had the highest revenue in March 2026?',
      'What was the total Europe revenue in April 2026?',
      'Which invoice is overdue?',
    ],
  },
]

export const systemPrompt = 'You are entaura ask, an enterprise assistant answering from the organisation\'s own policies, documents, and transactional data. Answer concisely, lead with the direct answer, and mention the records or documents the answer comes from.'
