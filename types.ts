
export enum ProjectCategory {
  ALL = 'All',
  WEB_APPS = 'Web Apps',
  UI_UX = 'UI/UX',
  NETWORKING = 'Networking'
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  github: string;
  demo: string;
}

export interface Skill {
  name: string;
  percentage: number;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  image: string;
}
