import { Button } from "./ui/button"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
        Hi, I'm <span className="text-primary">Pranav Tripathi</span>
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-8">Full Stack Developer & UI/UX Designer</p>
      <div className="flex gap-4">
        <Button asChild>
          <a href="#contact">Get in Touch</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="#projects">View Projects</a>
        </Button>
      </div>
      <a href="#about" className="absolute bottom-8 animate-bounce" aria-label="Scroll to About section">
        <ArrowDown className="h-6 w-6" />
      </a>
    </section>
  )
}

