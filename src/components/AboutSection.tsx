import { motion } from "framer-motion";
import { Code2, Palette, Zap } from "lucide-react";

const skills = [
  { icon: Code2, title: "Development", description: "React, TypeScript, Node.js, and modern web technologies." },
  { icon: Palette, title: "Design", description: "UI/UX design with attention to detail and accessibility." },
  { icon: Zap, title: "Performance", description: "Optimized, fast-loading applications with great UX." },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm text-primary mb-2 tracking-wider">01 — About</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">A bit about me</h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-16">
            I'm a full-stack developer passionate about building products that make a difference. With years of experience in web development, I focus on writing clean, maintainable code and creating intuitive user interfaces.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border transition-shadow duration-300"
              style={{ boxShadow: "var(--card-shadow)" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow)")}
            >
              <skill.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{skill.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
