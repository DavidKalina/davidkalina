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
    <section className="bg-white/80">
      <div className="max-w-7xl mx-auto px-8 py-32">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Info */}
          <div className="space-y-12">
            {/* Section Header */}
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="bg-[#38d9a9] p-4 rounded-2xl">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-mono text-zinc-500 mb-1">005 / CONTACT</p>
                  <h2 className="text-3xl font-mono font-bold text-zinc-900">
                    Let&apos;s Work Together
                  </h2>
                </div>
              </div>
              <p className="font-mono text-zinc-600 leading-relaxed">
                Currently available for freelance projects and full-time opportunities. Let&apos;s
                build something great together.
              </p>
            </div>

            {/* Quick Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Clock size={20} className="text-zinc-400" />
                <div>
                  <p className="font-mono text-sm text-zinc-900 font-bold">Response Time</p>
                  <p className="font-mono text-sm text-zinc-600">Usually within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-zinc-400" />
                <div>
                  <p className="font-mono text-sm text-zinc-900 font-bold">Email</p>
                  <p className="font-mono text-sm text-zinc-600">davidkalina@proton.me</p>
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div className="bg-zinc-100 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="font-mono text-sm font-bold text-zinc-900">CURRENTLY AVAILABLE</p>
              </div>
              <p className="font-mono text-sm text-zinc-600">
                Open to discussing new projects and opportunities. Ideal project duration: 3-6
                months.
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="relative p-4" id="contact">
            <div className="absolute rounded-md inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(0,0,0,0.02),rgba(0,0,0,0))]" />
            <form onSubmit={handleSubmit} className="relative space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-zinc-500">NAME</label>
                    <Input
                      required
                      value={formState.name}
                      onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                      className="h-14 px-6 font-mono text-sm bg-white/80 border-2 border-zinc-200 rounded-2xl focus:border-black focus:ring-0 transition-colors duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-zinc-500">EMAIL</label>
                    <Input
                      required
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                      className="h-14 px-6 font-mono text-sm bg-white/80 border-2 border-zinc-200 rounded-2xl focus:border-black focus:ring-0 transition-colors duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs text-zinc-500">PROJECT DETAILS</label>
                  <Textarea
                    required
                    value={formState.message}
                    onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                    className="min-h-[200px] p-6 font-mono text-sm bg-white/80 border-2 border-zinc-200 rounded-2xl focus:border-black focus:ring-0 transition-colors duration-300"
                    placeholder="Tell me about your project..."
                  />
                </div>
              </div>

              {status.message && (
                <div
                  className={`p-4 rounded-2xl ${
                    status.type === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  } font-mono text-sm`}
                >
                  {status.message}
                </div>
              )}

              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-black text-white hover:bg-zinc-900 rounded-full font-mono text-sm px-8 py-6 group disabled:opacity-50"
                >
                  {isPending ? "SENDING..." : "SEND MESSAGE"}
                  <Send className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
                </Button>
                <p className="font-mono text-xs text-zinc-500">Usually respond within 24 hours</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCTA;
