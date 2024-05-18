"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import React from "react";
import { navbarLinks } from "./NavbarLinks";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Props = {};

const MobileMenu = (props: Props) => {
  const location = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="icon">
          <MenuIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mt-5 flex px-2 space-y-1 flex-col">
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
