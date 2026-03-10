import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

// Lora font (elegant serif similar to Teodor)
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Suntzu: AI Agent",
  description: "Agente de IA conversacional para descubrir los parques y experiencias del Grupo Xcaret en la Riviera Maya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${lora.variable} antialiased`}
        style={{ fontFamily: 'var(--font-lora), serif' }}
      >
        {children}
      </body>
    </html>
  );
}
