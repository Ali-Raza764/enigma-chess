import Link from "next/link";
import { FaChessKnight } from "react-icons/fa";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between p-3">
      <div className="flex items-center justify-center gap-3">
        <FaChessKnight size={35} />
        <h3>Enigma Chess</h3>
      </div>
      <nav>
        <Link href={"/puzzles"}>Puzzles</Link>
      </nav>
      <div className=""></div>
    </div>
  );
};

export default Header;
