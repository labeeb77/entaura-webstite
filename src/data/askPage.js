// Capabilities sourced from EntAura Feature Documentation.pdf.
export const askPage = {
  "hero": {
    "eyebrow": "Document intelligence",
    "title": "Find the answer.",
    "gradientLines": [
      "Get back to work."
    ],
    "text": "Ask about your policies, handbooks and procedures in your own language. Every answer shows the file and page it came from, and when your documents don’t say, Ask tells you instead of guessing."
  },
  "audience": {
    "eyebrow": "Who it’s for",
    "title": "For every team that",
    "gradient": "asks the same questions twice.",
    "text": "Give each team the policies, procedures and product documents they need, and only those.",
    "items": [
      {
        "icon": "chart",
        "team": "Finance",
        "example": "“Who approves an order above a customer’s credit limit?”",
        "value": "No more waiting on finance to answer the same question."
      },
      {
        "icon": "rocket",
        "team": "Sales",
        "example": "“What discount can I offer a new distributor?”",
        "value": "Reps quote the right terms on the first call."
      },
      {
        "icon": "people",
        "team": "HR",
        "example": "“How many leave days carry over to next year?”",
        "value": "Staff check it themselves instead of emailing HR."
      },
      {
        "icon": "server",
        "team": "Operations",
        "example": "“What is the procedure for returning an order?”",
        "value": "Every branch follows the same steps."
      },
      {
        "icon": "support",
        "team": "Customer support",
        "example": "“What does the warranty cover for spare parts?”",
        "value": "Customers get a clear answer while they’re on the line."
      },
      {
        "icon": "flag",
        "team": "Leadership",
        "example": "“What does our latest management report say?”",
        "value": "The key points, with the page to read in full."
      }
    ]
  },
  "problems": {
    "eyebrow": "Why Ask",
    "outcomeLabel": "With Ask",
    "title": "Less searching,",
    "gradient": "more knowing.",
    "items": [
      {
        "problem": "The answer is somewhere in a folder, handbook or email.",
        "outcome": "Ask in plain words and get the answer from the right document."
      },
      {
        "problem": "A summary is hard to trust without the original document.",
        "outcome": "Every answer links to the clause and page it came from."
      },
      {
        "problem": "Repeated policy questions interrupt the same people.",
        "outcome": "Staff look it up themselves, so HR and finance stop answering the same question."
      }
    ]
  },
  "steps": {
    "eyebrow": "How it works",
    "title": "Three steps",
    "gradient": "from question to proof.",
    "items": [
      {
        "screen": "connect",
        "title": "Add your documents",
        "text": "Upload files, or pick Google Drive folders, Gmail labels or an S3 bucket. Access is read-only."
      },
      {
        "screen": "ask",
        "title": "Ask in your own words",
        "text": "Type or speak in any of 9 languages. Ask follows the language of your question."
      },
      {
        "screen": "answer",
        "title": "Read and verify",
        "text": "Each claim is numbered to its source. Open it to see the exact page, figure or table."
      }
    ]
  },
  "capabilities": {
    "eyebrow": "What you can do",
    "title": "Built for answers",
    "gradient": "you can act on.",
    "items": [
      {
        "icon": "check",
        "title": "Answers with proof",
        "text": "Every answer cites the file and page. Hover a citation to preview the exact passage."
      },
      {
        "icon": "eye",
        "title": "Scans, figures and tables",
        "text": "Scanned pages and images are read with OCR, and you can ask what a figure or table in a document says."
      },
      {
        "icon": "shield",
        "title": "Says when it doesn’t know",
        "text": "If your documents don’t contain the answer, Ask says so. It never makes up company facts."
      },
      {
        "icon": "support",
        "title": "9 languages, by voice too",
        "text": "English, Arabic, Hindi, Urdu, Malayalam, Tamil, Telugu, Bengali and Kannada, with right-to-left layouts and read-aloud answers."
      },
      {
        "icon": "document",
        "title": "Summaries and follow-ups",
        "text": "Summarize a document or a whole knowledge base, then keep asking in the same chat. Chats are saved for later."
      },
      {
        "icon": "layers",
        "title": "Ask across teams",
        "text": "Group knowledge bases such as HR and Finance and ask across them at once. People only get answers from the ones they can access."
      }
    ]
  },
  "screens": {
    "eyebrow": "See it",
    "title": "What Ask",
    "gradient": "looks like.",
    "text": "Illustrative experience with fictional sample data."
  },
  "integrations": {
    "eyebrow": "Connected knowledge",
    "title": "Put your business information",
    "gradient": "to work.",
    "text": "Connect the documents your teams already rely on, and choose exactly what entaura can read.",
    "groups": [
      {
        "title": "Cloud documents and email",
        "note": "Read-only access to the folders, labels and buckets you pick.",
        "items": [
          [
            "googledrive.svg",
            "Google Drive"
          ],
          [
            "gmail.svg",
            "Gmail"
          ],
          [
            "aws.png",
            "Amazon S3"
          ]
        ]
      },
      {
        "title": "Files you upload",
        "note": "Tag each file so people can point a question at it. Scanned pages are read with OCR.",
        "items": [
          [
            "icon:document",
            "PDF and Word"
          ],
          [
            "icon:chart",
            "Excel"
          ],
          [
            "icon:document",
            "Text files"
          ],
          [
            "icon:eye",
            "Scans and images"
          ]
        ]
      },
      {
        "title": "Your own applications",
        "note": "Put the same cited answers in your portal or app with an API key limited to chosen knowledge bases.",
        "items": [
          [
            "icon:link",
            "APIs"
          ],
          [
            "icon:layers",
            "Portals"
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
    "title": "See Ask on your own documents.",
    "text": "Try the live demo, or talk to our team about your own data."
  }
}
