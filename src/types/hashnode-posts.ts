export interface Post {
  title: string;
  brief: string;
  url: string;
  publishedAt: string;
  coverImage: {
    url: string;
  };
  tags?: string[];
}
