"use client";

export default function Footer() {
  const navItems = ["home", "about", "skills", "projects", "contact"];
  const labels: Record<string, string> = {
    home: "Home", about: "Tentang", skills: "Keahlian", projects: "Proyek", contact: "Kontak"
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      className="py-14 px-6"
      style={{ borderTop: "1px solid var(--glass-border)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          {/* Brand */}
          <div className="max-w-[280px]">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo("home"); }}
              className="inline-flex items-center gap-2 no-underline mb-3"
            >
              <span
                className="font-bold text-base"
                style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                ✦
              </span>
              <span
                className="font-[family-name:var(--font-outfit)] font-bold text-xl"
                style={{ color: "var(--text-primary)" }}
              >
                Egii.dev
              </span>
            </a>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Merancang pengalaman digital yang berdampak, satu piksel sekaligus.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex gap-6 flex-wrap items-center">
            {navItems.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                className="text-sm font-medium no-underline transition-colors duration-300 hover:text-purple-300"
                style={{ color: "var(--text-secondary)" }}
              >
                {labels[id]}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 text-xs"
          style={{ borderTop: "1px solid var(--glass-border)", color: "var(--text-muted)" }}
        >
          <p>© 2026 Putri Egii Hapsa Andarista. Dibuat dengan ❤️ dan banyak ☕ — IPK 4.0 🎓</p>
          <p className="italic" style={{ color: "var(--purple-light)" }}>
            &ldquo;Great design is invisible.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
