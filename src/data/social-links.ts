import { Github, Linkedin, Twitter, Mail, Newspaper } from "lucide-react";

export const socialLinks = [
  {
    isNewBlog: true,
    name: "Blogs",
    href: "https://blogs.pranavtripathi.me",
    icon: Newspaper,
  },
  {
    name: "GitHub",
    href: "https://github.com/prnvtripathi",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/tripathipranav14",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/prnvtwts",
    icon: Twitter,
  },
  {
    name: "Email",
    href: "mailto:tripathipranav14@gmail.com",
    icon: Mail,
  },
];

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className: string }>;
}
