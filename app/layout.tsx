import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movie List",
  description: "Discover and track top movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <nav className="border-b border-white/10 bg-black/40 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-6">
            <a href="/" className="font-semibold text-lg text-[#e8c547] hover:text-[#f0d86a] transition-colors">
              Movie List
            </a>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
