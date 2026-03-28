from fastapi import APIRouter

router = APIRouter(prefix="/articles", tags=["articles"])

mock_articles = [
    {
        "id": "art-001",
        "headline": "RBI Holds Repo Rate Steady at 6.5% Amid Inflation Concerns",
        "summary": "The MPC voted unanimously to keep the benchmark repo rate unchanged, signaling caution over persistent food inflation.",
        "body": "The Reserve Bank of India (RBI) kept the repo rate at 6.5% for the seventh consecutive meeting. Governor Shaktikanta Das emphasized the central bank remains vigilant and data-dependent.",
        "category": "Economy",
        "timestamp": "2026-03-27T10:00:00Z",
        "language": "en",
    },
    {
        "id": "art-002",
        "headline": "Sensex Surges 800 Points as Foreign Investors Return",
        "summary": "FIIs turned net buyers for the third straight session, with IT and banking stocks leading the rally.",
        "body": "The BSE Sensex jumped 812 points to close at 74,560. FIIs purchased equities worth ₹3,200 crore, their third consecutive day of net buying. Infosys and HDFC Bank were the top contributors.",
        "category": "Markets",
        "timestamp": "2026-03-27T15:30:00Z",
        "language": "en",
    },
    {
        "id": "art-003",
        "headline": "Reliance Jio Launches AI-Powered 5G Feature Suite for Enterprise Clients",
        "summary": "Jio announced a B2B product suite combining AI and 5G for real-time analytics and private network solutions.",
        "body": "Reliance Jio unveiled Jio BusinessEdge AI, targeting manufacturers, logistics firms, and healthcare providers. Jio has signed pilot agreements with three Fortune 500 companies and expects general availability by Q3 2026.",
        "category": "Technology",
        "timestamp": "2026-03-26T09:15:00Z",
        "language": "en",
    },
    {
        "id": "art-004",
        "headline": "India's GDP Growth Forecast Revised to 7.2% for FY2026",
        "summary": "IMF upgraded India's growth outlook citing strong domestic consumption and public infrastructure investment.",
        "body": "The IMF revised its GDP projection for India to 7.2% for FY2026, up from 6.8%. India remains the fastest-growing major economy globally.",
        "category": "Economy",
        "timestamp": "2026-03-25T12:00:00Z",
        "language": "en",
    },
    {
        "id": "art-005",
        "headline": "Startups Raise $1.2B in Q1 2026 as VC Sentiment Improves",
        "summary": "Indian startups attracted over $1.2 billion in Q1, a 40% year-on-year rise driven by fintech, climate tech, and AI.",
        "body": "According to Tracxn, fintech, climate technology, and AI-native companies accounted for nearly 60% of total capital raised. Improving global liquidity and returning founders were cited as key catalysts.",
        "category": "Startups",
        "timestamp": "2026-03-24T08:00:00Z",
        "language": "en",
    },
]


@router.get("/")
def get_articles():
    return mock_articles
