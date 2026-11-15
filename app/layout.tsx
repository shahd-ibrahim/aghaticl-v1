import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aghatti-menu.vercel.app"),
  title: "Aghatti | منيو أغاتي الفضائي التفاعلي — Cosmic Dining Experience",
  description:
    "منيو مطعم أغاتي للمأكولات العراقية الفاخرة — بوابة الأقسام الفضائية بتجربة انعدام الجاذبية (Zero-Gravity Cosmic Dining Experience) لأكثر من 75 طبقاً عراقياً أصيلاً.",
  icons: {
    icon: "/brand/logo-outline.png",
    apple: "/brand/logo-outline.png",
  },
  openGraph: {
    title: "Aghatti | منيو أغاتي الفضائي التفاعلي",
    description:
      "استكشف بوابة الأقسام الفضائية وأكثر من 75 طبقاً عراقياً أصيلاً في مطعم أغاتي.",
    images: ["/brand/logo-outline.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Playfair+Display:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-teal-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
