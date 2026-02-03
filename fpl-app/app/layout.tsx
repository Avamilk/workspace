import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FPL Retro",
  description: "Fantasy Premier League with retro vibes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0a0a0f] text-[#39ff14] font-['VT323'] min-h-screen">
        {children}
      </body>
    </html>
  );
}
