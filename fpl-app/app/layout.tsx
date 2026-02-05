import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "FPL Command Center",
  description: "Fantasy Premier League with Matrix aesthetics",
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
      <body className="bg-[#050a14] text-white font-sans min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
