import Link from "next/link";
import { Button } from "./ui/button";
import { socialLinks } from "@/data/social-links";

function Footer() {
  return (
    <footer className="mx-auto flex max-w-[720px] flex-col gap-6 px-8 pb-12 pt-13">
      <div className="flex justify-center gap-4 border-t border-border pt-6 md:hidden">
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
      </div>
      <p className="text-right font-mono text-[11px] tracking-wide text-muted-foreground">
        © {new Date().getFullYear()} Pranav Tripathi
      </p>
    </footer>
  );
}

export default Footer;
