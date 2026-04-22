import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export const metadata: Metadata = {
  title: "JS Sensei — Interactive JavaScript Learning",
  description: "Learn JavaScript through beautiful animations and interactive visualizers. Perfect for absolute beginners. Master JavaScript in 2 days.",
  keywords: ["JavaScript", "learn JavaScript", "JavaScript tutorial", "interactive JavaScript", "JS Sensei"],
  icons: {
    icon: "/js-logo.png",
    shortcut: "/js-logo.png",
    apple: "/js-logo.png",
  },
  openGraph: {
    title: "JS Sensei",
    description: "Learn JavaScript through beautiful animations and interactive visualizers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
