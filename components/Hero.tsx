
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, FileText } from 'lucide-react';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const decor1Ref = useRef<HTMLDivElement>(null); // Rotating Ring
  const decor2Ref = useRef<HTMLDivElement>(null); // Floating Dots
  const contentRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const fullText = "Junior Full Stack Developer";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);

    const handleNavStart = () => { isPaused.current = true; };
    const handleNavEnd = () => { setTimeout(() => { isPaused.current = false; }, 1000); };

    window.addEventListener('scroll-start', handleNavStart);
    window.addEventListener('scroll-end', handleNavEnd);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll-start', handleNavStart);
      window.removeEventListener('scroll-end', handleNavEnd);
    };
  }, []);

  // Performance-first Parallax with enhanced layers
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Stop processing if hero is off screen
          if (scrollY > window.innerHeight) {
            ticking = false;
            return;
          }

          // Layered speeds for visual depth
          if (glow1Ref.current) glow1Ref.current.style.transform = `translate3d(0, ${scrollY * 0.2}px, 0)`;
          if (glow2Ref.current) glow2Ref.current.style.transform = `translate3d(0, ${-scrollY * 0.15}px, 0)`;
          
          // Counter-parallax for geometric decor (moving opposite or at distinct rates)
          if (decor1Ref.current) {
            decor1Ref.current.style.transform = `translate3d(0, ${scrollY * -0.25}px, 0) rotate(${scrollY * 0.05}deg)`;
          }
          if (decor2Ref.current) {
            decor2Ref.current.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
          }

          if (contentRef.current) {
            contentRef.current.style.transform = `translate3d(0, ${scrollY * 0.1}px, 0)`;
            contentRef.current.style.opacity = `${Math.max(0, 1 - scrollY / 600)}`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ultra-Lightweight Particle System for background ambient motion
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const count = 40; 

    class Particle {
      x: number; y: number; size: number; vx: number; vy: number;
      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }
      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      if (!isPaused.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
          particles[i].update(canvas.width, canvas.height);
          particles[i].draw();
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('scroll-start'));
    const target = document.querySelector('#about');
    target?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => window.dispatchEvent(new CustomEvent('scroll-end')), 1000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background Layer 0: Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-60 no-print" />
      
      {/* Background Layer 1: Glow Blobs */}
      <div ref={glow1Ref} className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] no-print will-change-transform" />
      <div ref={glow2Ref} className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-accent-bright/5 rounded-full blur-[100px] no-print will-change-transform" />
      
      {/* Background Layer 2: Decorative Geometric Shapes (Parallax) */}
      <div ref={decor1Ref} className="absolute top-20 right-[15%] w-64 h-64 border border-accent/20 rounded-full no-print pointer-events-none will-change-transform hidden lg:block" style={{clipPath: 'circle(50% at 50% 50%)'}}>
        <div className="absolute inset-0 border-t-2 border-accent/40 rounded-full animate-spin-slow"></div>
      </div>
      
      <div ref={decor2Ref} className="absolute bottom-[20%] left-[10%] space-y-4 no-print pointer-events-none will-change-transform hidden md:block opacity-30">
        <div className="w-3 h-3 bg-accent rounded-full blur-sm"></div>
        <div className="w-2 h-2 bg-accent-bright rounded-full ml-12 blur-sm"></div>
        <div className="w-4 h-4 border border-accent rounded-full ml-6"></div>
      </div>

      {/* Main Content Layer */}
      <div ref={contentRef} className="max-w-4xl text-center z-10 will-change-transform">
        <p className="text-accent dark:text-accent-bright text-lg tracking-[0.3em] uppercase mb-4 animate-fade-in no-print font-bold">Welcome to my digital space</p>
        <h1 className="font-bebas text-7xl md:text-9xl mb-6 leading-none tracking-tighter">
          <span className="block text-gray-900 dark:text-white transition-colors uppercase">MATTHEWS</span>
          <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-bright">THEKISO</span>
        </h1>
        <h2 className="text-2xl md:text-4xl font-light text-gray-700 dark:text-gray-300 mb-10 h-10 transition-colors uppercase tracking-widest">{displayText}<span className="animate-ping text-accent">|</span></h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 no-print">
          <a onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('scroll-start')); document.querySelector('#projects')?.scrollIntoView({behavior: 'smooth'}); setTimeout(() => window.dispatchEvent(new CustomEvent('scroll-end')), 1000); }} href="#projects" className="px-10 py-4 bg-accent text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl">View Projects</a>
          
          {/* Activated Resume Download Link */}
          <a 
            href="resume.pdf" 
            download="Matthews_Thekiso_Resume.pdf"
            className="flex items-center gap-2 px-10 py-4 border border-gray-300 dark:border-white/20 hover:border-accent rounded-full transition-all text-gray-800 dark:text-white group"
          >
            <FileText size={20} className="group-hover:text-accent transition-colors" /> Download Resume
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <a onClick={handleScrollDown} href="#about" className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-400 dark:text-gray-500 hover:text-accent no-print"><ChevronDown size={32} /></a>
    </section>
  );
};

export default Hero;
