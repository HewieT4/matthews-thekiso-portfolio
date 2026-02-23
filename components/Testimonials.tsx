
import React, { useState } from 'react';
import { TESTIMONIALS } from '../constants';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-white/5 reveal transition-colors">
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-12">
           <Quote className="text-accent mx-auto mb-6 opacity-40" size={48} />
           <h2 className="font-bebas text-5xl md:text-6xl mb-4 text-gray-900 dark:text-white">Testimonials</h2>
        </div>

        <div className="relative overflow-hidden min-h-[350px]">
          {TESTIMONIALS.map((test, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-all duration-700 flex flex-col items-center text-center ${
                idx === current ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 pointer-events-none'
              }`}
            >
              <p className="text-2xl italic text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl px-4">
                "{test.content}"
              </p>
              <img src={test.avatar} alt={test.name} className="w-20 h-20 rounded-full mb-4 border-2 border-accent object-cover shadow-lg" />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">{test.name}</h4>
              <p className="text-accent-bright font-bold uppercase tracking-widest text-sm">{test.role}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 mt-12 no-print">
          <button onClick={prev} className="p-4 border border-gray-200 dark:border-white/10 rounded-full hover:bg-accent hover:text-white dark:hover:bg-accent transition-all text-gray-900 dark:text-white">
            <ChevronLeft />
          </button>
          <button onClick={next} className="p-4 border border-gray-200 dark:border-white/10 rounded-full hover:bg-accent hover:text-white dark:hover:bg-accent transition-all text-gray-900 dark:text-white">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
