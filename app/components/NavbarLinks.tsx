"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "Templates",
    href: "#",
  },
  {
    id: 2,
    name: "UI Kits",
    href: "#",
  },
  {
    id: 3,
    name: "Icons",
    href: "#",
  },
];

const NavbarLinks = (props: Props) => {
  const location = usePathname();

  return (
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
      {navbarLinks.map((e) => (
        <Link
          href={e.href}
          key={e.id}
          className={cn(
            location === e.href
              ? "bg-muted"
              : "hover:bg-muted hover:bg-opacity-75",
            "group flex items-center px-2 py-2 font-medium rounded-md"
          )}
        >
          {e.name}
        </Link>
      ))}
    </div>
  );
};

export default NavbarLinks;
