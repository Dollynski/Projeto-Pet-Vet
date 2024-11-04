import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "E-commerce Eletrônicos EcoShop",
  description: "Sua loja online de notebooks, computadores e acessórios.",
  keywords: ['e-commerce', 'notebooks', 'computadores', 'acessórios', 'produtos eletrônicos', 'tecnologia', 'pelotas', 'compras'],
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
