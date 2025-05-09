import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import ClientProvider from "./client-provider";
import AuthProvider from "@/providers/AuthProvider";
import NavBar from '@/components/layout/nav-bar'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ClientProvider>
            <NavBar/>
            {children}
            </ClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
