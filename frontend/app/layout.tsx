import type { Metadata } from "next";
import { Roboto_Flex, Rubik_Mono_One } from "next/font/google";
import "./globals.css";

/* 🔠 Chargement des polices */
const rubikMono = Rubik_Mono_One({
  variable: "--font-ecoride-mono",
  weight: "400",
  subsets: ["latin"],
});

const robotoFlex = Roboto_Flex({
  variable: "--font-ecoride-sans",
  subsets: ["latin"],
  display: "swap",
});

/* 🌿 Métadonnées */
export const metadata: Metadata = {
  title: "Ecoride — Interface App",
  description:
    "Plateforme éco‑responsable propulsée par le Design System Ecoride",
};

/* 🧱 Layout global */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`
          ${robotoFlex.variable}
          ${rubikMono.variable}`}
      >
        <main className="bg-ecoride-green-100">{children}</main>
      </body>
    </html>
  );
}
