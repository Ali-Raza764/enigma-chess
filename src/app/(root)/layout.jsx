import Header from "@/app/_components/shared/Header";
import "./chess.css"
import './theme.css'

export const metadata = {
  title: "Enigma Chess",
  description: "A chess training platform",
};

export default function RootLayout({ children }) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
