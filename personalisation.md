# Personalization Engine Implementation

## 1. Objective
Build an AI-driven "My ET" personalized newsroom that dynamically adapts news based on:
- Persona
- Behavior
- Real-world impact

---

## 2. System Architecture Overview

### Core Components

1. User Context Layer
2. Event Tracking System
3. Article Processing Pipeline
4. AI Impact Engine
5. Feed Ranking System
6. Frontend Rendering Engine

---

## 3. User Types

### Guest User
- Select persona on first visit
- No tracking
- Static personalization

### Logged-in User
Personalization based on:

#### a. Explicit Signals
- Persona
- Interests
- Watchlist

#### b. Behavioral Signals
- Clicks
- Read time
- Search queries

#### c. Cross-feed Signals
- Activity from:
  - Homepage
  - My ET

---

## 4. User Context System

### File: `UserContext.jsx`

Stores:
- persona
- language
- vernacular_enabled
- interests
- watchlist

### Behavior:
- Initialized during onboarding
- Persisted using localStorage / backend DB
- Available globally across app

---

## 5. Event Tracking System

### Backend Endpoint
`POST /track-event`

### Event Types
- article_click
- article_read_time
- search_query

### Example Payload
{
  "user_id": "123",
  "article_id": "abc",
  "event_type": "article_click",
  "persona": "Investor",
  "timestamp": "..."
}

6. Article Processing Pipeline
Input
Raw article (RSS or API)
Output
Structured article object
{
  "title": "",
  "summary": "",
  "category": "",
  "entities": ["crude oil", "RBI", "startup funding"],
  "impact_tags": []
}
7. AI Impact Engine (CORE)
Purpose
Determine:
Whether article is relevant to persona
Why it matters
Prompt Logic
INPUT:
Article content
Persona
OUTPUT:
{
  "relevance_score": 0-1,
  "impact_type": ["financial", "strategic", "operational"],
  "why_it_matters": "..."
}
Rules
NO hardcoding
Fully LLM-based reasoning

8. Feed Generation Logic
Step 1: Filter
Only include articles where:
relevance_score > threshold (e.g., 0.6)
Step 2: Rank
Ranking factors:
relevance_score
recency
user interest match
behavioral similarity
Step 3: Categorize
Feed Structure:
Your Daily Brief
Your Top Stories
Your Watchlist


9. Persona-Based Rendering
Investor
Charts
Numbers
Market indicators
Startup Founder
Headlines
Funding alerts
Student
Explainers
Simplified summaries
Small Business Owner
Actionable insights
Compliance alerts


10. Vernacular Engine
Toggle Location
Inside My ET settings
Levels
Level 1 (Hackathon)
ON/OFF toggle
Level 2 (Future)
Concept-level translation
Behavior
If ON:
AI rewrites output in selected language
Uses analogies


11. Frontend Structure
Pages
Login Page
Onboarding Page (Persona + Language)
Home Page (Normal Feed)
My ET Page (Personalized Feed)


12. Backend APIs
Required Endpoints
GET /articles → fetch raw articles
POST /track-event → track user behavior
POST /personalized-feed → generate My ET feed
POST /impact-analysis → AI processing


13. Transition from Current System
Remove
IMPACT_MATRIX
VERNACULAR_MATRIX
Hardcoded personas
Replace with
AI Impact Engine
Dynamic scoring
Context-driven rendering

14. Tech Stack Suggestion
Backend
FastAPI / Node.js
OpenAI API (LLM)
Frontend
React (Context API)
Storage
MongoDB / Firebase


15. Future Improvements
Reinforcement Learning for ranking
Fine-tuned impact model
Real-time personalization loop
Multi-persona switching
