"use client";
import { useEffect, useRef } from "react";

const COLORS = ["#a78bfa", "#67e8f9", "#f0abfc", "#818cf8"];

export default function BackgroundEffects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Cursor glow
  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.left = `${glowX}px`;
        glowRef.current.style.top = `${glowY}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Particles
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    for (let i = 0; i < 40; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
        animation-duration: ${Math.random() * 15 + 10}s;
        animation-delay: ${Math.random() * 20}s;
      `;
      container.appendChild(p);
    }
    return () => { container.innerHTML = ""; };
  }, []);

  return (
    <>
      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-0"
        style={{
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.3s",
        }}
      />
      {/* Particles */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      />
    </>
  );
}
