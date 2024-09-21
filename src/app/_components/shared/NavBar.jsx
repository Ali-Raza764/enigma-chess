"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/puzzles", label: "Puzzles" },
    { href: "/analysis", label: "Analysis" },
  ];
  return (
    <>
      <nav className="md:flex items-center gap-4 hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`pb-1 border-b  transition hover:border-gray-400 ${
              pathname === link.href ? "border-gray-400" : "border-transparent"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default NavBar;
