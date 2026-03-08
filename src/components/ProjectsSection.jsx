import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern shopping experience with real-time inventory, Stripe payments, and a beautiful product catalog.",
    tags: ["React", "Node.js", "Stripe"],
    color: "hsl(20 80% 52% / 0.1)",
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool with drag-and-drop boards, real-time updates, and team analytics.",
    tags: ["JavaScript", "Next.js", "PostgreSQL"],
    color: "hsl(200 60% 50% / 0.1)",
  },
  {
    title: "Weather Dashboard",
    description: "Beautiful weather visualization with interactive maps, 7-day forecasts, and location-based alerts.",
    tags: ["React", "D3.js", "API"],
    color: "hsl(150 50% 45% / 0.1)",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm text-primary mb-2 tracking-wider">02 — Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16">Selected work</h2>
        </motion.div>

        <div className="grid gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-8 md:p-10 rounded-2xl bg-card border border-border transition-all duration-300 cursor-pointer"
              style={{ boxShadow: "var(--card-shadow)" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow)")}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4 max-w-xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 text-muted-foreground">
                  <Github className="h-5 w-5 hover:text-foreground transition-colors cursor-pointer" />
                  <ExternalLink className="h-5 w-5 hover:text-foreground transition-colors cursor-pointer" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
