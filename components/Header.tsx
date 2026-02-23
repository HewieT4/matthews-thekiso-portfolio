
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on resize to prevent layout ghosting
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    window.dispatchEvent(new CustomEvent('scroll-start'));
    
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80; // Approximate height of header
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('scroll-end'));
      }, 1000);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white dark:bg-primary border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative z-[110]">
        <a href="#" className="font-bebas text-2xl tracking-widest text-accent-bright hover:text-accent transition-colors">
          MT <span className="text-gray-900 dark:text-white">THEKISO</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className="text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </a>
          ))}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-colors"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Toggles */}
        <div className="flex items-center gap-2 md:hidden">
           <button onClick={toggleTheme} className="p-2 text-gray-900 dark:text-white transition-colors" aria-label="Toggle Theme">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="p-2 text-gray-900 dark:text-white transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drop Down Menu - Fixed to Top */}
      <div 
        className={`absolute top-full left-0 w-full bg-white dark:bg-primary border-b border-gray-200 dark:border-white/10 shadow-2xl transition-all duration-300 ease-in-out md:hidden overflow-hidden ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link, idx) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className={`text-2xl font-bebas tracking-widest text-gray-700 dark:text-gray-200 hover:text-accent transition-all duration-300 transform border-b border-gray-100 dark:border-white/5 pb-2 last:border-0 ${
                isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {link.name}
            </a>
          ))}
          
          <div className={`pt-4 flex items-center justify-between transition-opacity duration-500 delay-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex gap-4">
               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-accent-bright font-bold text-xs tracking-widest uppercase">Github</a>
               <a href="https://www.instagram.com/h.e.w.s?igsh=MWgyeHdnNW00eWg0dA==" target="_blank" rel="noopener noreferrer" className="text-accent-bright font-bold text-xs tracking-widest uppercase">Instagram</a>
            </div>
            <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">MT • 2025</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
