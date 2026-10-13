import Navbar from "./components/navbar";
import BackgroundEffects from "./components/background-effects";
import HeroSection from "./components/hero";
import AboutSection from "./components/about";
import SkillsSection from "./components/skills";
import ProjectsSection from "./components/projects";
import ContactSection from "./components/contact";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Background Effects (cursor glow + particles) */}
      <BackgroundEffects />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
