import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "PetVet",
  description: "A aplicação desenvolvida pensada em você, veterinário.",
  keywords: ['veterinaria', 'veterinario', 'clinica', 'pets'],
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
