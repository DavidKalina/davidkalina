"use client";

import { Clock, Mail, Send } from "lucide-react";
import { useState, useTransition } from "react";
import { sendContactEmail } from "../app/actions";
import { ExcalidrawButton } from "./ExcalidrawButton";
import { ExcalidrawCard } from "./ExcalidrawCard";
import { ExcalidrawInput, ExcalidrawTextarea } from "./ExcalidrawFormField";
import ExcalidrawSectionHeader from "./ExcalidrawSectionHeader";
import { ExcalidrawFormAlert } from "./ExcalidrawFormAlert";
import { ExcalidrawInfoItem } from "./ExcalidrawInfoItem";
import { ExcalidrawStatus } from "./ExcalidrawStatus";

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
    <section className="bg-zinc-50/80" id="contact">
      <div className="max-w-7xl mx-auto px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="space-y-12">
            <ExcalidrawSectionHeader
              icon={Mail}
              title="Let's Work Together"
              subtitle="005 / CONTACT"
            />

            <div className="space-y-6">
              <ExcalidrawInfoItem
                icon={Clock}
                title="Response Time"
                description="Usually within 24 hours"
              />
              <ExcalidrawInfoItem icon={Mail} title="Email" description="davidkalina@proton.me" />
            </div>

            <ExcalidrawStatus
              status="available"
              title="CURRENTLY AVAILABLE"
              description="Open to discussing new projects and opportunities. Ideal project duration: 3-6 months."
            />
          </div>

          {/* Right Column - Form */}
          <ExcalidrawCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ExcalidrawInput
                    label="NAME"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                  />
                  <ExcalidrawInput
                    label="EMAIL"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                  />
                </div>
                <ExcalidrawTextarea
                  label="PROJECT DETAILS"
                  required
                  value={formState.message}
                  onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                />
              </div>

              {status.message && (
                <ExcalidrawFormAlert type={status.type!} message={status.message} />
              )}

              <div className="flex items-center gap-4">
                <ExcalidrawButton type="submit" disabled={isPending}>
                  {isPending ? "SENDING..." : "SEND MESSAGE"}
                  <Send className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
                </ExcalidrawButton>
                <p className="font-sketch text-xs text-slate-500">
                  Usually respond within 24 hours
                </p>
              </div>
            </form>
          </ExcalidrawCard>
        </div>
      </div>
    </section>
  );
};

export default ModernCTA;
