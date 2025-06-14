"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const ModernNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isMapMojiActive = pathname === "/mapmoji";
  const isBlogActive = pathname === "/blog";

  return (
    <nav className="bg-gradient-to-b from-white/95 to-white/90 dark:from-zinc-800/95 dark:to-zinc-800/90 border-b border-zinc-100 dark:border-zinc-700/50 fixed w-full z-[999] backdrop-blur-sm">
      <div className="px-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3">
            <span className="font-mono font-bold text-lg bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
              davidkalina
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/blog"
              className={`font-mono text-sm text-zinc-600 dark:text-zinc-300 
              hover:text-black dark:hover:text-white transition-colors duration-300
              border-b-2 ${isBlogActive ? 'border-blue-500 hover:border-blue-600' : 'border-transparent'}`}
            >
              BLOG
            </Link>
            <Link
              href="/mapmoji"
              className={`font-mono text-sm text-zinc-600 dark:text-zinc-300 
              hover:text-black dark:hover:text-white transition-colors duration-300
              border-b-2 ${isMapMojiActive ? 'border-blue-500 hover:border-blue-600' : 'border-transparent'}`}
            >
              MAPMOJI
            </Link>
            <ThemeToggle />
            <div className="flex items-center gap-3 pl-6 border-l border-zinc-100 dark:border-zinc-700/50">
              <Button
                variant="outline"
                className="bg-gradient-to-r from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900
                  text-black dark:text-white rounded-full font-mono text-sm px-6
                  border-2 border-zinc-200 dark:border-zinc-700
                  transition-all duration-300 
                  hover:border-black dark:hover:border-white
                  hover:from-zinc-50 hover:to-white dark:hover:from-zinc-700 dark:hover:to-zinc-800
                  hover:shadow-md hover:-translate-y-0.5"
                asChild
              >
                <Link href="https://github.com/DavidKalina" target="_blank">
                  <Github className="mr-2" size={16} />
                  GITHUB
                </Link>
              </Button>

              <Button
                className="bg-gradient-to-r from-[#333] via-zinc-800 to-[#333] dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700
                  text-white rounded-full font-mono text-sm px-8 group 
                  border-2 border-zinc-800 dark:border-zinc-600
                  transition-all duration-300 
                  hover:border-white dark:hover:border-zinc-400
                  hover:from-[#444] hover:via-zinc-700 hover:to-[#444] 
                  dark:hover:from-zinc-600 dark:hover:via-zinc-700 dark:hover:to-zinc-600
                  hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.9)]
                  hover:-translate-y-0.5"
                asChild
              >
                <Link href="/resume" target="_blank">
                  RESUME
                  <ExternalLink
                    className="ml-2 transition-transform group-hover:translate-x-1"
                    size={16}
                  />
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-black dark:text-white" />
            ) : (
              <Menu size={24} className="text-black dark:text-white" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 dark:border-zinc-700/50 bg-gradient-to-b from-white/95 to-white/90 dark:from-zinc-800/95 dark:to-zinc-800/90 backdrop-blur-sm">
          <div className="px-8 py-6 space-y-6">
            <Link href="/blog" className="block">
              <Button
                variant="ghost"
                className={`w-full justify-start font-mono text-sm text-zinc-600 dark:text-zinc-300 
                  hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700/50 
                  transition-colors duration-300 border-b-2 ${isBlogActive ? 'border-blue-500 hover:border-blue-600' : 'border-transparent'}`}
              >
                BLOG
              </Button>
            </Link>
            <Link href="/mapmoji" className="block">
              <Button
                variant="ghost"
                className={`w-full justify-start font-mono text-sm text-zinc-600 dark:text-zinc-300 
                  hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700/50 
                  transition-colors duration-300 border-b-2 ${isMapMojiActive ? 'border-blue-500 hover:border-blue-600' : 'border-transparent'}`}
              >
                MAPMOJI
              </Button>
            </Link>
            <Link href="/projects" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start font-mono text-sm text-zinc-600 dark:text-zinc-300 
                  hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700/50 
                  transition-colors duration-300"
              >
                PROJECTS
              </Button>
            </Link>
            <Link href="/about" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start font-mono text-sm text-zinc-600 dark:text-zinc-300 
                  hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700/50 
                  transition-colors duration-300"
              >
                ABOUT
              </Button>
            </Link>
            <Link href="/contact" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start font-mono text-sm text-zinc-600 dark:text-zinc-300 
                  hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700/50 
                  transition-colors duration-300"
              >
                CONTACT
              </Button>
            </Link>
            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-700/50 space-y-3">
              <ThemeToggle />
              <Button
                variant="outline"
                className="w-full bg-gradient-to-r from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900
                  text-black dark:text-white rounded-full font-mono text-sm
                  border-2 border-zinc-200 dark:border-zinc-700
                  transition-all duration-300 
                  hover:border-black dark:hover:border-white
                  hover:from-zinc-50 hover:to-white dark:hover:from-zinc-700 dark:hover:to-zinc-800
                  hover:shadow-md hover:-translate-y-0.5"
                asChild
              >
                <Link href="https://github.com" target="_blank">
                  <Github className="mr-2" size={16} />
                  GITHUB
                </Link>
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-[#333] via-zinc-800 to-[#333] dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700
                  text-white rounded-full font-mono text-sm
                  border-2 border-zinc-800 dark:border-zinc-600
                  transition-all duration-300 
                  hover:border-white dark:hover:border-zinc-400
                  hover:from-[#444] hover:via-zinc-700 hover:to-[#444] 
                  dark:hover:from-zinc-600 dark:hover:via-zinc-700 dark:hover:to-zinc-600
                  hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.9)]
                  hover:-translate-y-0.5"
                asChild
              >
                <Link href="/resume" target="_blank">
                  RESUME
                  <ExternalLink
                    className="ml-2 transition-transform group-hover:translate-x-1"
                    size={16}
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ModernNavbar;
