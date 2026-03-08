const Footer = () => (
  <footer className="py-8 border-t border-border">
    <div className="container mx-auto px-6 text-center">
      <p className="text-sm text-muted-foreground font-mono">
        © {new Date().getFullYear()} portfolio. Built with React & TypeScript.
      </p>
    </div>
  </footer>
);

export default Footer;
