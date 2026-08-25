import * as React from "react";

import { cn } from "@/lib/utils";

type MouseGravity = "attract" | "repel";
type GlowAnimation = "instant" | "ease" | "spring";

type GravityStarsProps = {
  starsCount?: number;
  starsSize?: number;
  starsOpacity?: number;
  glowIntensity?: number;
  glowAnimation?: GlowAnimation;
  movementSpeed?: number;
  mouseInfluence?: number;
  mouseGravity?: MouseGravity;
  gravityStrength?: number;
} & React.ComponentProps<"div">;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  glow: number;
  glowVelocity: number;
};

function GravityStarsBackground({
  starsCount = 75,
  starsSize = 2,
  starsOpacity = 0.75,
  glowIntensity = 15,
  glowAnimation = "ease",
  movementSpeed = 0.3,
  mouseInfluence = 100,
  mouseGravity = "attract",
  gravityStrength = 75,
  className,
  ...props
}: GravityStarsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationRef = React.useRef<number | null>(null);
  const particlesRef = React.useRef<Particle[]>([]);
  const pointerRef = React.useRef({ x: -1000, y: -1000, active: false });
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(query.matches);

    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  React.useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 1;
    let height = 1;
    let dpr = 1;

    const createParticles = () => {
      particlesRef.current = Array.from({ length: starsCount }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = movementSpeed * (0.5 + Math.random() * 0.5);

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * starsSize + 0.65,
          opacity: starsOpacity,
          glow: 1,
          glowVelocity: 0,
        };
      });
    };

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        active: true,
      };
    };

    const clearPointer = () => {
      pointerRef.current.active = false;
    };

    const updateParticles = () => {
      const pointer = pointerRef.current;

      for (const particle of particlesRef.current) {
        let targetGlow = 1;

        if (pointer.active) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy);

          if (distance > 0 && distance < mouseInfluence) {
            const force = (mouseInfluence - distance) / mouseInfluence;
            const direction = mouseGravity === "attract" ? 1 : -1;
            const gravity = force * gravityStrength * 0.001 * direction;

            particle.vx += (dx / distance) * gravity;
            particle.vy += (dy / distance) * gravity;
            particle.opacity = Math.min(1, starsOpacity + force * 0.35);
            targetGlow = 1 + force * 1.8;
          } else {
            particle.opacity += (starsOpacity - particle.opacity) * 0.08;
          }
        } else {
          particle.opacity += (starsOpacity - particle.opacity) * 0.08;
        }

        if (glowAnimation === "instant") {
          particle.glow = targetGlow;
        } else if (glowAnimation === "spring") {
          particle.glowVelocity =
            particle.glowVelocity * 0.86 + (targetGlow - particle.glow) * 0.18;
          particle.glow = Math.max(1, particle.glow + particle.glowVelocity);
        } else {
          particle.glow += (targetGlow - particle.glow) * 0.1;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.998;
        particle.vy *= 0.998;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
      }
    };

    const drawParticles = () => {
      context.clearRect(0, 0, width, height);
      const color = getComputedStyle(container).color || "#ffffff";

      for (const particle of particlesRef.current) {
        context.save();
        context.globalAlpha = particle.opacity;
        context.fillStyle = color;
        context.shadowColor = color;
        context.shadowBlur = glowIntensity * particle.glow;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", clearPointer);

    if (reduceMotion) {
      drawParticles();
    } else {
      animationRef.current = window.requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      document.documentElement.removeEventListener("pointerleave", clearPointer);
    };
  }, [
    glowAnimation,
    glowIntensity,
    gravityStrength,
    mouseGravity,
    mouseInfluence,
    movementSpeed,
    reduceMotion,
    starsCount,
    starsOpacity,
    starsSize,
  ]);

  return (
    <div
      ref={containerRef}
      data-slot="gravity-stars-background"
      className={cn("overflow-hidden", className)}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export { GravityStarsBackground, type GravityStarsProps };
