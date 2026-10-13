"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  desc: string;
  image: string;
  alt: string;
  tags: string[];
  category: "mobile" | "web" | "research";
  meta: string[];
  featured?: boolean;
  isResearch?: boolean;
  researchMetrics?: { val: string; label: string }[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "PayFlow — Fintech App",
    desc: "Aplikasi pembayaran digital yang dirancang ulang untuk meningkatkan konversi sebesar 40% melalui UX yang disederhanakan dan alur onboarding baru.",
    image: "/project-fintech.jpg",
    alt: "PayFlow Fintech App Design",
    tags: ["Mobile App", "Fintech"],
    category: "mobile",
    meta: ["📱 iOS & Android", "⏱ 8 minggu"],
  },
  {
    id: 2,
    title: "ShopNest — Admin Dashboard",
    desc: "Dashboard e-commerce komprehensif dengan visualisasi data real-time, manajemen produk, dan analitik penjualan yang powerful untuk para seller.",
    image: "/project-ecommerce.jpg",
    alt: "ShopNest E-Commerce Dashboard",
    tags: ["Web App", "E-Commerce", "Dashboard"],
    category: "web",
    meta: ["🌐 Web", "⏱ 12 minggu"],
    featured: true,
  },
  {
    id: 3,
    title: "Wanderly — Travel Booking",
    desc: "Platform pemesanan perjalanan dengan pengalaman discovery yang dipersonalisasi, meningkatkan engagement pengguna sebesar 65% dari versi sebelumnya.",
    image: "/project-travel.jpg",
    alt: "Wanderly Travel App",
    tags: ["Mobile App", "Travel"],
    category: "mobile",
    meta: ["📱 iOS", "⏱ 10 minggu"],
  },
  {
    id: 4,
    title: "MediCare — Healthcare UX Audit",
    desc: "Riset UX komprehensif untuk platform telemedicine, mengidentifikasi 23 pain point kritis dan menghasilkan rekomendasi yang terukur dan actionable.",
    image: "",
    alt: "",
    tags: ["UX Research", "Healthcare"],
    category: "research",
    meta: ["🔬 Research", "⏱ 6 minggu"],
    isResearch: true,
    researchMetrics: [
      { val: "+53%", label: "Task Completion" },
      { val: "-38%", label: "Error Rate" },
      { val: "4.8", label: "SUS Score" },
    ],
  },
];

const filters = [
  { label: "Semua", value: "all" },
  { label: "Mobile App", value: "mobile" },
  { label: "Web App", value: "web" },
  { label: "UX Research", value: "research" },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeFilter]);

  return (
    <section
      id="projects"
      className="py-28 relative"
      ref={sectionRef}
      style={{ borderTop: "1px solid var(--glass-border)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span
            className="inline-block px-5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "var(--purple-light)" }}
          >
            Portofolio
          </span>
          <h2
            className="font-[family-name:var(--font-outfit)] font-extrabold mb-3"
            style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--text-primary)", lineHeight: 1.2 }}
          >
            Karya <span className="gradient-text">Terpilih</span>
          </h2>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Beberapa proyek terbaik yang pernah saya kerjakan
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap reveal">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className="px-6 py-2.5 rounded-full border text-sm font-[family-name:var(--font-outfit)] font-semibold cursor-pointer transition-all duration-300"
              style={
                activeFilter === f.value
                  ? {
                      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                      border: "1px solid transparent",
                      color: "white",
                      boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
                    }
                  : {
                      background: "var(--glass-bg)",
                      border: "1px solid var(--glass-border)",
                      color: "var(--text-secondary)",
                      backdropFilter: "blur(10px)",
                    }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="glass-card overflow-hidden p-0 relative reveal group cursor-pointer"
              style={
                project.featured
                  ? { borderColor: "rgba(124,58,237,0.3)", boxShadow: "0 0 30px rgba(124,58,237,0.1)" }
                  : {}
              }
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(124,58,237,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div
                  className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
                >
                  ⭐ Featured
                </div>
              )}

              {/* Image / Research Visual */}
              <div className="relative h-60 overflow-hidden">
                {project.isResearch ? (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.1))" }}
                  >
                    <div className="text-center p-6">
                      <div className="text-5xl mb-3">📊</div>
                      <h4 className="font-[family-name:var(--font-outfit)] font-bold text-white mb-4">
                        Healthcare UX Audit
                      </h4>
                      <div className="flex justify-center gap-6">
                        {project.researchMetrics?.map((m, i) => (
                          <div key={i} className="flex flex-col items-center gap-1">
                            <span className="font-[family-name:var(--font-outfit)] font-extrabold text-2xl gradient-text">
                              {m.val}
                            </span>
                            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                )}

                {/* Overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(6,9,20,0.95) 0%, rgba(6,9,20,0.4) 50%, transparent 100%)" }}
                >
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ background: "rgba(124,58,237,0.7)", backdropFilter: "blur(10px)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2.5 justify-end">
                    {[
                      { icon: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3", label: "Detail" },
                      { icon: "M10 8 16 12 10 16 10 8", isCircle: true, label: "Preview" },
                    ].map((btn, bi) => (
                      <button
                        key={bi}
                        aria-label={btn.label}
                        className="flex items-center justify-center w-10 h-10 rounded-full border text-white cursor-pointer transition-all duration-300 hover:bg-purple-600 hover:border-purple-600"
                        style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(10px)" }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                          {btn.isCircle && <circle cx="12" cy="12" r="10" />}
                          <path d={btn.icon} />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3
                  className="font-[family-name:var(--font-outfit)] font-bold text-lg mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {project.title}
                </h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {project.desc}
                </p>
                <div className="flex gap-4 flex-wrap">
                  {project.meta.map((m, i) => (
                    <span key={i} className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 reveal">
          <button
            className="inline-flex items-center gap-2 px-7 py-3.5 font-[family-name:var(--font-outfit)] font-semibold text-sm rounded-xl border cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              color: "var(--text-primary)",
              backdropFilter: "blur(10px)",
            }}
          >
            Lihat Semua Proyek
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
