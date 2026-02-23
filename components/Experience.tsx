
import React from 'react';

const Experience: React.FC = () => {
  const experiences = [
    {
      title: "Full-stack Developer - Internship",
      company: "FNB App Academy (IT Varsity)",
      period: "Mar 2025 - July 2025",
      description: "Focusing on Full Stack App Development, APIs, Backend Development, and UX Design.",
      points: [
        "Developing full-stack applications using modern technologies and frameworks",
        "Implementing RESTful APIs and backend services",
        "Applying UX design principles to create user-centric applications",
        "Integrating AI capabilities into development projects",
        "Collaborating with team members using version control systems"
      ],
      tags: ["Full Stack", "APIs", "UX Design", "AI Integration"]
    },
    {
      title: "Network Administrator - Cisco Networking Academy",
      company: "Cisco",
      period: "Jan 2024 - Jan 2025",
      description: "Successfully completed the IT Essentials course and achieved student-level credential.",
      points: [
        "Demonstrated foundation knowledge in computer hardware and software",
        "Mastered advanced concepts such as security, networking, and troubleshooting",
        "Maintained network infrastructure and implemented security protocols"
      ],
      tags: ["IT Essentials", "Networking", "Security", "Hardware"]
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-white dark:bg-white/5 reveal transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-accent font-semibold tracking-widest uppercase mb-2">Work History</h3>
          <h2 className="font-bebas text-5xl md:text-7xl text-gray-900 dark:text-white">Experience</h2>
        </div>

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div key={index} className="flex gap-8 group relative">
              <div className="flex flex-col items-center no-print">
                <div className="w-4 h-4 rounded-full bg-accent shadow-[0_0_15px_rgba(99,102,241,0.8)] group-hover:scale-150 transition-transform"></div>
                <div className="w-0.5 h-full bg-gradient-to-b from-accent to-transparent"></div>
              </div>
              <div className="pb-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                  <h4 className="text-3xl font-bold text-gray-900 dark:text-white">{exp.title}</h4>
                  <span className="text-accent-bright font-mono text-sm px-4 py-1 bg-accent/10 rounded-full">{exp.period}</span>
                </div>
                <div className="text-gray-700 dark:text-white font-medium mb-4 text-xl italic">{exp.company}</div>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">{exp.description}</p>
                <ul className="space-y-3 mb-8">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-300">
                      <span className="text-accent mt-1.5">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3 no-print">
                  {exp.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
