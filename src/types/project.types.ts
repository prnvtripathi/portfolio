// Project related types

export interface Project {
  id: string | number;
  title: string;
  name?: string; // Alias for title
  description: string;
  tags: string[];
  skills?: string[]; // Alias for tags
  image: string;
  imageUrl?: string; // Alias for image
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  date?: string;
  content?: string;
}

export interface ProjectListProps {
  projects: Project[];
  showAll?: boolean;
}

export interface ProjectCardProps {
  project: Project;
  className?: string;
}
