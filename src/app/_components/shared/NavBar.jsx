"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Ensure this component is client-side

const NavBar = () => {
  const pathname = usePathname(); // Get the current route
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/puzzles", label: "Puzzles" },
    { href: "/analysis", label: "Analysis" },
  ];
  return (
    <nav className="flex items-center gap-4">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`pb-1 border-b  transition hover:border-gray-400 ${
            pathname === link.href ? "border-gray-400" : "border-transparent" // Active link styling
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
