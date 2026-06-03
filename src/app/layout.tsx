import type { Metadata, Viewport } from "next";
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
  title: {
    default: "Kuloğulları LTD. ŞTİ. | İnşaat, Emlak ve Araç Kiralama",
    template: "%s | Kuloğulları",
  },
  description:
    "Kuloğulları LTD. ŞTİ. için inşaat, emlak, araç kiralama ve yatırım alanlarında profesyonel kurumsal web sitesi.",
  metadataBase: new URL("https://kulogullari.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
