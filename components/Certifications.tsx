
import React from 'react';
import { CERTIFICATIONS } from '../constants';
import { Award, Trophy } from 'lucide-react';

const CertCard: React.FC<{ cert: any }> = ({ cert }) => {
  return (
    <div className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-accent transition-all bg-white/5 h-[400px]">
      <div className="w-full h-full relative">
        <img 
          src={cert.image} 
          alt={cert.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-40 group-hover:opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-10 pointer-events-none">
        <div className="p-1 px-3 bg-accent/20 border border-accent/30 rounded-full w-fit mb-4">
          <span className="text-[10px] text-accent-bright font-bold uppercase tracking-widest">Validated Achievement</span>
        </div>
        <h4 className="text-3xl font-bold mb-2 leading-tight group-hover:text-accent-bright transition-colors">{cert.name}</h4>
        <p className="text-gray-400 font-medium text-lg">{cert.issuer}</p>
        <p className="text-accent font-mono text-sm mt-3 tracking-wider">{cert.year}</p>
        <div className="h-1 w-0 group-hover:w-24 bg-accent mt-4 transition-all duration-500"></div>
      </div>
    </div>
  );
};

const Certifications: React.FC = () => {
  return (
    <section className="py-24 px-6 reveal">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-accent font-semibold tracking-widest uppercase mb-2">Qualifications</h3>
          <h2 className="font-bebas text-5xl md:text-7xl">Certifications</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CERTIFICATIONS.map((cert, idx) => (
            <CertCard key={idx} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
