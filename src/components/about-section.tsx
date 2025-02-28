import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

export function AboutSection() {
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "UI/UX Design",
    "Figma",
    "Git",
  ]

  return (
    <section id="about" className="py-16">
      <h2 className="section-heading">About Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-4">
            I'm a passionate full-stack developer with a focus on creating beautiful, functional, and user-friendly
            applications. With over 5 years of experience in web development, I specialize in building modern web
            applications using React, Next.js, and Node.js.
          </p>
          <p className="text-lg mb-4">
            My journey in tech started when I built my first website at 15. Since then, I've worked with startups and
            established companies to deliver high-quality software solutions that solve real-world problems.
          </p>
          <p className="text-lg">
            When I'm not coding, you can find me hiking, reading sci-fi novels, or experimenting with new technologies.
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

