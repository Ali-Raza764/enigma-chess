import SignOutButton from "@/app/_components/auth/SignOutButton";
import { auth } from "@/auth";
import Link from "next/link";

const ProfilePage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <br />
      <SignOutButton />
      <Link href={"/"} className="border p-2 rounded-md">
        Home
      </Link>
      <Link href={"/puzzles"} className="border p-2 rounded-md">
        Puzzles
      </Link>
    </div>
  );
};

export default ProfilePage;
