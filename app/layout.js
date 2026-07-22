import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "DTC Entertainment",
  description: "DTC Entertainment presents the event of the year.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${inter.variable}`}>
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}