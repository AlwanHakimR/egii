"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const roles = [
  "UI/UX Designer",
  "Product Designer",
  "Design Thinker",
  "Creative Problem Solver",
];

function useCountUp(target: number, isVisible: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);
  return count;
}

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("UI/UX Designer");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(16);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const projects = useCountUp(48, statsVisible);
  const years = useCountUp(4, statsVisible);
  const clients = useCountUp(32, statsVisible);

  // Typing effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.substring(0, charIndex));
        setCharIndex((c) => c + 1);
      }, charIndex === current.length ? 2500 : 100);
    } else if (!isDeleting && charIndex > current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 100);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.substring(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 60);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
        setCharIndex(0);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // Stats observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Avatar parallax
  const avatarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!avatarRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      avatarRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };
    const handleLeave = () => {
      if (avatarRef.current) avatarRef.current.style.transform = "";
    };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16 px-6 lg:px-20 pt-28 pb-20 max-w-[1400px] mx-auto relative"
    >
      {/* ── LEFT: Content ── */}
      <div className="order-2 lg:order-1">
        {/* Badge */}
        <div className="animate-fadeSlideUp inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
          style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)", color: "#67e8f9" }}>
          <span className="w-2 h-2 rounded-full bg-cyan-400"
            style={{ animation: "pulse-dot 2s infinite", boxShadow: "0 0 0 0 rgba(6,182,212,0.4)" }} />
          Tersedia untuk freelance
        </div>

        {/* Title */}
        <h1
          className="animate-fadeSlideUp-1 font-[family-name:var(--font-outfit)] font-black leading-[1.1] mb-5"
          style={{ fontSize: "clamp(2.2rem,5vw,4rem)", color: "var(--text-primary)" }}
        >
          Saya{" "}
          <span className="gradient-text">Putri Egii Hapsa Andarista, S.Tr.Kom</span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>{displayed}</span>
          <span className="cursor-blink">|</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fadeSlideUp-2 text-lg mb-9 max-w-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Mengubah ide kompleks menjadi pengalaman digital yang{" "}
          <em className="not-italic font-semibold" style={{ color: "var(--purple-light)" }}>indah</em>,{" "}
          <em className="not-italic font-semibold" style={{ color: "var(--purple-light)" }}>intuitif</em>, dan{" "}
          <em className="not-italic font-semibold" style={{ color: "var(--purple-light)" }}>berdampak</em>.
          Saya mendesain produk yang dicintai pengguna.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fadeSlideUp-3 flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => scrollTo("projects")}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-[family-name:var(--font-outfit)] font-semibold text-sm rounded-xl border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(124,58,237,0.4)]"
            style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
          >
            Lihat Karya Saya
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center gap-2 px-7 py-3.5 font-[family-name:var(--font-outfit)] font-semibold text-sm rounded-xl border cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              color: "var(--text-primary)",
              backdropFilter: "blur(10px)",
            }}
          >
            Hubungi Saya
          </button>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="animate-fadeSlideUp-4 flex items-center gap-6 flex-wrap">
          {[
            { value: projects, label: "Proyek Selesai" },
            { value: years, label: "Tahun Pengalaman" },
            { value: clients, label: "Klien Puas" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-6">
              {i > 0 && <div className="w-px h-10" style={{ background: "var(--glass-border)" }} />}
              <div className="flex flex-col">
                <span
                  className="font-[family-name:var(--font-outfit)] font-extrabold text-4xl leading-none gradient-text"
                >
                  {s.value}+
                </span>
                <span className="text-xs font-medium mt-1" style={{ color: "var(--text-muted)" }}>
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Avatar ── */}
      <div className="order-1 lg:order-2 flex justify-center items-center animate-fadeSlideUp-2">
        <div className="relative w-[340px] h-[340px] lg:w-[400px] lg:h-[400px] flex items-center justify-center">
          {/* Glow */}
          <div
            className="absolute inset-[-40px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)",
              filter: "blur(20px)",
              animation: "glow-pulse 4s ease-in-out infinite",
            }}
          />
          {/* Rings */}
          {[
            { inset: "-20px", color: "rgba(124,58,237,0.3)", dur: "20s", style: "solid" },
            { inset: "-35px", color: "rgba(6,182,212,0.2)", dur: "30s", style: "dashed" },
            { inset: "-55px", color: "rgba(236,72,153,0.1)", dur: "45s", style: "solid" },
          ].map((r, i) => (
            <div
              key={i}
              className="absolute rounded-full border"
              style={{
                inset: r.inset,
                borderColor: r.color,
                borderStyle: r.style,
                animation: `ring-rotate ${r.dur} linear infinite${i === 1 ? " reverse" : ""}`,
              }}
            />
          ))}

          {/* Avatar Frame */}
          <div
            ref={avatarRef}
            className="avatar-frame relative z-10 w-[270px] h-[270px] lg:w-[300px] lg:h-[300px] rounded-full overflow-hidden"
            style={{
              border: "3px solid rgba(124,58,237,0.5)",
              boxShadow: "0 0 0 6px rgba(124,58,237,0.1), 0 0 60px rgba(124,58,237,0.3), inset 0 0 60px rgba(0,0,0,0.3)",
            }}
          >
            <Image
              src="/avatar.jpg"
              alt="Putri Egii Hapsa Andarista — UI/UX Designer"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Float Badges */}
          <div
            className="absolute top-4 right-[-10px] lg:right-[-20px] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap z-20"
            style={{
              background: "rgba(15,22,40,0.9)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(20px)",
              color: "var(--text-primary)",
              animation: "float-bob 3s ease-in-out infinite",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <svg viewBox="0 0 38 57" width="18" height="18" fill="none">
              <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
              <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
              <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
              <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
              <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#FF7262"/>
            </svg>
            Figma Expert
          </div>

          <div
            className="absolute bottom-12 right-[-10px] lg:right-[-30px] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap z-20"
            style={{
              background: "rgba(15,22,40,0.9)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(20px)",
              color: "#67e8f9",
              animation: "float-bob 3.5s ease-in-out 0.5s infinite",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            🎯 UX Research
          </div>

          <div
            className="absolute bottom-2 left-0 flex flex-col gap-0.5 px-4 py-2.5 rounded-xl text-xs font-semibold z-20"
            style={{
              background: "rgba(15,22,40,0.9)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(20px)",
              animation: "float-bob 4s ease-in-out 1s infinite",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <span className="text-yellow-400 text-xs">★★★★★</span>
            <span style={{ color: "var(--text-primary)" }}>IPK 4.0 🎓</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        style={{ color: "var(--text-muted)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        <div className="w-px h-12 bg-gradient-to-b from-purple-400 to-transparent"
          style={{ animation: "scroll-line 2s ease-in-out infinite" }} />
        <span>Scroll</span>
      </div>
    </section>
  );
}
