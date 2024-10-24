import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { HeaderSecundario } from "@/components/HeaderSecundario";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "Revenda Avenida",
  description: "Revenda de carros usados em Pelotas - RS",
  keywords: ['revenda', 'carros', 'veículos', 'carros usados']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
