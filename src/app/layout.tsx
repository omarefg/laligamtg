import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Liga MTG Commander",
  description: "Liga de Magic: The Gathering Commander - Tabla de posiciones, resultados y estadísticas",
  openGraph: {
    title: "Liga MTG Commander",
    description: "Liga de Magic: The Gathering Commander - Tabla de posiciones, resultados y estadísticas",
    url: "https://laligamtg.omarefg.com",
    siteName: "Liga MTG",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Liga MTG Commander Logo",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liga MTG Commander",
    description: "Liga de Magic: The Gathering Commander - Tabla de posiciones, resultados y estadísticas",
    images: ["/logo.png"],
  },
  metadataBase: new URL("https://laligamtg.omarefg.com")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
