'use client';

import Link from "next/link";
import { FooterProps } from "@/types/abmLandingPage";

export function Footer({ companyName = "Acme Inc", links = [] }: FooterProps) {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-zinc-500 dark:text-zinc-400">© 2024 {companyName}. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        {links.map((link, index) => (
          <Link key={index} className="text-xs hover:underline underline-offset-4" href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}