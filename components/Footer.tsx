"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ModernFooter = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer className="bg-gradient-to-b from-white/80 to-zinc-50/80 dark:from-zinc-800/95 dark:to-zinc-900/95 border-t border-zinc-100 dark:border-zinc-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4 lg:space-y-6">
            <Link href="/" className="inline-block group">
              <h3 className="font-mono font-bold text-lg bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent group-hover:from-zinc-700 group-hover:to-zinc-500 dark:group-hover:from-zinc-300 dark:group-hover:to-zinc-100 transition-all duration-300">
                davidkalina
              </h3>
            </Link>
            <p className="font-mono text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-sm">
              Building digital experiences with modern technologies and minimal design.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4 lg:space-y-6">
            <h4 className="font-mono text-xs font-medium text-zinc-400 dark:text-zinc-500">
              NAVIGATION
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: isHomePage ? "#projects" : "/#projects", label: "Projects" },
                { href: isHomePage ? "#about" : "/#about", label: "About" },
                { href: isHomePage ? "#contact" : "/#contact", label: "Contact" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="w-fit">
                  <Button
                    variant="link"
                    className="p-0 h-auto font-mono text-sm text-zinc-600 dark:text-zinc-300 
                      hover:text-black dark:hover:text-white hover:no-underline
                      transition-all duration-300 group inline-flex items-center"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    />
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-4 lg:space-y-6">
            <h4 className="font-mono text-xs font-medium text-zinc-400 dark:text-zinc-500">
              CONNECT
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: "mailto:davidkalina@proton.me", label: "Email" },
                { href: "https://www.linkedin.com/in/david-kalina-b68854342/", label: "LinkedIn" },
              ].map((link) => (
                <Button
                  key={link.href}
                  variant="link"
                  className="p-0 h-auto font-mono text-sm text-zinc-600 dark:text-zinc-300 
                    hover:text-black dark:hover:text-white hover:no-underline
                    transition-all duration-300 group inline-flex items-center w-fit"
                  asChild
                >
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                  >
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Empty column for grid balance */}
          <div className="hidden lg:block" />
        </div>

        {/* Bottom Bar */}
        <div className="py-6 lg:py-8 border-t border-zinc-100 dark:border-zinc-700/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-sm text-zinc-400 dark:text-zinc-500 text-center sm:text-left">
            © {currentYear} All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9 bg-gradient-to-r from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900
                text-zinc-600 dark:text-zinc-400
                border-2 border-zinc-200 dark:border-zinc-700
                transition-all duration-300 
                hover:border-black dark:hover:border-white
                hover:from-zinc-50 hover:to-white dark:hover:from-zinc-700 dark:hover:to-zinc-800
                hover:text-black dark:hover:text-white
                hover:shadow-md hover:-translate-y-0.5"
              asChild
            >
              <Link href="https://github.com/DavidKalina" target="_blank">
                <Github size={16} />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9 bg-gradient-to-r from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900
                text-zinc-600 dark:text-zinc-400
                border-2 border-zinc-200 dark:border-zinc-700
                transition-all duration-300 
                hover:border-black dark:hover:border-white
                hover:from-zinc-50 hover:to-white dark:hover:from-zinc-700 dark:hover:to-zinc-800
                hover:text-black dark:hover:text-white
                hover:shadow-md hover:-translate-y-0.5"
              asChild
            >
              <Link href="https://www.linkedin.com/in/david-kalina-b68854342/" target="_blank">
                <Linkedin size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
