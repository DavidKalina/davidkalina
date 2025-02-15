import React, { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Coffee, Mail, Rocket, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactEmail } from "../app/actions";

const SparkNotes = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "Hi David,\n\nI'd like to discuss a potential opportunity...",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, error: "" });

  const quickPoints = [
    {
      icon: <Brain className="w-4 h-4" />,
      text: "Full-stack developer with 4+ years experience",
    },
    {
      icon: <Rocket className="w-4 h-4" />,
      text: "Specialized in React, Next.js, Node.js",
    },
    {
      icon: <Coffee className="w-4 h-4" />,
      text: "Built products with $400K+ impact",
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, error: "" });

    try {
      const result = await sendContactEmail(formData);
      if (result.error) {
        setSubmitStatus({ success: false, error: result.error });
      } else {
        setSubmitStatus({ success: true, error: "" });
        setFormData({
          name: "",
          email: "",
          message: "Hi David,\n\nI'd like to discuss a potential opportunity...",
        });
      }
    } catch {
      setSubmitStatus({ success: false, error: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-10 w-10 text-zinc-400 hover:text-black dark:hover:text-white"
        >
          <Zap className="h-5 w-5" />
          <span className="sr-only">Quick overview</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
        <DialogHeader>
          <DialogTitle className="font-mono text-lg text-zinc-900 dark:text-zinc-100">
            SparkNotes ⚡️
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Summary */}
          <p className="font-mono text-sm text-zinc-600 dark:text-zinc-300">
            Full-stack developer crafting human-centered solutions with modern tech. Focused on
            building scalable applications that make a real impact.
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {["TYPESCRIPT", "REACT", "NODE.JS", "NEXT.JS"].map((tech) => (
              <Badge
                key={tech}
                className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 
                text-zinc-900 dark:text-zinc-200 px-3 py-1 rounded-full text-xs font-mono"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Quick Points */}
          <div className="space-y-3">
            {quickPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="bg-yellow-500 dark:bg-yellow-500 p-2 rounded-full">
                  {point.icon}
                </div>
                <span className="font-mono text-sm text-zinc-600 dark:text-zinc-300">
                  {point.text}
                </span>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="font-mono text-sm bg-white dark:bg-zinc-900 border-zinc-200 
                dark:border-zinc-700 rounded-lg focus:ring-yellow-500 focus:border-yellow-500
                text-zinc-900 dark:text-zinc-100"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="font-mono text-sm bg-white dark:bg-zinc-900 border-zinc-200 
                dark:border-zinc-700 rounded-lg focus:ring-yellow-500 focus:border-yellow-500
                text-zinc-900 dark:text-zinc-100"
            />
            <Textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="font-mono text-sm bg-white dark:bg-zinc-900 border-zinc-200 
                dark:border-zinc-700 rounded-lg focus:ring-yellow-500 focus:border-yellow-500
                text-zinc-900 dark:text-zinc-100"
              rows={4}
            />

            {submitStatus.error && (
              <p className="text-red-500 text-sm font-mono">{submitStatus.error}</p>
            )}
            {submitStatus.success && (
              <p className="text-green-500 text-sm font-mono">Message sent successfully!</p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#333] dark:bg-white text-white dark:text-black 
                hover:bg-zinc-900 dark:hover:bg-zinc-100 rounded-full 
                font-mono text-sm px-8 py-6 group
                transition-all duration-300 disabled:opacity-50"
            >
              <Mail className="mr-2 w-4 h-4" />
              {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SparkNotes;
