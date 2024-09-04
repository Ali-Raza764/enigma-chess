import { auth } from "@/auth";
import Link from "next/link";
import SignOutButton from "./_components/auth/SignOutButton";

export default async function Home() {
  const session = await auth();
  return (
    <main className="p-6 h-full w-full items-center justify-center">
      <div className="mb-6">
        Name: {session.user.name}
        <br />
        <SignOutButton />
      </div>

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
