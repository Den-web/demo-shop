import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Tenor_Sans, MonteCarlo } from "next/font/google"; // меняем шрифты
import "@/styles/reset.scss";
import type { Metadata, Viewport } from "next";

// Глобальный шрифт
const tenorSans = Tenor_Sans({
  subsets: ["latin"],
  weight: "400",
});

// Точечный шрифт для заголовков
const monteCarlo = MonteCarlo({
  weight: "400",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://OrcestrAI.com/"),
  title: {
    default: "Candles",
    template: "%s | Candles",
  },
  description: "Candles - Candles for your home",
  icons: {
    icon: "/images/logo/logo.svg",
    shortcut: "/images/logo/logo.svg",
    apple: "/images/logo/logo.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={tenorSans.className}>
        <CartProvider>
          <FavoritesProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
