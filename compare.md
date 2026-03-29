# System Comparison report

This document outlines the differences between the current implementation of the ET-Platform and the target vision defined in `ideas.md` and `context.md`.

## 1. Current State vs. Ideal Vision

| Feature / Area | What the System is Currently Doing (Current Code) | What it SHOULD do (Based on `ideas.md` & `context.md`) |
| :--- | :--- | :--- |
| **Personalization Engine** | Uses a hardcoded `_IMPACT_MATRIX` driven by simple `if-else` rules. Only checks the article "category" to spit out a generic template phrase. | Must use an AI/LLM to deeply understand the actual article content and dynamically generate personalized insights based on exact user roles (Investor, Student, etc.). |
| **Vernacular Adaptation** | Uses a hardcoded `_VERNACULAR_MATRIX`. Generates static pre-written sentences. Runs on a completely separate backend API route (`/vernacular`). | Must automatically adapt business news into native languages using local analogies. Most importantly, it must **FUSE** the native language and personalization into a **single, seamless narrative** output. |
| **Data Sources** | Fetches from a hardcoded `mock_articles` Python list of 5 fake articles. | Must fetch real-time news automatically from the **ET RSS feed**. |
| **"My ET" Dashboard UI** | Heavily hardcoded for a mock "Investor" persona (e.g., hardcoded "Good Evening, Argh", "₹4.28 Cr" portfolio, bullish badges). Needs manual switching. | Must be fully dynamic. An Investor should see data-heavy charts, while a Student should see concept-first explainer cards. They should see completely different UI layouts based on their selected persona. |
| **Global State & Onboarding** | Doesn't seem to persist user state. `UserContext` does not control the `My ET` dashboard layout. | Must have a `UserContext.jsx` file that globally stores the user's selected language and persona during onboarding and propagates it to all screens. |
| **Vernacular Toggle** | Missing or hardcoded on the UI level. | Must have an active "Vernacular Engine ON/OFF" toggle inside My ET, defaulting to ON if a language was selected during onboarding. |

---

## 2. Missing Tasks Breakdown

Here are the specific tasks that need to be accomplished to bring the current project up to the standards of `ideas.md` and `context.md`, separated by Frontend and Backend.

### ⚙️ Backend Tasks
1. **Build the Unified AI Narrative Engine:** Refactor `personalization.py` and `vernacular.py` into a single LLM-powered engine. It needs to accept an article, persona, and language, and return one combined, culturally-adapted narrative instead of two separate pieces of text.
2. **Implement ET RSS Feed:** Delete the `mock_articles` python list in `articles.py`. Write a parser to fetch and serve live data from the real Economic Times XML/RSS feeds instead.
3. **AI Evaluator (Impact Logic):** Implement logic where the AI evaluates every article stream and asks: *"Does this story have a financial/operational impact on this persona?"* before choosing to display it in the "Your Daily Brief" section.

### 🖥️ Frontend Tasks
1. **Create `UserContext.jsx`:** Build a global React Context provider to store the user's chosen `Language` and `Persona`. Wrap the Next.js app so every page has access to this data.
2. **Dynamic UI Rendering (`/my-et`):** Update `my-et/page.jsx` to stop hardcoding the "Investor" layout. Use the `UserContext` to dynamically switch the card designs (e.g., render `<InvestorCard />` vs `<StudentCard />` vs `<FounderCard />`).
3. **Connect Onboarding:** Ensure the `/onboarding` page actually saves the selected persona and language into the new `UserContext` and immediately redirects to the personalized My ET dashboard.
4. **Vernacular Toggle & Badges:** Add the physical Vernacular Voice toggle inside the `My ET` settings. Additionally, build the subtle *"Culturally Adapted for You"* badge to appear on fully adapted business news articles.
