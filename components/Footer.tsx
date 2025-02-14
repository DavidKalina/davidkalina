import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import Link from "next/link";

const ModernFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 dark:bg-zinc-800/95 border-t border-zinc-100 dark:border-zinc-700/50">
      <div className="max-w-7xl mx-auto px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <h3 className="font-mono font-bold text-lg text-black dark:text-white">
                davidkalina
              </h3>
            </Link>
            <p className="font-mono text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Building digital experiences with modern technologies and minimal design.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="font-mono text-xs text-zinc-400 dark:text-zinc-500">NAVIGATION</h4>
            <div className="space-y-4">
              <Link href="#projects">
                <Button
                  variant="link"
                  className="p-0 h-auto font-mono text-sm text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:no-underline"
                >
                  Projects
                </Button>
              </Link>
              <br />
              <Link href="#about">
                <Button
                  variant="link"
                  className="p-0 h-auto font-mono text-sm text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:no-underline"
                >
                  About
                </Button>
              </Link>
              <br />
              <Link href="#contact">
                <Button
                  variant="link"
                  className="p-0 h-auto font-mono text-sm text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:no-underline"
                >
                  Contact
                </Button>
              </Link>
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h4 className="font-mono text-xs text-zinc-400 dark:text-zinc-500">CONNECT</h4>
            <div className="space-y-4">
              <Button
                variant="link"
                className="p-0 h-auto font-mono text-sm text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:no-underline group inline-flex items-center"
                asChild
              >
                <Link href="mailto:davidkalina@proton.me">
                  Email
                  <ArrowUpRight
                    size={14}
                    className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </Button>
              <br />
              <Button
                variant="link"
                className="p-0 h-auto font-mono text-sm text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:no-underline group inline-flex items-center"
                asChild
              >
                <Link href="https://www.linkedin.com/in/david-kalina-b68854342/" target="_blank">
                  LinkedIn
                  <ArrowUpRight
                    size={14}
                    className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </Button>
              <br />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-zinc-100 dark:border-zinc-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-sm text-zinc-400 dark:text-zinc-500">
            © {currentYear} All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10 text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white"
              asChild
            >
              <Link href="https://github.com/DavidKalina" target="_blank">
                <Github size={18} />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10 text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white"
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
