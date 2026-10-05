import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Inter_Tight, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight-sans",
  subsets: ["latin"],
  weight: ["500"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Nimbus — Big worlds. No limits.",
  description:
    "Discover games and stream them to the screen you already have. Cloud gaming without a gaming rig.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${interTight.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black font-display text-white">{children}</body>
    </html>
  );
}
