import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/shared/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Enigma Chess",
  description: "A chess training platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        </body>
    </html>
  );
}
