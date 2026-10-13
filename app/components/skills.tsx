"use client";
import { useEffect, useRef } from "react";

const skillCategories = [
  {
    icon: "🎨",
    title: "Design Tools",
    skills: [
      { name: "Figma", pct: 96 },
      { name: "Adobe XD", pct: 88 },
      { name: "Framer", pct: 80 },
      { name: "Protopie", pct: 85 },
    ],
  },
  {
    icon: "🔬",
    title: "UX Process",
    skills: [
      { name: "User Research", pct: 92 },
      { name: "Usability Testing", pct: 89 },
      { name: "Information Architecture", pct: 87 },
      { name: "Design Thinking", pct: 94 },
    ],
  },
  {
    icon: "💻",
    title: "Tech & Collaboration",
    skills: [
      { name: "HTML / CSS Basics", pct: 75 },
      { name: "Jira / Agile", pct: 83 },
      { name: "Notion / Confluence", pct: 90 },
      { name: "Miro / FigJam", pct: 88 },
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal card
            entry.target.classList.add("visible");
            // Animate skill bars inside
            entry.target.querySelectorAll<HTMLElement>(".skill-fill").forEach((bar) => {
              const w = bar.dataset.width;
              setTimeout(() => {
                bar.style.width = w + "%";
              }, 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="py-28 relative"
      ref={sectionRef}
      style={{ borderTop: "1px solid var(--glass-border)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span
            className="inline-block px-5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.3)",
              color: "var(--purple-light)",
            }}
          >
            Keahlian
          </span>
          <h2
            className="font-[family-name:var(--font-outfit)] font-extrabold"
            style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--text-primary)", lineHeight: 1.2 }}
          >
            Apa yang Saya{" "}
            <span className="gradient-text">Kuasai</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((cat, ci) => (
            <div key={ci} className="glass-card p-8 reveal">
              <h3
                className="font-[family-name:var(--font-outfit)] font-bold text-base mb-6 flex items-center gap-2.5"
                style={{ color: "var(--text-primary)" }}
              >
                <span className="text-xl">{cat.icon}</span>
                {cat.title}
              </h3>
              <div className="flex flex-col gap-5">
                {cat.skills.map((skill, si) => (
                  <div key={si}>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span style={{ color: "var(--text-primary)" }}>{skill.name}</span>
                      <span style={{ color: "var(--purple-light)", fontWeight: 600 }}>{skill.pct}%</span>
                    </div>
                    <div
                      className="h-1 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      <div
                        className="skill-fill"
                        data-width={skill.pct}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
