import { useEffect, useRef, useCallback } from "react";

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animationFrame = useRef(null);

  const createParticle = (x, y, burst = false) => {
    const count = burst ? 12 : 1;
    for (let i = 0; i < count; i++) {
      const angle = burst ? (Math.PI * 2 * i) / count : Math.random() * Math.PI * 2;
      const speed = burst ? 2 + Math.random() * 3 : 0.3 + Math.random() * 0.5;
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: burst ? 2 + Math.random() * 3 : 1.5 + Math.random() * 2,
        alpha: 1,
        decay: burst ? 0.015 + Math.random() * 0.01 : 0.005 + Math.random() * 0.003,
        hue: 20 + Math.random() * 15,
      });
    }
  };

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Seed some ambient particles
    for (let i = 0; i < 40; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 1 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.3,
        decay: 0,
        hue: 20 + Math.random() * 15,
        ambient: true,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    init();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (Math.random() > 0.5) {
        createParticle(e.clientX, e.clientY);
      }
    };

    const handleClick = (e) => {
      createParticle(e.clientX, e.clientY, true);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => {
        // Mouse repulsion for ambient particles
        if (p.ambient) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            p.vx -= (dx / dist) * force * 0.15;
            p.vy -= (dy / dist) * force * 0.15;
          }
          // Damping
          p.vx *= 0.98;
          p.vy *= 0.98;
          // Wrap around
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (!p.ambient) {
          p.alpha -= p.decay;
          p.vx *= 0.99;
          p.vy *= 0.99;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 55%, ${p.alpha})`;
        ctx.fill();

        return p.ambient || p.alpha > 0;
      });

      // Draw connections between close ambient particles
      const ambient = particles.current.filter((p) => p.ambient);
      for (let i = 0; i < ambient.length; i++) {
        for (let j = i + 1; j < ambient.length; j++) {
          const dx = ambient[i].x - ambient[j].x;
          const dy = ambient[i].y - ambient[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(ambient[i].x, ambient[i].y);
            ctx.lineTo(ambient[j].x, ambient[j].y);
            ctx.strokeStyle = `hsla(20, 80%, 55%, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ pointerEvents: "all" }}
    />
  );
};

export default InteractiveBackground;
