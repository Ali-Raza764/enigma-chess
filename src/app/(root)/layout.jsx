import Header from "@/app/_components/shared/Header";

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
