import type { Metadata } from "next";
import { AppProvider } from "@/context/AppContext";
import { BottomNav } from "@/components/BottomNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movie Watchlist",
  description: "Track movies and shows you want to watch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0c0c0e] text-gray-100 antialiased">
        <AppProvider>
          <main className="flex-1 overflow-auto pb-20 min-h-screen">
            {children}
          </main>
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
