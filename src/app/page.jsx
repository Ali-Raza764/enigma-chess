import Link from "next/link";

export default async function Home() {
  return (
    <main className="p-6 h-full w-full items-center justify-center">
      <Link href={"/board"} className="border p-2 rounded-md">
        Board
      </Link>
      <Link href={"/profile"} className="border p-2 rounded-md">
        Profile
      </Link>
      <Link href={"/api/auth/signin"} className="border p-2 rounded-md">
        Signin
      </Link>
    </main>
  );
}
