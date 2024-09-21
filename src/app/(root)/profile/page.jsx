import SignOutButton from "@/app/_components/auth/SignOutButton";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnet";
import User from "@/lib/models/user.model";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { userAgent } from "next/server";
import {
  FaChessKing,
  FaUserCircle,
  FaEnvelope,
  FaPuzzlePiece,
  FaHome,
  FaTasks,
} from "react-icons/fa"; // Import icons

const ProfilePage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  await dbConnect();
  const userData = await User.findOne({
    _id: session.user.id,
  }).lean();
  console.log(userData)

  

  return (
    <div className="flex flex-col items-center justify-center h-full bg-black text-white p-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <Image
          src={userData.user.image}
          alt="User profile picture"
          width={150}
          height={150}
          className="rounded-full"
        />
        <h1 className="text-4xl font-semibold mt-4 flex items-center">
          <FaUserCircle className="mr-2" /> {userData.user.name}
        </h1>
        <p className="text-gray-400 text-lg flex items-center mt-2">
          <FaEnvelope className="mr-2" /> {userData.user.email}
        </p>
        <p className="text-sm mt-1">
          {userData.user.isVerified ? "Verified User" : "Unverified User"}
        </p>
      </div>

      {/* Chess Stats Section */}
      <div className="text-center mb-8">
        <p className="text-2xl font-semibold flex items-center justify-center mb-2">
          <FaChessKing className="mr-2" /> Chess Rating: {userData.user.rating}
        </p>
        <p className="text-xl flex items-center justify-center">
          <FaPuzzlePiece className="mr-2" /> Puzzles Solved:{" "}
          {userData.user.puzzlesSolved}
        </p>
      </div>

      {/* Navigation Section */}
      <div className="flex justify-center space-x-4">
        <Link
          href="/"
          className="flex items-center border p-3 rounded-md text-center"
        >
          <FaHome className="mr-2" /> Home
        </Link>
        <Link
          href="/puzzles"
          className="flex items-center border p-3 rounded-md text-center"
        >
          <FaTasks className="mr-2" /> Puzzles
        </Link>
      </div>

      {/* Sign Out Button */}
      <div className="mt-8">
        <SignOutButton />
      </div>
    </div>
  );
};

export default ProfilePage;
