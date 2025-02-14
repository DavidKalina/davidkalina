"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const ModernNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-700/50 fixed w-full z-[999]">
      <div className="px-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3">
            <span className="font-mono font-bold text-lg text-black dark:text-white">
              davidkalina
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ThemeToggle />
            <div className="flex items-center gap-3 pl-6 border-l border-zinc-100 dark:border-zinc-700/50">
              <Button
                variant="outline"
                className="border-2 border-zinc-200 dark:border-zinc-700 hover:border-black dark:hover:border-white hover:bg-white/80 dark:hover:bg-zinc-800/80 text-black dark:text-white rounded-full font-mono text-sm px-6"
                asChild
              >
                <Link href="https://github.com/DavidKalina" target="_blank">
                  <Github className="mr-2" size={16} />
                  GITHUB
                </Link>
              </Button>

              <Button
                className="bg-[#333] dark:bg-white text-white dark:text-black 
             hover:bg-zinc-900 dark:hover:bg-white rounded-full 
             font-mono text-sm px-8 group disabled:opacity-50 
             transition-all duration-300 
             hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                asChild
              >
                <Link href="/resume" target="_blank">
                  RESUME
                  <ExternalLink className="ml-2" size={16} />
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden p-2"
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
        <div className="md:hidden border-t border-zinc-100 dark:border-zinc-700/50 bg-white dark:bg-zinc-800">
          <div className="px-8 py-6 space-y-6">
            <Link href="/projects" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start font-mono text-sm text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
              >
                PROJECTS
              </Button>
            </Link>
            <Link href="/about" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start font-mono text-sm text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
              >
                ABOUT
              </Button>
            </Link>
            <Link href="/contact" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start font-mono text-sm text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
              >
                CONTACT
              </Button>
            </Link>
            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-700/50 space-y-3">
              <ThemeToggle />
              <Button
                variant="outline"
                className="w-full border-2 border-zinc-200 dark:border-zinc-700 hover:border-black dark:hover:border-white hover:bg-white/80 dark:hover:bg-zinc-800/80 text-black dark:text-white rounded-full font-mono text-sm"
                asChild
              >
                <Link href="https://github.com" target="_blank">
                  <Github className="mr-2" size={16} />
                  GITHUB
                </Link>
              </Button>
              <Button
                className="w-full bg-[#333] dark:bg-white text-white dark:text-black hover:bg-[#333] dark:hover:bg-white rounded-full font-mono text-sm"
                asChild
              >
                <Link href="/resume" target="_blank">
                  RESUME
                  <ExternalLink className="ml-2" size={16} />
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
