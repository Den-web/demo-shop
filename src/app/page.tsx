import type { Metadata } from "next";
import { MainPageClient } from "./MainPageClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://OrcestrAI.com"),
  title: "Candles",
  description: "Candles for your home",
  openGraph: {
    title: "Candles",
    description: "Candles for your home",
    type: "website",
    images: [
      {
        url: "/images/sections/hero/hero-desc-1x.png",
        width: 1200,
        height: 630,
        alt: "Candles"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Candles",
    description: "Candles for your home",
    images: ["/images/sections/hero/hero-desc-1x.png"]
  }
};

export default function MainPage() {
  return <MainPageClient />;
}
