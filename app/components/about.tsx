"use client";
import { useEffect, useRef } from "react";

const tools = ["Figma", "Adobe XD", "Protopie", "Maze", "Miro", "Notion", "Lottie", "Framer"];
const cards = [
  { icon: "🔬", title: "UX Research", desc: "User interview, usability testing, dan analisis data untuk keputusan desain berbasis bukti." },
  { icon: "🎨", title: "UI Design", desc: "Merancang antarmuka visual yang bersih, konsisten, dan menyenangkan untuk digunakan." },
  { icon: "⚡", title: "Prototyping", desc: "Prototipe interaktif high-fidelity untuk validasi ide sebelum development dimulai." },
  { icon: "📐", title: "Design System", desc: "Membangun sistem desain yang skalabel untuk konsistensi produk jangka panjang." },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-28 relative" ref={sectionRef}>
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 -left-52 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          transform: "translateY(-50%)",
        }}
      />

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
            Tentang Saya
          </span>
          <h2
            className="font-[family-name:var(--font-outfit)] font-extrabold mb-3"
            style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--text-primary)", lineHeight: 1.2 }}
          >
            Desainer yang{" "}
            <span className="gradient-text">Berpikir</span>{" "}
            seperti Pengguna
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div className="reveal">
            <p
              className="text-lg font-medium mb-5 leading-relaxed"
              style={{ color: "var(--text-primary)" }}
            >
              Halo! Saya{" "}
              <span className="gradient-text font-bold">Putri Egii</span>,
              seorang UI/UX Designer berprestasi berdomisili di Jakarta dengan
              pengalaman merancang produk digital dari startup hingga enterprise.
            </p>
            <p className="mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Saya percaya bahwa desain yang baik bukan hanya tentang estetika —
              melainkan tentang{" "}
              <strong style={{ color: "var(--purple-light)" }}>
                memecahkan masalah nyata
              </strong>{" "}
              pengguna dengan cara yang paling elegan dan efisien. Setiap keputusan
              desain saya didasarkan pada riset mendalam dan empati terhadap pengguna.
            </p>
            <p className="mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Saya lulus dengan{" "}
              <strong style={{ color: "var(--teal-light)" }}>IPK 4.0 (Cum Laude) 🎓</strong>{" "}
              — bukti bahwa saya tidak hanya kreatif, tapi juga tekun dan berdedikasi
              tinggi dalam setiap hal yang saya kerjakan.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Di luar layar, saya senang menjelajahi kafe estetik, mengikuti tren
              desain global, dan sesekali menulis artikel tentang Design Thinking.
            </p>
            {/* Tools */}
            <div className="flex flex-wrap gap-2.5 mt-7">
              {tools.map((t) => (
                <span
                  key={t}
                  className="tool-tag px-4 py-1.5 rounded-full text-xs font-medium cursor-default"
                  style={{
                    background: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.2)",
                    color: "var(--purple-light)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-4">
            {cards.map((c, i) => (
              <div key={i} className="glass-card p-7 reveal">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3
                  className="font-[family-name:var(--font-outfit)] font-bold text-base mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {c.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
