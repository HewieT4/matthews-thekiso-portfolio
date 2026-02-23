
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Loader2, Sparkles } from 'lucide-react';
import { PROJECTS, SKILLS, EDUCATION } from '../constants';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Hi! I'm Matthews' AI assistant. Ask me anything about his projects, skills, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const portfolioContext = `
    You are an AI assistant for Matthews Thekiso, a Junior Full Stack Developer.
    Matthews' background: 
    - Education: Higher National Diploma in IT & Computer Science from Sedibeng TVET College (2022-2026).
    - Skills: Full Stack Development (React, TypeScript, Node), Cisco Networking (95% expertise), UI/UX Design, API Dev, SDLC, AI in Dev.
    - Projects: 
      1. AI Resume Analyzer (React, AI Integration)
      2. Angels World Website (Modern business site)
      3. Network Monitor Dashboard (Python, SNMP, Cisco)
      4. UI/UX Portfolio Design.
    - Experience: Internship at FNB App Academy (IT Varsity) focusing on APIs and UX.
    - Certifications: Full Stack Development (FNB App Academy), IT Essentials (Cisco).
    - Contact: sefellethekiso@gmail.com, +27 65 916 9351.
    
    Guidelines:
    - Be professional, friendly, and helpful.
    - Keep responses concise.
    - Focus on Matthews' strengths in bridging Networking and Software Development.
    - If asked about things not in the context, say you can only provide info about Matthews' professional profile.
  `;

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({ role: m.role, text: m.text })),
            { role: 'user', text: userMessage }
          ],
          systemInstruction: portfolioContext
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI assistant');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      const errorMessage = "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-8 z-[90] no-print">
      {isOpen ? (
        <div className="w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-primary border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between bg-accent/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Portfolio AI</h4>
                <p className="text-[10px] text-accent font-bold uppercase tracking-widest">Active Now</p>
              </div>
            </div>
            {/* Fix: changed setIsMenuOpen to setIsOpen and removed redundant onClick from icon */}
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors" aria-label="Close Chat">
               <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-accent text-white rounded-br-none' 
                    : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-white/5 p-3 rounded-2xl rounded-bl-none">
                  <Loader2 size={16} className="animate-spin text-accent" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-white/10">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me something..."
                className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2 outline-none focus:border-accent text-sm"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                className="p-2 bg-accent text-white rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group relative"
        >
          <div className="absolute -top-12 right-0 bg-white dark:bg-primary border border-accent/20 px-3 py-1 rounded-lg text-[10px] font-bold text-accent uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with AI
          </div>
          <MessageSquare size={28} />
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
