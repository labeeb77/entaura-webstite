// Capabilities sourced from EntAura Feature Documentation.pdf.
export const insightPage = {
  "hero": {
    "eyebrow": "Business analysis",
    "title": "Understand performance.",
    "gradientLines": [
      "Make the next decision sooner."
    ],
    "text": "Turn connected business data into clear explanations, comparisons, tables and charts. Explore sales, expenses and collections without waiting for a manually prepared report."
  },
  "audience": {
    "eyebrow": "Who it’s for",
    "title": "For the people who",
    "gradient": "wait on reports.",
    "text": "Managers set up the data once. Each person only sees the data they’ve been given.",
    "items": [
      {
        "icon": "chart",
        "team": "Finance",
        "example": "“Revenue by branch compared with last year.”",
        "value": "The comparison in seconds, not a two-day report request."
      },
      {
        "icon": "rocket",
        "team": "Sales leadership",
        "example": "“Which reps missed their target this month?”",
        "value": "Coach them while the month can still be saved."
      },
      {
        "icon": "server",
        "team": "Distribution and operations",
        "example": "“Where are today’s orders getting stuck?”",
        "value": "Fix today’s bottleneck today."
      },
      {
        "icon": "people",
        "team": "HR",
        "example": "“Attrition by department this year.”",
        "value": "Spot the team that needs attention before the next exit."
      },
      {
        "icon": "flag",
        "team": "Trade marketing",
        "example": "“Which promotions paid for their discount?”",
        "value": "Stop the promotions that lose money."
      },
      {
        "icon": "eye",
        "team": "Leadership",
        "example": "“How is the business performing this quarter?”",
        "value": "One clear answer, with the numbers behind it."
      }
    ]
  },
  "problems": {
    "eyebrow": "Why Insight",
    "outcomeLabel": "With Insight",
    "title": "Less report preparation.",
    "gradient": "More time to decide.",
    "items": [
      {
        "problem": "Managers wait for reports to understand performance.",
        "outcome": "Ask the question and get the number, a chart and how it was calculated."
      },
      {
        "problem": "Comparisons require gathering information from several sources.",
        "outcome": "Combine ERP data, budgets and policy limits in one answer."
      },
      {
        "problem": "A number alone leaves questions unanswered.",
        "outcome": "Ask why, and follow up until you have the full picture."
      }
    ]
  },
  "steps": {
    "eyebrow": "How it works",
    "title": "Three steps",
    "gradient": "from raw data to answers.",
    "items": [
      {
        "screen": "connect",
        "title": "Connect approved information",
        "text": "Give entaura read-only access to your ERP and pick the tables to use."
      },
      {
        "screen": "certify",
        "title": "Build and check the data model",
        "text": "We model the tables you chose and check them against your own reports before go-live."
      },
      {
        "screen": "ask",
        "title": "Ask and understand",
        "text": "Compare periods, branches or products and get the explanation, chart and query."
      }
    ]
  },
  "capabilities": {
    "eyebrow": "What you can do",
    "title": "Analytics that",
    "gradient": "shows its work.",
    "items": [
      {
        "icon": "chart",
        "title": "Performance comparisons",
        "text": "Compare sales, expenses, collections and trends in connected data."
      },
      {
        "icon": "document",
        "title": "Checked against your reports",
        "text": "Results are matched against figures you already trust before go-live."
      },
      {
        "icon": "check",
        "title": "The query behind every number",
        "text": "Open how each figure was calculated, down to the SQL."
      },
      {
        "icon": "layers",
        "title": "Against your policy limits",
        "text": "Check transactions against credit limits, budgets and targets in one question."
      },
      {
        "icon": "support",
        "title": "Follow-up questions",
        "text": "Continue exploring in the same conversation."
      },
      {
        "icon": "document",
        "title": "Clear explanations",
        "text": "Every result comes with a plain-words summary, in Arabic, English or Hindi."
      }
    ]
  },
  "screens": {
    "eyebrow": "See it",
    "title": "What Insight",
    "gradient": "looks like.",
    "text": "Illustrative experience with fictional sample data."
  },
  "integrations": {
    "eyebrow": "Connected knowledge",
    "title": "Put your business information",
    "gradient": "to work.",
    "text": "Connect your ERP read-only, and entaura never writes back.",
    "groups": [
      {
        "title": "ERP and databases",
        "note": "A read-only connection to the tables you pick. Nothing is ever changed in your ERP.",
        "items": [
          [
            "sap.svg",
            "SAP"
          ],
          [
            "oracle.png",
            "Oracle"
          ],
          [
            "mssqlserver.png",
            "MS SQL Server"
          ],
          [
            "postgresql.svg",
            "PostgreSQL"
          ],
          [
            "mysql.svg",
            "MySQL"
          ],
          [
            "mongodb.svg",
            "MongoDB"
          ]
        ]
      },
      {
        "title": "Reports and spreadsheets",
        "note": "Add budgets, targets and the reports you already trust.",
        "items": [
          [
            "icon:chart",
            "Excel"
          ],
          [
            "icon:document",
            "PDF reports"
          ],
          [
            "googledrive.svg",
            "Google Drive"
          ]
        ]
      },
      {
        "title": "Your own applications",
        "note": "Show the same charts and answers in your apps through the API and chart widget.",
        "items": [
          [
            "icon:link",
            "APIs"
          ],
          [
            "icon:layers",
            "Chart widget"
          ],
          [
            "icon:document",
            "Websites"
          ]
        ]
      }
    ],
    "setup": "You choose which sources each team can use."
  },
  "trust": {
    "eyebrow": "Access and control",
    "title": "Company knowledge.",
    "gradient": "Company controls.",
    "items": [
      {
        "icon": "eye",
        "title": "Read-only by design",
        "text": "entaura reads from your systems and never writes back to them."
      },
      {
        "icon": "document",
        "title": "Every answer cites its source",
        "text": "Open the exact page, cells or query behind each answer."
      },
      {
        "icon": "people",
        "title": "You control access",
        "text": "Admins decide who sees what, and every query is logged with who asked."
      }
    ]
  },
  "cta": {
    "title": "See Insight on your own data.",
    "text": "Try the live demo, or talk to our team about your own data."
  }
}
