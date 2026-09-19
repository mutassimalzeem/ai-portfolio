import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mutassimalzeem.vercel.app/"),
  title: "Mutassim Al Shahriar Zeem — Backend & AI Engineer",
  description:
    "Backend & AI engineer in Dhaka. I build the systems behind the interface: APIs, data pipelines and machine-learning models that ship. Open to freelance and remote work.",
  keywords: [
    "Mutassim Al Shahriar Zeem",
    "backend engineer",
    "AI engineer",
    "FastAPI",
    "Python",
    "machine learning",
    "Dhaka",
    "portfolio",
  ],
  authors: [{ name: "Mutassim Al Shahriar Zeem" }],
  openGraph: {
    title: "Mutassim Al Shahriar Zeem — Backend & AI Engineer",
    description:
      "Backend & AI engineer in Dhaka building APIs, pipelines and ML systems that ship.",
    url: "https://mutassimalzeem.vercel.app/",
    siteName: "Mutassim Al Shahriar Zeem",
    type: "website",
    images: [{ url: "/zeem.jpg", width: 1200, height: 1200, alt: "Mutassim Al Shahriar Zeem" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mutassim Al Shahriar Zeem — Backend & AI Engineer",
    description: "APIs, pipelines and ML systems that ship. Dhaka, Bangladesh.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${plexSans.variable} ${plexMono.variable} ${instrumentSerif.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
