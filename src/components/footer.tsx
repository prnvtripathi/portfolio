import Link from "next/link";
import { Button } from "./ui/button";
import { socialLinks } from "@/data/social-links";

function Footer() {
  return (
    <footer className="flex md:hidden justify-center items-center gap-4 py-4 border-t mt-auto">
      {socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="icon" aria-label={link.name}>
            <link.icon className="h-5 w-5" />
          </Button>
        </Link>
      ))}
    </footer>
  );
}

export default Footer;
