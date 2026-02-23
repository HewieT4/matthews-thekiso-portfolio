
import React from 'react';
import AnimatedAvatar from './AnimatedAvatar';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 bg-gray-50 dark:bg-white/5 reveal transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 lg:w-1/3 no-print">
            <div className="relative group">
              {/* Animated glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 to-accent-bright/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
              
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 aspect-[3/4] shadow-2xl bg-black flex items-center justify-center">
                <AnimatedAvatar />
                
                {/* Visual design overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                
                {/* Branding text on image */}
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-30">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white font-bold drop-shadow-lg opacity-80">
                    MT • Portfolio
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 lg:w-2/3">
            <h3 className="text-accent font-semibold tracking-widest uppercase mb-2 no-print">Professional Summary</h3>
            <h2 className="font-bebas text-5xl md:text-6xl mb-6 text-gray-900 dark:text-white transition-colors">About Me</h2>
            <div className="space-y-4 text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                Motivated and detail-oriented IT graduate with a strong foundation in <span className="text-gray-900 dark:text-white font-semibold underline decoration-accent/30">full stack application development</span>, computer hardware, software, and networking fundamentals.
              </p>
              <p>
                As seen in my <span className="text-gray-900 dark:text-white font-semibold italic">FNB App Academy</span> certification, I have mastered UX design, API development, and AI integration within professional contexts.
              </p>
              <p>
                I thrive at the intersection of infrastructure and code, bringing a unique perspective from my <span className="text-gray-900 dark:text-white font-semibold">Cisco</span> networking background to modern application development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
