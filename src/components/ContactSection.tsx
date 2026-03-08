import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="font-mono text-sm text-primary mb-2 tracking-wider">03 — Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Let's work together</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            I'm always open to new opportunities and interesting projects. Feel free to reach out!
          </p>

          <div className="flex flex-col items-center gap-4 mb-10">
            <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
              <span className="font-mono text-sm">hello@example.com</span>
            </a>
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span className="font-mono text-sm">San Francisco, CA</span>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
