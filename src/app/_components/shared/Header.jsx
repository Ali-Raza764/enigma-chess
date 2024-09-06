import Link from "next/link";
import { FaChessQueen, FaSpider, FaSpinner, FaUser } from "react-icons/fa";
import NavBar from "./NavBar";
import { Suspense } from "react";
import UserButton from "./UserButton";

const Header = () => {
  const session = null;

  return (
    <div className="w-full flex items-center justify-between p-3 border-b border-gray-600">
      {/* Logo Section */}
      <div className="flex items-center justify-center gap-3">
        <h3>Enigma Chess</h3>
        <FaChessQueen size={35} />
      </div>

      {/* Navigation */}
      <NavBar />

      {/* Profile or Login Section */}
      <Suspense fallback={<FaSpinner className="animate-spin" />}>
        <UserButton />
      </Suspense>
    </div>
  );
};

export default Header;
