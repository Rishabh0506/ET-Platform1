export default function ArticleContent({ summary, body }) {
  let extractedSummary = summary || "";
  let extractedArticle = body || "";

  // Step 1: Extract Summary section if present in AI output
  const summaryMatch = extractedArticle.match(/\*\*Summary:\*\*\s*([\s\S]*?)(?:\-\-\-|$)/i);
  if (summaryMatch && summaryMatch[1]) {
    extractedSummary = summaryMatch[1].trim();
  }

  // Step 2: Extract Article section if present
  const articleMatch = extractedArticle.match(/\*\*Article:\*\*\s*([\s\S]*)/i);
  if (articleMatch && articleMatch[1]) {
    extractedArticle = articleMatch[1].trim();
  } else if (summaryMatch) {
    // If there was a summary but no explicit Article tag, take everything after the separator
    const parts = extractedArticle.split('---');
    if (parts.length > 1) {
      extractedArticle = parts.slice(1).join('---').trim();
    }
  }

  // Step 3: Strip any dangling Headline labels from the string entirely
  extractedArticle = extractedArticle.replace(/^\*\*Headline:\*\*\s*.*(\n|$)/im, "").trim();

  // Step 5: Strip all remaining markdown bold asterisks
  const cleanMarkdown = (text) => text.replace(/\*\*/g, "").trim();
  
  extractedSummary = cleanMarkdown(extractedSummary);
  extractedArticle = cleanMarkdown(extractedArticle);

  return (
    <div className="prose prose-gray max-w-none">
      {/* Summary Box / TL;DR Card */}
      <div className="mb-12 rounded-sm border border-red-100 bg-red-50/50 p-6 shadow-sm">
        <h4 className="mb-3 text-[10px] font-black uppercase tracking-widest text-red-800">
          Executive Summary
        </h4>
        <p className="text-base font-medium text-slate-800 leading-relaxed italic">
          {extractedSummary}
        </p>
      </div>

      {/* Main Article Body */}
      <div className="text-lg text-slate-900 leading-loose whitespace-pre-wrap font-serif">
        {extractedArticle}
      </div>
    </div>
  );
}
