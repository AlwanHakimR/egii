"use client";
import { useEffect, useRef, useState } from "react";

const contactLinks = [
  { icon: "📧", label: "Email", value: "putri.egii@design.id", href: "mailto:putri.egii@design.id" },
  { icon: "💬", label: "WhatsApp", value: "+62 812-XXXX-XXXX", href: "https://wa.me/62812xxxxxxxx" },
  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/putriegii", href: "https://linkedin.com" },
  { icon: "🏀", label: "Dribbble", value: "dribbble.com/putriegii", href: "https://dribbble.com" },
];

const projectTypes = [
  { value: "", label: "Pilih jenis proyek..." },
  { value: "mobile", label: "Mobile App Design" },
  { value: "web", label: "Web App Design" },
  { value: "research", label: "UX Research" },
  { value: "system", label: "Design System" },
  { value: "audit", label: "UX Audit" },
  { value: "other", label: "Lainnya" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [shake, setShake] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current!;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    if (!name || !email || !message) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 5000);
    }, 1800);
  };

  return (
    <section
      id="contact"
      className="py-28 relative"
      ref={sectionRef}
      style={{ borderTop: "1px solid var(--glass-border)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span
            className="inline-block px-5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "var(--purple-light)" }}
          >
            Hubungi Saya
          </span>
          <h2
            className="font-[family-name:var(--font-outfit)] font-extrabold mb-3"
            style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--text-primary)", lineHeight: 1.2 }}
          >
            Mari <span className="gradient-text">Berkolaborasi</span>
          </h2>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Punya proyek menarik? Saya siap mendengarkan dan berdiskusi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
          {/* Left: Contact Info */}
          <div className="reveal">
            <div className="flex flex-col gap-3 mb-6">
              {contactLinks.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="glass-card flex items-center gap-4 p-5 no-underline transition-all duration-300 hover:translate-x-1"
                  style={{ color: "var(--text-primary)", borderColor: "var(--glass-border)" }}
                >
                  <span className="text-2xl w-10 text-center flex-shrink-0">{c.icon}</span>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      {c.label}
                    </span>
                    <span className="text-sm font-medium">{c.value}</span>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="14"
                    height="14"
                    className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div
              className="glass-card flex items-center gap-4 p-5"
            >
              <div
                className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"
                style={{ animation: "pulse-green 2s infinite" }}
              />
              <div>
                <strong className="block text-sm" style={{ color: "var(--text-primary)" }}>
                  Tersedia untuk Proyek Baru ✨
                </strong>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  Estimasi mulai: November 2026
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card p-9 reveal"
            style={{ animation: shake ? "shake 0.4s ease" : undefined }}
            noValidate
          >
            <div className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold mb-2 tracking-wide"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Contoh: Budi Santoso"
                  required
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--text-primary)",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(124,58,237,0.5)";
                    e.target.style.background = "rgba(124,58,237,0.05)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--glass-border)";
                    e.target.style.background = "rgba(255,255,255,0.04)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold mb-2 tracking-wide"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="budi@perusahaan.com"
                  required
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--text-primary)",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(124,58,237,0.5)";
                    e.target.style.background = "rgba(124,58,237,0.05)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--glass-border)";
                    e.target.style.background = "rgba(255,255,255,0.04)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="project-type"
                  className="block text-xs font-semibold mb-2 tracking-wide"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Jenis Proyek
                </label>
                <select
                  id="project-type"
                  name="project-type"
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--text-primary)",
                    fontFamily: "inherit",
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a78bfa' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 14px center",
                    backgroundSize: "16px",
                    appearance: "none",
                  }}
                >
                  {projectTypes.map((t) => (
                    <option key={t.value} value={t.value} style={{ background: "#0b1120" }}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold mb-2 tracking-wide"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Ceritakan tentang proyek Anda..."
                  required
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 resize-y"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--text-primary)",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(124,58,237,0.5)";
                    e.target.style.background = "rgba(124,58,237,0.05)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--glass-border)";
                    e.target.style.background = "rgba(255,255,255,0.04)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-4 text-white font-[family-name:var(--font-outfit)] font-semibold text-sm rounded-xl border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(124,58,237,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
              >
                {sending ? (
                  <>Mengirim...</>
                ) : (
                  <>
                    Kirim Pesan
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
              </button>

              {sent && (
                <div
                  className="mt-2 p-4 rounded-xl text-sm text-center"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.3)",
                    color: "#86efac",
                  }}
                >
                  ✅ Pesan terkirim! Saya akan membalas dalam 24 jam.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
