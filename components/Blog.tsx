
import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Loader2, ExternalLink, Calendar } from 'lucide-react';

interface Article {
  title: string;
  date: string;
  source: string;
  image: string;
  summary: string;
  url: string;
}

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiInsight, setAiInsight] = useState<{ text: string; links: { title: string; uri: string }[] } | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    fetchLatestITNews();
  }, []);

  const fetchLatestITNews = async () => {
    setIsLoadingNews(true);
    setError(null);
    try {
      // Simplified fetch to avoid preflight issues. GNews supports simple GET requests.
      const response = await fetch('/.netlify/functions/news');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.errors?.[0] || `API Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.articles && data.articles.length > 0) {
        const formattedArticles = data.articles.map((item: any) => ({
          title: item.title,
          date: new Date(item.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          source: item.source.name,
          image: item.image || `https://picsum.photos/seed/${encodeURIComponent(item.title).substring(0, 5)}/600/400`,
          summary: item.description,
          url: item.url
        }));
        setArticles(formattedArticles);
      } else {
        throw new Error('No articles found');
      }
    } catch (err: any) {
      console.error("Error fetching IT news:", err);
      
      // "Failed to fetch" is usually a browser-level block (CORS, Ad-blocker, or Network)
      const isNetworkError = err.message === 'Failed to fetch';
      setError(isNetworkError 
        ? "The news API request was blocked. This is often caused by ad-blockers or strict privacy settings. Please try disabling them for this site."
        : `News Error: ${err.message}`);
      
      // Fallback to static if API fails
      setArticles([
        {
          title: "The Rise of Agentic AI in Enterprise",
          date: "Feb 22, 2025",
          source: "TechDaily",
          image: "https://picsum.photos/seed/blog1/600/400",
          summary: "Autonomous AI agents are transforming how businesses handle complex workflows, moving beyond simple chatbots to proactive problem solvers.",
          url: "https://www.google.com/search?q=Agentic+AI+in+Enterprise"
        },
        {
          title: "Quantum Computing Reaches New Stability Milestones",
          date: "Feb 18, 2025",
          source: "ScienceNow",
          image: "https://picsum.photos/seed/blog2/600/400",
          summary: "Researchers have achieved a breakthrough in error correction, bringing practical quantum applications closer to reality than ever before.",
          url: "https://www.google.com/search?q=Quantum+Computing+Stability+Milestones"
        },
        {
          title: "Next-Gen Cybersecurity: AI vs AI",
          date: "Feb 15, 2025",
          source: "CyberSecurity Hub",
          image: "https://picsum.photos/seed/blog3/600/400",
          summary: "As hackers leverage LLMs for sophisticated phishing, security firms are deploying defensive AI models to predict and neutralize threats in real-time.",
          url: "https://www.google.com/search?q=AI+vs+AI+Cybersecurity"
        }
      ]);
    } finally {
      setIsLoadingNews(false);
    }
  };

  const handleTechSearch = async () => {
    if (!searchQuery.trim() || isSearching) return;
    setIsSearching(true);
    try {
      const response = await fetch('/.netlify/functions/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', text: `Provide a quick expert summary about: ${searchQuery}. Focus on current trends and industry impact.` }],
          tools: [{ googleSearch: {} }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get research insight');
      }

      const data = await response.json();
      const text = data.text || "No insights found.";
      const chunks = data.groundingMetadata?.groundingChunks || [];
      const links = chunks
        .filter((c: any) => c.web)
        .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));

      setAiInsight({ text, links });
    } catch (error: any) {
      console.error("Grounding Search Error:", error);
      setAiInsight({ text: "Research service is temporarily unavailable. Please try again later.", links: [] });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section id="blog" className="py-24 px-6 reveal relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h3 className="text-accent font-semibold tracking-widest uppercase mb-2">Insights</h3>
            <h2 className="font-bebas text-5xl md:text-7xl">Real-Time IT Updates</h2>
          </div>
          
          {/* Tech Search Enhancement */}
          <div className="w-full md:w-96 no-print">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search real-time tech trends..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-12 outline-none focus:border-accent transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTechSearch()}
              />
              <button 
                onClick={handleTechSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-accent hover:scale-110 transition-transform"
              >
                {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              </button>
            </div>
            <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
              <Sparkles size={10} /> Powered by Gemini Google Search Grounding
            </p>
          </div>
        </div>

        {/* AI Insight Result */}
        {aiInsight && (
          <div className="mb-16 p-8 bg-accent/5 border border-accent/20 rounded-3xl animate-in fade-in zoom-in duration-500">
            <div className="flex items-center gap-2 mb-4 text-accent">
              <Sparkles size={20} />
              <h4 className="font-bold tracking-widest uppercase text-sm">AI Research Insight</h4>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {aiInsight.text}
            </p>
            {aiInsight.links.length > 0 && (
              <div className="flex flex-wrap gap-4">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sources:</span>
                {aiInsight.links.slice(0, 3).map((link, i) => (
                  <a key={i} href={link.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-accent-bright hover:underline flex items-center gap-1">
                    {link.title} <ExternalLink size={10} />
                  </a>
                ))}
              </div>
            )}
            <button onClick={() => setAiInsight(null)} className="mt-6 text-xs text-gray-500 hover:text-accent uppercase tracking-widest font-bold">Clear Insight</button>
          </div>
        )}

        {isLoadingNews ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-accent" size={48} />
            <p className="text-gray-500 font-bebas tracking-widest text-xl">Fetching Latest IT News...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={fetchLatestITNews} className="text-accent hover:underline uppercase tracking-widest font-bold text-sm">Retry</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((post, idx) => (
              <a 
                key={idx} 
                href={post.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6 shadow-xl bg-gray-900">
                  <img src={post.image} alt={post.title} className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-accent/90 backdrop-blur-sm text-white rounded text-[10px] font-bold uppercase tracking-widest">{post.source}</div>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                  <Calendar size={12} />
                  <span>{post.date}</span>
                </div>
                <h4 className="text-xl font-bold group-hover:text-accent transition-colors mb-4 line-clamp-2 leading-tight">{post.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">{post.summary}</p>
                <div className="flex items-center gap-2 font-bold text-xs text-accent-bright group-hover:translate-x-1 transition-transform uppercase tracking-widest">
                  Read Full Article <ExternalLink size={14} />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
