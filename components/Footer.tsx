
import React, { useEffect, useState } from 'react';
import { Github, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const [views, setViews] = useState(1248);

  useEffect(() => {
    // Simulated visitor counter logic
    const storedViews = localStorage.getItem('portfolio_views');
    if (storedViews) {
      setViews(parseInt(storedViews) + 1);
      localStorage.setItem('portfolio_views', (parseInt(storedViews) + 1).toString());
    } else {
      localStorage.setItem('portfolio_views', "1248");
    }
  }, []);

  return (
    <footer className="py-12 px-6 border-t border-white/10 bg-primary">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <a href="#" className="font-bebas text-3xl tracking-widest text-accent-bright mb-4 block">MT</a>
          <p className="text-gray-500 max-w-xs">
            Designing and developing robust digital solutions for the next generation of users.
          </p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
            <Github size={20} />
          </a>
          <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
            <Linkedin size={20} />
          </a>
          <a href="https://www.instagram.com/h.e.w.s?igsh=MWgyeHdnNW00eWg0dA==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
            <Instagram size={20} />
          </a>
        </div>

        <div className="text-center md:text-right text-gray-500">
          <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
            Made with <Heart size={16} className="text-red-500 fill-red-500" /> by Matthews
          </div>
          <div className="text-xs uppercase tracking-widest opacity-50">
            Total Portfolio Views: {views.toLocaleString()}
          </div>
          <p className="mt-4">© 2025 Matthews Thekiso. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
