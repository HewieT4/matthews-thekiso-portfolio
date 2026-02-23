
import { Project, ProjectCategory, Skill, Testimonial, Certification } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI Resume Analyzer",
    description: "An intelligent tool leveraging AI to provide real-time feedback and optimization suggestions for professional resumes, helping candidates stand out.",
    category: ProjectCategory.WEB_APPS,
    tags: ["React", "AI Integration", "Tailwind CSS", "TypeScript"],
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000",
    github: "https://github.com",
    demo: "https://ai-resume-analyzer-ten-ashy.vercel.app/"
  },
  {
    id: 2,
    title: "Angels World Website",
    description: "A responsive and modern business website built for Angels World, featuring service catalogs and a user-friendly interface.",
    category: ProjectCategory.WEB_APPS,
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=1000",
    github: "https://github.com/HewieT4/Angels-World-Day-Care-Aftercare",
    demo: "https://angels-world-day-care-aftercare.netlify.app/"
  },
  {
    id: 3,
    title: "Network Monitor Dashboard",
    description: "A custom networking dashboard designed to monitor traffic and server status, reflecting expertise in infrastructure.",
    category: ProjectCategory.NETWORKING,
    tags: ["Cisco", "Networking", "Python", "SNMP"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 4,
    title: "UI/UX Portfolio Design",
    description: "The design system and layout architecture for this very portfolio, focused on bold typography and high-contrast accessibility.",
    category: ProjectCategory.UI_UX,
    tags: ["Figma", "UX Design", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1000",
    github: "https://github.com",
    demo: "https://demo.com"
  }
];

export const SKILLS: Skill[] = [
  { name: "Full Stack", percentage: 90, icon: "⚡" },
  { name: "Cisco Networking", percentage: 95, icon: "🌐" },
  { name: "UI/UX Design", percentage: 80, icon: "🎨" },
  { name: "API Dev", percentage: 85, icon: "🔌" },
  { name: "SDLC", percentage: 95, icon: "🔄" },
  { name: "AI in Dev", percentage: 80, icon: "🤖" }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Harry Mofoka",
    role: "Senior Developer",
    content: "Matthews is a brilliant problem solver. His attention to detail in both networking and code is remarkable.",
    avatar: "https://picsum.photos/seed/p1/100/100"
  },
  {
    name: "Katleho Matsabu",
    role: "UI Designer",
    content: "Working with Matthews on UI implementations was a breeze. He understands the 'why' behind the design.",
    avatar: "https://picsum.photos/seed/p2/100/100"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Certificate in Full Stack Development",
    issuer: "FNB App Academy (IT Varsity)",
    year: "22 July 2025 • 32 Credits • Student: 688006BB41BFB • No: AOTYAA072025",
    image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=1000"
  },
  {
    name: "IT Essentials: PC Hardware and Software",
    issuer: "Cisco Networking Academy",
    year: "16 Jan 2025 • Completion Date",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000"
  }
];

export const EDUCATION = [
  {
    degree: "Higher National Diploma, IT & Computer Science",
    institution: "Sedibeng TVET College",
    period: "Jan 2022 - Jan 2026",
  },
  {
    degree: "Grade 12",
    institution: "Suiderlig Highschool",
    period: "2021",
  }
];
