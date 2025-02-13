import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import Link from "next/link";

const ModernFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <h3 className="font-mono font-bold text-lg">davidkalina</h3>
            </Link>
            <p className="font-mono text-sm text-zinc-600 leading-relaxed">
              Building digital experiences with modern technologies and minimal design.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="font-mono text-xs text-zinc-400">NAVIGATION</h4>
            <div className="space-y-4">
              <Link href="#projects">
                <Button
                  variant="link"
                  className="p-0 h-auto font-mono text-sm text-zinc-600 hover:text-black hover:no-underline"
                >
                  Projects
                </Button>
              </Link>
              <br />
              <Link href="#about">
                <Button
                  variant="link"
                  className="p-0 h-auto font-mono text-sm text-zinc-600 hover:text-black hover:no-underline"
                >
                  About
                </Button>
              </Link>
              <br />
              <Link href="#contact">
                <Button
                  variant="link"
                  className="p-0 h-auto font-mono text-sm text-zinc-600 hover:text-black hover:no-underline"
                >
                  Contact
                </Button>
              </Link>
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h4 className="font-mono text-xs text-zinc-400">CONNECT</h4>
            <div className="space-y-4">
              <Button
                variant="link"
                className="p-0 h-auto font-mono text-sm text-zinc-600 hover:text-black hover:no-underline group inline-flex items-center"
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
                className="p-0 h-auto font-mono text-sm text-zinc-600 hover:text-black hover:no-underline group inline-flex items-center"
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

          {/* Newsletter Section */}
          {/* <div className="space-y-6">
            <h4 className="font-mono text-xs text-zinc-400">NEWSLETTER</h4>
            <p className="font-mono text-sm text-zinc-600">
              Subscribe to get updates about new projects and articles.
            </p>
            <Button className="bg-[#333] text-white hover:bg-zinc-900 rounded-full font-mono text-sm px-6">
              SUBSCRIBE
              <Mail className="ml-2" size={16} />
            </Button>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-sm text-zinc-400">© {currentYear} All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10 text-zinc-400 hover:text-black"
              asChild
            >
              <Link href="https://github.com/DavidKalina" target="_blank">
                <Github size={18} />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10 text-zinc-400 hover:text-black"
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
