import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export function ExperienceSection() {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2021 - Present",
      description:
        "Lead the frontend development team in building a SaaS platform. Implemented new features, improved performance, and mentored junior developers.",
      technologies: ["React", "TypeScript", "Next.js", "GraphQL"],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      period: "2018 - 2021",
      description:
        "Developed and maintained multiple web applications. Collaborated with designers and product managers to deliver high-quality software solutions.",
      technologies: ["Vue.js", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "Web Developer",
      company: "Creative Agency",
      period: "2016 - 2018",
      description:
        "Created responsive websites for clients across various industries. Worked closely with the design team to implement pixel-perfect designs.",
      technologies: ["JavaScript", "HTML/CSS", "WordPress", "PHP"],
    },
  ]

  return (
    <section id="experience" className="py-16">
      <h2 className="section-heading">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{exp.title}</CardTitle>
                  <CardDescription>{exp.company}</CardDescription>
                </div>
                <span className="text-sm text-muted-foreground">{exp.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

