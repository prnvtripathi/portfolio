import { Mail, Newspaper } from "lucide-react";
import { SiPeerlist } from "react-icons/si";
import { FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";

export const socialLinks = [
  {
    isNewBlog: false,
    name: "Blogs",
    href: "https://blogs.pranavtripathi.me",
    icon: Newspaper,
  },
  {
    name: "GitHub",
    href: "https://github.com/prnvtripathi",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/tripathipranav14",
    icon: FaLinkedinIn,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/prnvtwts",
    icon: FaXTwitter,
  },
  {
    name: "Peerlist",
    href: "https://peerlist.com/pranavtripathi",
    icon: SiPeerlist,
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
