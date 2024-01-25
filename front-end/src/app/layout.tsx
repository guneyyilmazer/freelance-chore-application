import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DesktopHeader from "./components/DesktopHeader";
import MobileNavbar from "./components/MobileNavbar";
const inter = Inter({ subsets: ["latin"] });
import "./css/styles.css";
import { Providers } from "./Providers";
import Footer from "./components/Footer";
export const BACKEND_SERVER_IP = "http://localhost:4000";
export const SOCKET_IO_IP = "http://localhost:3001";
export const categories: categories = {
  cleaning: { value: { cleaning: true }, name: "cleaning" },
  cuttingGrass: { value: { cuttingGrass: true }, name: "cuttingGrass" },
  plumbing: { value: { plumbing: true }, name: "plumbing" },
  moving: { value: { moving: true }, name: "moving" },
  dogWalking: { value: { dogWalking: true }, name: "dogWalking" },
};
export const categoriesArray = [
  { value: { cleaning: true }, name: "cleaning", displayName: "Cleaning" },
  {
    value: { cuttingGrass: true },
    name: "cuttingGrass",
    displayName: "Cutting Grass",
  },
  { value: { plumbing: true }, name: "plumbing", displayName: "Plumbing" },
  { value: { moving: true }, name: "moving", displayName: "Moving" },
  {
    value: { dogWalking: true },
    name: "dogWalking",
    displayName: "Dog Walking",
  },
];
type categories = {
  cleaning: { value: { cleaning: true }; name: string };
  cuttingGrass: { value: { cuttingGrass: true }; name: string };
  plumbing: { value: { plumbing: true }; name: string };
  moving: { value: { moving: true }; name: string };
  dogWalking: { value: { dogWalking: true }; name: string };
};

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
          <div className="hidden md:block">
            <DesktopHeader />
          </div>
          <div className="md:hidden">
            <MobileNavbar />
          </div>
          <div className="">{children}</div>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
