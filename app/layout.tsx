import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movie List",
  description: "Add movies to your list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900 text-slate-100 antialiased">
        <header className="border-b border-slate-700 px-6 py-4">
          <nav className="flex gap-6">
            <a href="/" className="text-slate-200 hover:text-white">
              Top Movies
            </a>
          </nav>
        </header>
        <main className="px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
