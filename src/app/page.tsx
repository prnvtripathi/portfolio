import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { ExperienceSection } from "@/components/experience-section"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"

export default function Home() {
  return (
    <div className="mx-auto max-w-[720px] px-8">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}

