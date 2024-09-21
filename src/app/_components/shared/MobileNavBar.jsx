"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";

const MobileNavBar = () => {
  const [active, setActive] = useState(false);
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/puzzles", label: "Puzzles" },
    { href: "/analysis", label: "Analysis" },
  ];
  const pathname = usePathname();

  const handleClick = () => {
    console.log("clicked");
    setActive(!active);
  };

  return (
    <div className="flex md:hidden relative z-50">
      <button
        onClick={handleClick}
        className="cursor-pointer p-1 z-50 transition" // Ensuring z-index for the button
      >
        {active ? <MdClose size={30} /> : <MdMenu size={30} />}
      </button>

      {/* Overlay */}
      <div
        className={`fixed top-0 right-0 left-0 bottom-0 bg-black z-40 h-screen w-screen transition-all duration-500 ${
          active ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex items-center flex-col gap-4 mt-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`pb-1 border-b  transition hover:border-gray-400 ${
                pathname === link.href
                  ? "border-gray-400"
                  : "border-transparent"
              }`}
              onClick={() => {
                setActive(false);
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileNavBar;
