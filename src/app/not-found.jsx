import Link from "next/link";
import { FaChessKing } from "react-icons/fa"; // Chess icon for thematic touch

export default function NotFound() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center space-y-6 text-center py-32 text-white bg-black">
      <FaChessKing size={60} className="text-gray-600" /> {/* Icon for flair */}
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="text-lg text-gray-400">
        Oops! We could not find the page you were looking for.
      </p>
      <Link href="/">
        <button className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-sans rounded-lg shadow-lg transition duration-200">
          Return Home
        </button>
      </Link>
    </div>
  );
}
