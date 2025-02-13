"use client";

import React from "react";
import { ExternalLink, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ExcalidrawButton } from "./ExcalidrawButton";
import { cn } from "@/lib/utils";

// Simplified nav styles without the rotated borders
const navStyles = `
  relative 
  border-b
  border-slate-200
  overflow-visible
  bg-white/90
  backdrop-blur-sm
  bg-[length:5px_5px]
  bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.015)_0px,transparent_1px,transparent_2px,rgba(0,0,0,0.015)_3px)]
`;

const ExcalidrawNavLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithRef<typeof Link>
>(({ className, children, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      className={cn(
        "relative inline-flex items-center font-sketch text-sm text-slate-600 hover:text-slate-900 transition-colors",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-slate-800",
        "after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
});

ExcalidrawNavLink.displayName = "ExcalidrawNavLink";

const ExcalidrawNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-[999]">
      <div className={navStyles}>
        <div className="px-8 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <Link href="/" className="flex items-center">
              <span className="font-sketch font-bold text-lg hover:text-slate-700 transition-colors">
                davidkalina
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 mr-8">
                <ExcalidrawNavLink href="/projects">PROJECTS</ExcalidrawNavLink>
                <ExcalidrawNavLink href="/about">ABOUT</ExcalidrawNavLink>
                <ExcalidrawNavLink href="/contact">CONTACT</ExcalidrawNavLink>
              </div>

              <div className="flex items-center gap-3">
                <ExcalidrawButton
                  variant="blue"
                  className="px-4 py-2 hover:bg-blue-100/80 transition-colors"
                >
                  <Link
                    href="https://github.com/DavidKalina"
                    target="_blank"
                    className="flex items-center"
                  >
                    <Github className="mr-2" size={16} />
                    GITHUB
                  </Link>
                </ExcalidrawButton>
                <ExcalidrawButton className="px-4 py-2 hover:bg-slate-100/80 transition-colors">
                  <Link href="/resume" target="_blank" className="flex items-center">
                    RESUME
                    <ExternalLink className="ml-2" size={16} />
                  </Link>
                </ExcalidrawButton>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-slate-100 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={20} className="text-slate-600" />
              ) : (
                <Menu size={20} className="text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200">
            <div className="px-8 py-6 space-y-4 bg-white/95">
              <Link href="/projects" className="block">
                <ExcalidrawButton className="w-full justify-start font-sketch text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/80">
                  PROJECTS
                </ExcalidrawButton>
              </Link>
              <Link href="/about" className="block">
                <ExcalidrawButton className="w-full justify-start font-sketch text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/80">
                  ABOUT
                </ExcalidrawButton>
              </Link>
              <Link href="/contact" className="block">
                <ExcalidrawButton className="w-full justify-start font-sketch text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/80">
                  CONTACT
                </ExcalidrawButton>
              </Link>
              <div className="pt-4 space-y-3">
                <ExcalidrawButton variant="blue" className="w-full">
                  <Link
                    href="https://github.com/DavidKalina"
                    target="_blank"
                    className="flex items-center justify-center"
                  >
                    <Github className="mr-2" size={16} />
                    GITHUB
                  </Link>
                </ExcalidrawButton>
                <ExcalidrawButton className="w-full">
                  <Link href="/resume" target="_blank" className="flex items-center justify-center">
                    RESUME
                    <ExternalLink className="ml-2" size={16} />
                  </Link>
                </ExcalidrawButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ExcalidrawNavbar;
