// Blog related types
export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  publishedAt: string; // Alias for date
  description: string;
  brief: string; // Alias for description
  content?: string;
  tags?: string[];
  coverImage?: {
    url: string;
    alt?: string;
  };
  readTime?: number;
  url: string;
  source?: "local" | "hashnode";
}

export interface BlogListProps {
  posts: BlogPost[];
  showAll?: boolean;
}

export interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export interface BlogsPageClientProps {
  posts: BlogPost[];
  error?: string;
}

export interface HashnodePost {
  title: string;
  brief: string;
  url: string;
  publishedAt: string;
  coverImage: {
    url: string;
  };
  tags?: string[];
}
