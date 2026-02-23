
import React from 'react';
import { SKILLS } from '../constants';

const SkillCircle: React.FC<{ name: string; percentage: number; icon: string }> = ({ name, percentage, icon }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-32 h-32 flex items-center justify-center mb-4">
        <svg className="w-full h-full transform -rotate-90">
          <circle 
            cx="64" cy="64" r={radius}
            className="stroke-gray-100 dark:stroke-white/5 fill-none"
            strokeWidth="8"
          />
          <circle 
            cx="64" cy="64" r={radius}
            className="stroke-accent fill-none transition-all duration-1000 ease-out"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center group-hover:scale-110 transition-transform">
          <span className="text-2xl">{icon}</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">{percentage}%</span>
        </div>
      </div>
      <h4 className="text-lg font-bold text-gray-700 dark:text-gray-300 text-center transition-colors">{name}</h4>
    </div>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 reveal transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-accent font-semibold tracking-widest uppercase mb-2">My Toolkit</h3>
          <h2 className="font-bebas text-5xl md:text-7xl text-gray-900 dark:text-white transition-colors">Skills & Expertise</h2>
        </div>
        <div className="marquee-container">
          <div className="marquee-content">
            {[...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS].map((skill, index) => (
              <SkillCircle key={`${skill.name}-${index}`} {...skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
