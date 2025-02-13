import React from "react";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Sketch texture styles
const sketchStyles = `
  bg-white/80
  bg-[length:4px_4px]
  bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.01)_0px,transparent_1px,transparent_2px,rgba(0,0,0,0.01)_3px)]
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FooterLink = ({ href, children, external = false }: any) => (
  <Button
    variant="link"
    className="p-0 h-auto font-sketch text-sm text-zinc-600 hover:text-black hover:no-underline group inline-flex items-center"
    asChild
  >
    <Link href={href} target={external ? "_blank" : undefined}>
      {children}
      {external && (
        <ArrowUpRight
          size={14}
          className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Link>
  </Button>
);

const ModernFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${sketchStyles} border-t border-zinc-100 relative`}>
      <div className="max-w-7xl mx-auto px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <h3 className="font-sketch font-bold text-lg">davidkalina</h3>
            </Link>
            <p className="font-sketch text-sm text-zinc-600 leading-relaxed">
              Building digital experiences with modern technologies and minimal design.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="font-sketch text-xs text-zinc-400">NAVIGATION</h4>
            <div className="space-y-4">
              <FooterLink href="#projects">Projects</FooterLink>
              <br />
              <FooterLink href="#about">About</FooterLink>
              <br />
              <FooterLink href="#contact">Contact</FooterLink>
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h4 className="font-sketch text-xs text-zinc-400">CONNECT</h4>
            <div className="space-y-4">
              <FooterLink href="mailto:davidkalina@proton.me" external>
                Email
              </FooterLink>
              <br />
              <FooterLink href="https://www.linkedin.com/in/david-kalina-b68854342/" external>
                LinkedIn
              </FooterLink>
              <br />
            </div>
          </div>
        </div>

        {/* Bottom Bar with subtle separator */}
        <div className="relative py-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sketch text-sm text-zinc-400">© {currentYear} All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10 text-zinc-400 hover:text-black hover:bg-zinc-50 transition-colors"
              asChild
            >
              <Link href="https://github.com/DavidKalina" target="_blank">
                <Github size={18} />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10 text-zinc-400 hover:text-black hover:bg-zinc-50 transition-colors"
              asChild
            >
              <Link href="https://www.linkedin.com/in/david-kalina-b68854342/" target="_blank">
                <Linkedin size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
