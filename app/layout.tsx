import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";
import { ClientWrapper } from "@/components/ClientWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StayEase",
  description: "Stay chill with us!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>
          <SessionProvider>
            <Suspense fallback={<Skeleton />}>{children}</Suspense>
          </SessionProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}
