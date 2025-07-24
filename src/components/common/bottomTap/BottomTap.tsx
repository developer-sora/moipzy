"use client";

import { cn } from "@/utils/cn";
import { MessageCircle, Shirt, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "추천", href: "/chat", icon: MessageCircle },
  {
    name: "옷장",
    href: "/closet",
    icon: Shirt,
  },
  { name: "마이페이지", href: "/mypage", icon: User },
];

const BottomTap = () => {
  const pathname = usePathname();
  return (
    <nav className="w-full h-[56px] bg-white border-t flex justify-between items-center px-2 py-2 z-50">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            aria-label={link.name}
            className={cn(
              "w-1/4 flex flex-col items-center text-zinc-500 hover:text-cyan-700 focus:outline-none cursor-pointer",
              {
                "text-cyan-700": isActive,
              }
            )}
          >
            <LinkIcon className="w-6 h-6" />
            <span className="text-xs mt-1">{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomTap;
