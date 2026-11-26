import type { Metadata, Viewport } from "next";
import "@fontsource/archivo-black/latin-400.css";
import "@fontsource/archivo-black/latin-ext-400.css";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "ECOTUCA | Plataforma de ensino em ecoturismo",
  description: "Plataforma de ensino ECOTUCA para trilhas, aulas, atividades, certificados e impacto no Complexo do Alemão.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#FAF7F0" }, { media: "(prefers-color-scheme: dark)", color: "#211714" }],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("ecotuca-theme");document.documentElement.classList.toggle("dark",t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))}catch{}` }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
