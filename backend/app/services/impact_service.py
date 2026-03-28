"""
Impact Service — generates a persona-based "Why this matters" insight for a given article.
No AI yet; uses rule-based logic keyed on persona and article category.
"""

# Category-specific insight templates per persona
_IMPACT_MATRIX = {
    "Investor": {
        "Economy": "Macroeconomic shifts like this directly affect interest rates, valuations, and market sentiment — review your portfolio exposure.",
        "Markets": "This market movement may create entry or exit opportunities — watch sector indices closely.",
        "Technology": "Tech sector developments can reshape growth stock valuations and M&A activity.",
        "Startups": "Rising startup activity signals risk appetite — early-stage and venture-linked funds may benefit.",
        "default": "This development may impact stock prices or sectors tied to the news — monitor closely.",
    },
    "Student": {
        "Economy": "This explains how central bank decisions shape borrowing costs and consumer spending in real life.",
        "Markets": "Market rallies like this show how investor confidence drives capital flows across sectors.",
        "Technology": "This is a real-world example of how AI and 5G are changing industry — relevant for tech and business courses.",
        "Startups": "Understanding funding cycles helps you see how new companies grow and create jobs.",
        "default": "This helps you understand how global economic trends connect to everyday life and career opportunities.",
    },
    "Small Business Owner": {
        "Economy": "Interest rate stability affects your loan EMIs and working capital costs — plan accordingly.",
        "Markets": "Foreign investment trends influence currency rates and import/export costs for your business.",
        "Technology": "Enterprise tech adoption may open new tools or raise the bar for your competitors.",
        "Startups": "A healthy startup ecosystem means more potential partners, vendors, and competitors emerging.",
        "default": "This may affect regulatory policy, supply chain costs, or market demand relevant to your business.",
    },
}

_FALLBACK = "This development is worth tracking as it may have downstream effects on your goals."


def generate_impact(article: dict, persona: str) -> str:
    """
    Return a persona-specific insight string for the given article.

    Args:
        article: dict with at least a 'category' key.
        persona: one of 'Investor', 'Student', 'Small Business Owner'.

    Returns:
        A plain-English insight string.
    """
    persona_map = _IMPACT_MATRIX.get(persona)
    if not persona_map:
        return _FALLBACK

    category = article.get("category", "")
    return persona_map.get(category, persona_map["default"])
