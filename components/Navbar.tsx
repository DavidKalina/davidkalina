"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ModernNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-zinc-100 fixed w-full z-[999]">
      <div className="px-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3">
            <span className="font-mono font-bold text-lg">davidkalina</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-3 pl-6 border-l border-zinc-100">
              <Button
                variant="outline"
                className="border-2 border-zinc-200 hover:border-black hover:bg-white/80 text-black rounded-full font-mono text-sm px-6"
                asChild
              >
                <Link href="https://github.com/DavidKalina" target="_blank">
                  <Github className="mr-2" size={16} />
                  GITHUB
                </Link>
              </Button>
              <Button
                className="bg-black text-white hover:bg-zinc-900 rounded-full font-mono text-sm px-6"
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
              <X size={24} className="text-black" />
            ) : (
              <Menu size={24} className="text-black" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100">
          <div className="px-8 py-6 space-y-6">
            <Link href="/projects" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start font-mono text-sm text-zinc-600 hover:text-black"
              >
                PROJECTS
              </Button>
            </Link>
            <Link href="/about" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start font-mono text-sm text-zinc-600 hover:text-black"
              >
                ABOUT
              </Button>
            </Link>
            <Link href="/contact" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start font-mono text-sm text-zinc-600 hover:text-black"
              >
                CONTACT
              </Button>
            </Link>
            <div className="pt-6 border-t border-zinc-100 space-y-3">
              <Button
                variant="outline"
                className="w-full border-2 border-zinc-200 hover:border-black hover:bg-white/80 text-black rounded-full font-mono text-sm"
                asChild
              >
                <Link href="https://github.com" target="_blank">
                  <Github className="mr-2" size={16} />
                  GITHUB
                </Link>
              </Button>
              <Button
                className="w-full bg-black text-white hover:bg-zinc-900 rounded-full font-mono text-sm"
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
