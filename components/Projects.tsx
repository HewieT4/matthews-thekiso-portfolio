
import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../constants';
import { ProjectCategory } from '../types';
import { ExternalLink, Github } from 'lucide-react';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>(ProjectCategory.ALL);

  const filteredProjects = useMemo(() => {
    return activeFilter === ProjectCategory.ALL 
      ? PROJECTS 
      : PROJECTS.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  const filters = Object.values(ProjectCategory);

  const handleFilterClick = (e: React.MouseEvent, filter: ProjectCategory) => {
    e.preventDefault();
    setActiveFilter(filter);
  };

  return (
    <section id="projects" className="py-24 px-6 reveal">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h3 className="text-accent font-semibold tracking-widest uppercase mb-2">Selected Work</h3>
            <h2 className="font-bebas text-5xl md:text-7xl">Project Showcase</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={(e) => handleFilterClick(e, filter)}
                className={`px-6 py-2 rounded-full border transition-all ${
                  activeFilter === filter 
                    ? 'bg-accent border-accent text-white' 
                    : 'border-white/10 hover:border-accent dark:text-gray-400 text-gray-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 dark:hover:border-accent/50 hover:border-accent transition-all">
              <div className="aspect-video overflow-hidden bg-gray-900">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-90"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-accent-bright text-sm uppercase tracking-widest mb-2 block">{project.category}</span>
                    <h4 className="text-3xl font-bold mb-3">{project.title}</h4>
                  </div>
                  <div className="flex gap-4">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Github size={22} /></a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><ExternalLink size={22} /></a>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-gray-500 dark:text-gray-400">
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

export default Projects;
