import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neersolve",
  icons: [
    "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader
          color="#000000cc"
          template='<div class="bar" role="bar">
                      <div class="peg"></div>
                    </div>'
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
