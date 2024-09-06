import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserButton = async () => {
  const session = await auth();
  return (
    <>
      {session ? (
        <Link
          href={"/profile"}
          className="flex items-center justify-center gap-1"
        >
          <Image
            src={session.user.image}
            width={35}
            height={35}
            className="rounded-full hover:scale-110 transition"
            alt="profile"
          />
        </Link>
      ) : (
        <Link
          href={"/api/auth/signin"}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </Link>
      )}
    </>
  );
};

export default UserButton;
