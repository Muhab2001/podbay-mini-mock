import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { TopNavbar } from "@/components/local/navbars/top-navbar";
import SideNavbar from "@/components/local/navbars/side-navbar";

const ibmPlexBold = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-bold",
  weight: "700"
});

const ibmPlex = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Podbay - The best podcast player on the web.",
  description: "Generated by create next app",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${ibmPlexBold.variable} ${ibmPlex.variable} antialiased`}
      >
         <div className="bg-[var:--background]">
    <TopNavbar/>
    <SideNavbar/>
    <section className="w-full sm:w-[calc(100%-14rem)] sm:ml-[14rem] flex flex-col gap-5 mt-[90] py-[20]">
        {children}
    </section>
    </div>
      </body>
    </html>
  );
}
