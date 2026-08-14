import type { Metadata } from "next";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";

export const metadata: Metadata = {
  title: "Aura Furnitures",
  description: "Premium Furnitures for your Home",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Admin-only theme pre-paint script - prevents flash of wrong theme.
            Runs before first paint and applies the dark class only on /admin
            routes, so the public site is always rendered light. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (!location.pathname.startsWith('/admin')) return;
                  var theme = localStorage.getItem('aura_admin_theme');
                  var isDark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
                  document.documentElement.classList.toggle('dark', isDark);
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-main)] flex flex-col transition-colors">
        <ShopProvider>{children}</ShopProvider>
      </body>
    </html>
  );
}
