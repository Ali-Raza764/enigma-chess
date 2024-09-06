import { FaChessKing, FaSpinner } from "react-icons/fa";
import NavBar from "./NavBar";
import { Suspense } from "react";
import UserButton from "./UserButton";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between p-3 border-b border-gray-600">
      {/* Logo Section */}
      <div className="flex items-center justify-center gap-3">
        <h3>Enigma Chess</h3>
        <FaChessKing size={35} className="text-gray-600" />
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
