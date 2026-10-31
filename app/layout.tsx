import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "UTSO – Muhaimin Islam Utso | Aspiring Full-Stack Developer",
    template: "%s | UTSO Portfolio",
  },
  description:
    "Portfolio of Muhaimin Islam Utso (UTSO), a Computer Science student at AIUB specialising in full-stack development with C#, React, TypeScript, and Node.js.",
  keywords: [
    "Muhaimin Islam Utso",
    "UTSO",
    "AIUB",
    "full-stack developer",
    "portfolio",
    "React",
    "TypeScript",
    "C#",
    "software developer Bangladesh",
  ],
  authors: [{ name: "Muhaimin Islam Utso" }],
  creator: "Muhaimin Islam Utso",
  openGraph: {
    title: "UTSO – Muhaimin Islam Utso | Aspiring Full-Stack Developer",
    description:
      "Portfolio of Muhaimin Islam Utso, a CSE student at AIUB building practical software projects.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.svg",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#09090D] text-[#F5F3FF] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
