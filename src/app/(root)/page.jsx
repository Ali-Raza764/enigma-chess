import Link from "next/link";
import { FaUser, FaPuzzlePiece, FaSignInAlt, FaClipboardList } from "react-icons/fa"; // Import some icons

const Card = ({ href, title, description, Icon }) => (
  <Link
    href={href}
    className="block p-6 max-w-sm rounded-lg border border-gray-600 shadow-md 
    hover:bg-gray-800 transition-colors duration-200"
  >
    <div className="flex items-center mb-2">
      {Icon && <Icon className="text-blue-400 mr-3 text-3xl" />} {/* Icon with color and size */}
      <h5 className="text-2xl font-semibold tracking-tight">{title}</h5>
    </div>
    <p className="font-normal">{description}</p>
  </Link>
);

export default function Home() {
  return (
    <main className="p-6 h-full">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            href="/board"
            title="Board"
            description="Access your personal board and manage your tasks."
            Icon={FaClipboardList} // Using an icon for Board
          />
          <Card
            href="/profile"
            title="Profile"
            description="View and edit your profile information."
            Icon={FaUser} // Using an icon for Profile
          />
          <Card
            href="/api/auth/signin"
            title="Sign In"
            description="Log in to your account or create a new one."
            Icon={FaSignInAlt} // Using an icon for Sign In
          />
          <Card
            href="/puzzles"
            title="Puzzles"
            description="Challenge yourself with our collection of puzzles."
            Icon={FaPuzzlePiece} // Using an icon for Puzzles
          />
        </div>
      </div>
    </main>
  );
}
