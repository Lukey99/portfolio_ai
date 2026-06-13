export interface Language {
  name: string;
  level: string;
}

export interface Interest {
  name: string;
  description: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  languages: Language[];
  interests: Interest[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  type: 'full-time' | 'apprenticeship' | 'entrepreneur';
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  specialization?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

export interface Portfolio {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
}
