import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

export function ProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform built with Next.js, Stripe, and Sanity CMS.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Next.js", "Stripe", "Sanity", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["React", "Firebase", "Material UI", "Redux"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Personal Finance Dashboard",
      description: "A dashboard for tracking personal finances with data visualization.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Vue.js", "D3.js", "Express", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  return (
    <section id="projects" className="py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="section-heading">Featured Projects</h2>
        <Button variant="outline" asChild>
          <Link href="/projects">
            View All Projects
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.title} className="overflow-hidden flex flex-col h-full">
            <div className="relative h-48 w-full">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button asChild variant="default" size="sm">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-1 h-4 w-4" />
                  Code
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

