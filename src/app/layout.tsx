import type { Metadata } from "next";
import { Roboto, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ReduxProvider from "@/redux/provider/ReduxProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CraveIt",
  // description: "starter kit for nextjs with redux with persist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // disable all dark classes for tailwind
      className=""
    >
      <body className={`${roboto.className} ${manrope.className} antialiased`}>
        <Toaster position="top-center" richColors />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
