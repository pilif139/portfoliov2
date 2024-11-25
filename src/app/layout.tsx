import type { Metadata } from "next";
import { Rubik as Font } from "next/font/google"
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";
import ReactQueryProvider from "@/app/ReactQueryProvider";
import { ModalContextProvider } from "@/components/ModalContext";
import Modal from "@/components/ui/Modal";

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
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} tracking-wide bg-nord-1 text-nord-5 text-lg flex flex-grow flex-col min-h-screen font-medium max-w-full overflow-auto`}
      >
        <ReactQueryProvider>
          <ModalContextProvider>
            <Modal />
            <Header />
            <div className="my-10 mx-10 h-full flex flex-grow justify-center max-w-full">
              {children}
            </div>
            <Footer />
          </ModalContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
