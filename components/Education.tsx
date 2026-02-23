
import React from 'react';
import { EDUCATION } from '../constants';
import { GraduationCap } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-6 reveal">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-accent font-semibold tracking-widest uppercase mb-2">Academics</h3>
          <h2 className="font-bebas text-5xl md:text-7xl">Education</h2>
        </div>

        <div className="space-y-8">
          {EDUCATION.map((edu, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-accent transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-2xl text-accent group-hover:scale-110 transition-transform">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold">{edu.degree}</h4>
                    <p className="text-accent-bright font-medium">{edu.institution}</p>
                  </div>
                </div>
                <div className="text-gray-500 font-mono text-sm px-4 py-1 bg-white/5 rounded-full self-start md:self-center">
                  {edu.period}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
