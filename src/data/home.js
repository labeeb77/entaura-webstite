export const askRecord = [
  [
    "Document",
    "Credit Policy v2"
  ],
  [
    "Section",
    "4.1 · Customer credit limits"
  ],
  [
    "Page",
    "4"
  ],
  [
    "Approval",
    "Finance Manager"
  ]
]

export const flow = {
  "steps": [
    "Connect",
    "Understand",
    "Act",
    "Deliver"
  ],
  "scenarios": [
    {
      "product": "ask",
      "name": "Ask",
      "sourcesLabel": "Your sources",
      "sources": [
        {
          "name": "Policies and handbooks",
          "active": true
        },
        {
          "name": "Google Drive and Gmail",
          "active": true
        },
        {
          "name": "Uploaded documents",
          "active": true
        }
      ],
      "core": [
        "Search policies, handbooks and product documents",
        "Ask follow-up questions in the same conversation",
        "Access the knowledge your role allows"
      ],
      "result": {
        "text": "Refund window is 30 days [1]",
        "meta": "Refund_Policy_2026.pdf · §2.1"
      },
      "deliver": [
        {
          "name": "entaura app",
          "src": "/assets/entaura-mark-sm.png",
          "active": true
        },
        {
          "name": "Your apps (API)",
          "icon": "layers",
          "active": false
        }
      ],
      "message": "Answer with source references",
      "captions": [
        "Connect approved documents.",
        "Ask in everyday language.",
        "Read an answer with references.",
        "Continue with a follow-up."
      ]
    },
    {
      "product": "insight",
      "name": "Insight",
      "sourcesLabel": "Your sources",
      "sources": [
        {
          "name": "Connected business data",
          "active": true
        },
        {
          "name": "Reports and spreadsheets",
          "active": true
        }
      ],
      "core": [
        "Compare periods, products and branches",
        "Trace answers to supporting sources",
        "Bring approved sources together for multi-step analysis"
      ],
      "result": {
        "text": "Nuvora Enterprise led March: SAR 1.84M",
        "meta": "Illustrative business comparison"
      },
      "deliver": [
        {
          "name": "entaura app",
          "src": "/assets/entaura-mark-sm.png",
          "active": true
        },
        {
          "name": "Your apps (API)",
          "icon": "layers",
          "active": false
        }
      ],
      "message": "Explanation, table or chart",
      "captions": [
        "Connect approved business data.",
        "Compare the information you need.",
        "Review the result and sources.",
        "Use the answer in your work."
      ]
    },
    {
      "product": "watch",
      "name": "Watch",
      "sourcesLabel": "Starts from",
      "sources": [
        {
          "name": "Approved business information",
          "active": true
        }
      ],
      "core": [
        "Monitor agreed business measures",
        "Configure timing, conditions and recipients",
        "Deliver through WhatsApp Business, Telegram or email"
      ],
      "result": {
        "text": "7 invoices overdue · SAR 214,600",
        "meta": "Daily at 09:00"
      },
      "deliver": [
        {
          "name": "WhatsApp",
          "channel": "whatsapp",
          "active": true
        },
        {
          "name": "Telegram",
          "channel": "telegram",
          "active": false
        }
      ],
      "message": "Scheduled update",
      "captions": [
        "Choose agreed information.",
        "Configure conditions and timing.",
        "Identify exceptions.",
        "Notify responsible recipients."
      ]
    }
  ]
}

export const logos = [
  { file: 'sap.svg', name: 'SAP' },
  { file: 'oracle.png', name: 'Oracle' },
  { file: 'azure.png', name: 'Azure' },
  { file: 'aws.png', name: 'AWS' },
  { file: 'postgresql.svg', name: 'PostgreSQL' },
  { file: 'mysql.svg', name: 'MySQL' },
  { file: 'mssqlserver.png', name: 'MS SQL Server' },
  { file: 'mongodb.svg', name: 'MongoDB' },
  { file: 'zoho.png', name: 'Zoho' },
  { file: 'googledrive.svg', name: 'Google Drive' },
  { file: 'googledocs.svg', name: 'Google Docs' },
  { file: 'outlook.png', name: 'Outlook' },
  { file: 'gmail.svg', name: 'Gmail' },
  { file: 'teams.png', name: 'Teams' },
  { file: 'slack.png', name: 'Slack' },
  { file: 'whatsapp.png', name: 'WhatsApp' },
  { file: 'basecamp.png', name: 'Basecamp' },
  { file: 'vanforces.png', name: 'Vanforces' },
  { file: 'taskforces.svg', name: 'Taskforces' },
  { file: 'speakorder.png', name: 'Speak Order' },
  { file: 'whatasol.png', name: 'Whatasol' },
]

export const quarterTable = [
  {
    "quarter": "Q4 2025",
    "profit": 8.03,
    "margin": "33.5%",
    "cost": 15.95,
    "tax": 3.59
  },
  {
    "quarter": "Q1 2026",
    "profit": 9.44,
    "margin": "33.5%",
    "cost": 18.75,
    "tax": 4.22
  },
  {
    "quarter": "Q2 2026",
    "profit": 8.84,
    "margin": "33.6%",
    "cost": 17.49,
    "tax": 3.94
  },
  {
    "quarter": "Q3 2026",
    "profit": 9.78,
    "margin": "33.5%",
    "cost": 19.46,
    "tax": 4.38
  }
]

export const showcase = [
  {
    "key": "ask",
    "name": "Ask",
    "tag": "Knowledge",
    "title": "Find answers in your documents.",
    "text": "Ask questions across approved enterprise documents and check the sources behind each answer.",
    "points": [
      "Search policies, handbooks and product documents",
      "Ask follow-up questions in the same conversation",
      "Access the knowledge your role allows"
    ],
    "question": "Show the policy for customer credit limits.",
    "to": "/ask.html"
  },
  {
    "key": "insight",
    "name": "Insight",
    "tag": "Smart & Trusted Analytics",
    "title": "Understand business performance.",
    "text": "Explore connected business information through explanations, comparisons, tables and charts.",
    "points": [
      "Compare periods, products and branches",
      "Trace answers to supporting sources",
      "Bring approved sources together for multi-step analysis"
    ],
    "question": "Give me profit, margin, cost and tax by quarter.",
    "to": "/insight.html"
  },
  {
    "key": "watch",
    "name": "Watch",
    "tag": "Alerts from your answers",
    "title": "Catch changes that need attention.",
    "text": "Receive scheduled summaries, reminders and exception alerts through connected communication channels.",
    "points": [
      "Monitor agreed business measures",
      "Configure timing, conditions and recipients",
      "Deliver through WhatsApp Business, Telegram or email"
    ],
    "question": "Notify me when a distributor reaches 80% of the target required to qualify for the scheme.",
    "to": "/watch.html"
  }
]

export const trustPoints = [
  {
    "icon": "document",
    "title": "Check the source",
    "text": "Review the supporting document, page or record behind an answer."
  },
  {
    "icon": "people",
    "title": "Control access",
    "text": "Administrators control access to knowledge, documents and capabilities."
  },
  {
    "icon": "server",
    "title": "Choose private deployment",
    "text": "Deploy on client-controlled infrastructure to keep information in your preferred environment."
  }
]

export const useCases = [
  {
    "product": "ask",
    "questions": [
      {
        "q": "What is our credit limit policy for new retailers?",
        "before": "email finance and wait",
        "now": "the answer with a source reference"
      },
      {
        "q": "How many leave days can employees carry over to next year?",
        "before": "HR answers it every month",
        "now": "staff check it themselves"
      }
    ]
  },
  {
    "product": "insight",
    "questions": [
      {
        "q": "Which vans are underperforming today?",
        "before": "spotted in next week’s report",
        "now": "fix today’s route today"
      },
      {
        "q": "Which promotions paid for their discount?",
        "before": "guesswork after the campaign",
        "now": "stop the ones losing money"
      }
    ]
  },
  {
    "product": "watch",
    "questions": [
      {
        "q": "Which invoice is overdue?",
        "before": "found at month-end",
        "now": "a configured overdue alert"
      },
      {
        "q": "Which products are running low on stock?",
        "before": "noticed when the shelf is empty",
        "now": "reorder before the lost sale"
      }
    ]
  }
]

export const vision = [
  {
    "label": "Connect",
    "title": "Bring approved documents together.",
    "text": "Access knowledge from uploaded files, cloud storage and email."
  },
  {
    "label": "Ask",
    "title": "Find what you need in plain language.",
    "text": "Search policies, procedures and business documents with a question."
  },
  {
    "label": "Understand",
    "title": "Move forward with the source in view.",
    "text": "Read the answer, check its references and ask follow-up questions."
  }
]

export const watchAlerts = [
  {
    "channel": "whatsapp",
    "meta": "entaura watch · Sales · 09:12",
    "title": "Al Faisal Distribution reached 80% of the scheme target",
    "text": "SAR 412,000 of SAR 515,000 · 9 days left to qualify."
  },
  {
    "channel": "telegram",
    "meta": "entaura watch · Finance · 14:40",
    "title": "High-value credit sale held longer than usual",
    "text": "SO-7781 · SAR 186,000 · held 3 days (usual: under 1 day)."
  }
]

export const watchRecipe = [
  {
    "step": "Monitor",
    "items": [
      "Approved business information",
      "Agreed business measures"
    ],
    "active": 1
  },
  {
    "step": "When to tell me",
    "items": [
      "On a schedule",
      "When a condition is met",
      "When an activity is due"
    ],
    "active": 2
  },
  {
    "step": "Where",
    "items": [
      "WhatsApp",
      "Telegram"
    ],
    "active": 0
  }
]

// "Partner with us" section on the home page. Kept to what a partner actually
// does with entaura.ai; no commission figures or partner logos until agreed.
export const partnerTypes = [
  {
    "key": "referral",
    "tone": "ask",
    "icon": "link",
    "label": "Referral & resale",
    "title": "Bring entaura.ai to your clients.",
    "for": "Consultancies, resellers and advisors",
    "text": "Introduce Ask, Insight and Watch to the businesses you already serve and grow a recurring line of revenue.",
    "points": ["Registered opportunities", "Joint demos and pilots", "Recurring revenue on every account"]
  },
  {
    "key": "implementation",
    "tone": "insight",
    "icon": "workshop",
    "label": "Implementation",
    "title": "Deliver AI projects with us.",
    "for": "System integrators and ERP partners",
    "text": "Connect client systems, set up approved knowledge and roll out answers, dashboards and alerts that teams use every day.",
    "points": ["Hands-on technical training", "Deployment playbooks", "Direct line to our engineers"]
  },
  {
    "key": "technology",
    "tone": "watch",
    "icon": "plug",
    "label": "Technology",
    "title": "Integrate your platform.",
    "for": "Software, data and messaging platforms",
    "text": "Make your product a source or a channel for entaura.ai, so shared customers get answers from the data they keep with you.",
    "points": ["Connector and API support", "Joint solution listing", "Co-marketing to shared customers"]
  }
]

export const partnerBenefits = [
  { "icon": "training", "title": "Enablement", "text": "Product training, demo environments and sales material for your team." },
  { "icon": "people", "title": "Co-selling", "text": "Our team joins discovery calls, demos and pilots alongside yours." },
  { "icon": "rocket", "title": "Go-to-market", "text": "Joint campaigns, case studies and a place on our partner listing." },
  { "icon": "support", "title": "Priority support", "text": "A named partner manager and fast escalation to engineering." }
]

export const partnerSteps = [
  { "title": "Apply", "text": "Tell us about your business, your clients and where you see a fit." },
  { "title": "Get enabled", "text": "Meet your partner manager, train your team and set up a demo space." },
  { "title": "Grow together", "text": "Register opportunities, run pilots and deliver with our support." }
]
