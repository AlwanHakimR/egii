import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Putri Egii — UI/UX Designer Portfolio",
  description:
    "Portfolio Putri Egii, seorang UI/UX Designer berprestasi dengan IPK 4.0 yang berspesialisasi dalam desain produk digital yang indah, intuitif, dan berpusat pada pengguna.",
  keywords: [
    "UI/UX Designer",
    "Portfolio",
    "Putri Egii",
    "Desain Produk",
    "Mobile App Design",
    "Web Design",
  ],
  openGraph: {
    title: "Putri Egii — UI/UX Designer",
    description: "Crafting beautiful digital experiences, one pixel at a time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${outfit.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
