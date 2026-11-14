import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "./fonts/poppins/Poppins-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins/Poppins-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins/Poppins-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins/Poppins-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Bota de Navidad",
  description:
    "Organiza tu intercambio navideño y comparte tu lista de deseos con familia y amigos.",
  applicationName: "Bota de Navidad",
  appleWebApp: { capable: true, title: "Bota de Navidad", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1F5C4A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body className={`${poppins.variable} antialiased`}>
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
