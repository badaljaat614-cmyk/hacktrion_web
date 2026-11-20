import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/layout/Navbar";
import "./globals.css";
import { Poppins } from "next/font/google";
import Footer from "@/components/layout/Footer";
import SplashScreen from "@/components/layout/SplashScreen";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hacktrion | Your Next Big Idea Starts Here",
    template: "%s | Hacktrion",
  },
  description:
    "Discover hackathons, connect with innovators, and explore opportunities with Hacktrion.",
  metadataBase: new URL("https://hacktrion.app"),
  openGraph: {
    type: "website",
    siteName: "Hacktrion",
    title: "Hacktrion | Your Next Big Idea Starts Here",
    description: "Discover hackathons, connect with innovators, and explore opportunities with Hacktrion.",
    url: "https://hacktrion.app",
    images: [{ url: "/images/hacktrion-light-lavender-transparent.png", alt: "Hacktrion" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hacktrion | Your Next Big Idea Starts Here",
    description: "Discover hackathons, connect with innovators, and explore opportunities with Hacktrion.",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={poppins.variable}>
    <body>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-primary">Skip to content</a>
      <SplashScreen />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer/>
    </body>
  </html>
  );
}
