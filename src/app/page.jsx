import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6 h-full w-full items-center justify-center">
      <Link href={"/board"} className="border p-2 rounded-md">Board</Link>
    </main>
  );
}
