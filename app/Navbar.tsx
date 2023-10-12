"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiBugFill } from "react-icons/pi";
import classnames from "classnames";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues" },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex space-x-6 border mb-5 px-5 h-14 items-center">
      <Link href="/">
        <PiBugFill size={30} />
      </Link>
      <ul className="flex space-x-6">
        {navItems.map((item, idx) => {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={classnames({
                "text-zinc-900": item.href === pathname,
                "text-zinc-500": item.href !== pathname,
                "hover:text-zinc-800 hover:underline hover:underline-offset-4 font-[500] transition-colors duration-150":
                  true,
              })}
            >
              {item.label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
