import type { Metadata } from "next";
import { Rubik as Font } from "next/font/google"
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";


const font = Font({
  subsets: ["latin"],
  weight: "500"
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "This is Filip Kasperski's portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  return (
    <html lang="pl">
      <body
        className={`${font.className} tracking-wide bg-nord-1 text-nord-5 text-lg flex flex-col min-h-screen font-medium`}
      >
          <Header />
          <div className="my-10 mx-40 h-full flex flex-grow justify-center">
            {children}
          </div>
          <Footer/>
      </body>
    </html>
  );
}
