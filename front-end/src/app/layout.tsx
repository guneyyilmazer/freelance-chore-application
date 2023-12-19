import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
const inter = Inter({ subsets: ["latin"] });
import { Providers } from "./Providers";
import { store } from "./app/store";
export const BACKEND_SERVER_IP = "http://localhost:4000";
export const SOCKET_IO_IP = "http://localhost:3001";
/* export const metadata: Metadata = {
  title: "Freelance Chore App",
  description: "Created By Guney Yilmazer",
}; */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <div className="">
            <Header />
          </div>
          <div className="">{children}</div>
          <div className="">
            <Footer />
          </div>
        </body>
      </html>
    </Providers>
  );
}
