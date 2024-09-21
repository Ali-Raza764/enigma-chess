import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Enigma Chess",
  description: "A chess training platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="blue" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
