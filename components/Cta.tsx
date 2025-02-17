"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, Send } from "lucide-react";
import { useTransition, useState } from "react";
import { sendContactEmail } from "../app/actions";

const ModernCTA = () => {
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await sendContactEmail(formState);

      if (result.error) {
        setStatus({
          type: "error",
          message: result.error,
        });
      } else {
        setStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormState({ name: "", email: "", message: "" });
      }
    });
  };

  return (
    <section className="bg-zinc-50/80 dark:bg-zinc-900/95" id="contact">
      <div className="max-w-7xl mx-auto px-8 py-32">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Info */}
          <div className="space-y-12">
            {/* Section Header */}
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="bg-[#333] dark:bg-zinc-700 p-4 rounded-2xl">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                    005 / CONTACT
                  </p>
                  <h2 className="text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
                    Let&apos;s Work Together
                  </h2>
                </div>
              </div>
              <p className="font-mono text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Currently available for freelance projects and full-time opportunities. Let&apos;s
                build something great together.
              </p>
            </div>

            {/* Quick Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Clock size={20} className="text-zinc-500 dark:text-zinc-400" />
                <div>
                  <p className="font-mono text-sm text-zinc-900 dark:text-zinc-200 font-bold">
                    Response Time
                  </p>
                  <p className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
                    Usually within 24 hours
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-zinc-500 dark:text-zinc-400" />
                <div>
                  <p className="font-mono text-sm text-zinc-900 dark:text-zinc-200 font-bold">
                    Email
                  </p>
                  <p className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
                    davidkalina@proton.me
                  </p>
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div className="bg-white/80 dark:bg-zinc-700/80 shadow-lg dark:shadow-zinc-900/30 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <p className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-200">
                  CURRENTLY AVAILABLE
                </p>
              </div>
              <p className="font-mono text-sm text-zinc-600 dark:text-zinc-300">
                Open to discussing new projects and opportunities. Ideal project duration: 3-6
                months.
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="relative transform hover:scale-[1.02] transition-all duration-500">
            <div className="absolute inset-0 rounded-3xl bg-white/80 dark:bg-zinc-700/80 shadow-lg dark:shadow-zinc-900/30" />
            <div className="relative p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        NAME
                      </label>
                      <Input
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="h-14 px-6 font-mono text-sm bg-white dark:bg-zinc-700/50 border-2 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 rounded-2xl focus:border-zinc-900 dark:focus:border-zinc-400 focus:ring-0 transition-colors duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        EMAIL
                      </label>
                      <Input
                        required
                        type="email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, email: e.target.value }))
                        }
                        className="h-14 px-6 font-mono text-sm bg-white dark:bg-zinc-700/50 border-2 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 rounded-2xl focus:border-zinc-900 dark:focus:border-zinc-400 focus:ring-0 transition-colors duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      PROJECT DETAILS
                    </label>
                    <Textarea
                      required
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, message: e.target.value }))
                      }
                      className="min-h-[200px] p-6 font-mono text-sm bg-white dark:bg-zinc-700/50 border-2 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 rounded-2xl focus:border-zinc-900 dark:focus:border-zinc-400 focus:ring-0 transition-colors duration-300"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>

                {status.message && (
                  <div
                    className={`p-4 rounded-2xl ${
                      status.type === "success"
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                        : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                    } font-mono text-sm`}
                  >
                    {status.message}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-[#333] dark:bg-white text-white dark:text-black 
             hover:bg-zinc-900 dark:hover:bg-white rounded-full 
             font-mono font-bold md:text-md 2xl:text-lg px-8 py-6 group disabled:opacity-50 
             transition-all duration-300 
             hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  >
                    {isPending ? "SENDING..." : "SEND MESSAGE"}
                    <Send
                      className="ml-2 transition-transform group-hover:translate-x-1"
                      size={18}
                    />
                  </Button>
                  <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    Usually respond within 24 hours
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCTA;
