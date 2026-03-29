Feature 1 — My ET (Personalized Newsroom)
What it is
A dedicated "Your Newsroom" tab on ET's homepage delivering a fully personalized, impact-based news feed for every user.
Two Types of Users
Guest User (Not Logged In)
Simple persona selector on first visit
Options — Investor, Startup Founder, Student, Small Business Owner
Personalization is static based on selection
No tracking
Logged In User Personalization through three signals:
Explicit — profile filled by user (persona, interests, watchlist)
Behavioral — articles clicked, read time, searches
Cross-feed — behavior tracked on both normal homepage AND Your Newsroom
Personalization Rules
Only persona-relevant behavior affects My ET feed
Reading an unrelated article does NOT affect feed
Unless that article has impact relevance to their persona
AI dynamically evaluates impact — no pre-built rules
Impact-Based Feed Logic
AI evaluates every article against:
"Does this story have a financial, operational, or strategic impact on this persona?"
If yes — story appears in My ET with AI-generated "Why this matters to you" line.
Example:
Iran launches missiles → Normal ET shows under World News → My ET shows to Investor with note: "Brent crude up 4%, Indian fuel prices likely to rise, impacting logistics and FMCG stocks"
Feed Structure
┌─────────────────────────────────┐
│  Your Daily Brief (top)         │
├─────────────────────────────────┤
│  Your Top Stories (middle)      │
├─────────────────────────────────┤
│  Your Watchlist (bottom)        │
└─────────────────────────────────┘
Persona Experience
Persona
Daily Brief
Top Stories
Card Style
Investor
Market movements, portfolio impact
Nifty, FII, NAV, rate changes
Data-heavy — numbers, charts
Startup Founder
Funding news, competitor moves
Rounds, policy, ecosystem
Headline-heavy — scannable
Student
Simple summary of what matters today
Explainer-first content
Concept-first — "What is this?"
Small Business Owner
GST deadlines, policy changes
MSME, banking, taxation
Action-oriented — "What to do"

Vernacular Engine Toggle Inside My ET
User can turn Vernacular Engine ON or OFF in My ET settings
Default is ON if vernacular language selected during onboarding
Level 1 — Global toggle (build for hackathon)
Level 2 — Concept-level control — future roadmap

Feature 2 — Vernacular Business News Engine
What it is
Automatic, invisible cultural adaptation of ET's business news articles into Hindi, Tamil, Telugu, Bengali.
Simple Rule
Wherever the user is on ET — if it's a business article and they have a vernacular language selected — Vernacular Engine kicks in. Always. Automatically. Unless turned off by the user.
How it works
User picks language during onboarding
Non-business articles → normal translation
Business articles → Vernacular Engine silently kicks in everywhere
Subtle badge on article — "Culturally Adapted for You"
Toggle available inside My ET settings
What "Culturally Adapted" means
Not a literal translation. AI rewrites using locally familiar analogies:
Repo rate cut → gold loan or chit fund analogy for Tamil reader
Stock market crash → local business families reference for Bengali reader
Startup funding → local entrepreneurship context for Hindi reader
Scope
Only business news articles
Non-business articles get normal translation

User Journey
Onboarding
└── Pick Language (English/Hindi/Tamil/Telugu/Bengali)
└── Pick Persona (Investor/Founder/Student/Small Business Owner)
         ↓
ET Homepage
└── Normal Feed (ET RSS feed)
└── Your Newsroom Tab (My ET personalized feed)
         ↓
Click any article
└── Business article → Vernacular Engine activates (if ON)
└── Non-business article → Normal translation

How Features Sit Together
ET Homepage
├── Normal Feed
│    └── Business article → Vernacular Engine (if ON)
│    └── Non-business article → Normal translation
│
└── Your Newsroom Tab (My ET)
     └── Impact-based personalized feed
     └── Business article → Vernacular Engine (if ON)
     └── Non-business article → Normal translation

Two Moments of Delight
Opening Your Newsroom → "This feed actually gets me"
Reading a business article → "I actually understood that"

Onboarding Flow
Two questions only:
Pick language — English, Hindi, Tamil, Telugu, Bengali
Pick persona — Investor, Startup Founder, Student, Small Business Owner
No long forms
Guest → static personalization
Logged in → dynamic personalization

First Three Files To Build
UserContext.jsx — stores language and persona globally
articles.js — mock data so UI has something to display
Navbar.jsx — sets ET look and feel immediately

