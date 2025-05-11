"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";

const ModernBlog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable Real-Time Applications with WebSocket",
      excerpt:
        "A deep dive into implementing real-time features using WebSocket, Redis, and Node.js for optimal performance and user experience.",
      category: "TECHNICAL",
      readTime: "8 min read",
      comments: 12,
      date: "2024-03-15",
      tags: ["WEBSOCKET", "NODE.JS", "REDIS"],
      slug: "building-scalable-realtime-apps",
    },
    {
      id: 2,
      title: "The Future of AI in Web Development",
      excerpt:
        "Exploring how AI tools are transforming the way we build and deploy web applications, from code generation to automated testing.",
      category: "AI",
      readTime: "6 min read",
      comments: 8,
      date: "2024-03-10",
      tags: ["AI", "OPENAI", "DEVELOPMENT"],
      slug: "ai-in-web-development",
    },
    {
      id: 3,
      title: "Optimizing React Performance in Large Applications",
      excerpt:
        "Practical strategies and best practices for maintaining high performance in complex React applications with real-world examples.",
      category: "FRONTEND",
      readTime: "10 min read",
      comments: 15,
      date: "2024-03-05",
      tags: ["REACT", "PERFORMANCE", "TYPESCRIPT"],
      slug: "optimizing-react-performance",
    },
  ];

  return (
    <section
      className="bg-gradient-to-b from-white/80 to-zinc-50/80 dark:from-zinc-800/95 dark:to-zinc-900/95"
      id="blog"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
        {/* Section Header */}
        <div className="flex items-center gap-4 lg:gap-6 mb-8 lg:mb-16">
          <div className="bg-gradient-to-br from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
            <BookOpen size={20} className="text-white lg:hidden" />
            <BookOpen size={24} className="text-white hidden lg:block" />
          </div>
          <div>
            <p className="md:text-sm lg:md:text-md font-mono text-zinc-500 dark:text-zinc-400 mb-1">
              006 / BLOG
            </p>
            <h2 className="text-2xl lg:text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
              Latest Articles
            </h2>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-white/90 dark:bg-zinc-800/90 shadow-lg dark:shadow-zinc-900/30 
                rounded-2xl lg:rounded-3xl overflow-hidden transition-all duration-300 
                hover:shadow-xl hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20
                hover:-translate-y-1 hover:scale-[1.02] group border border-zinc-100 dark:border-zinc-700/30"
            >
              <CardContent className="p-0">
                {/* Post Header */}
                <div className="p-6 lg:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-3 lg:px-4 py-2 rounded-full text-[10px] lg:text-xs font-mono">
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                        <Clock size={14} />
                        <span className="font-mono text-xs">{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="font-mono text-lg lg:text-xl font-bold text-zinc-900 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="font-mono text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Post Footer */}
                <div className="p-6 lg:p-8 pt-0 border-t border-zinc-100 dark:border-zinc-700/50">
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-zinc-100 dark:bg-zinc-700/80 text-zinc-900 dark:text-zinc-200 
                            hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400
                            px-3 py-1 rounded-full text-[10px] lg:text-xs font-mono transition-colors duration-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Meta and CTA */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                          <MessageSquare size={14} />
                          <span className="font-mono text-xs">{post.comments} comments</span>
                        </div>
                        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button
                          variant="ghost"
                          className="p-0 h-auto font-mono text-sm text-zinc-600 dark:text-zinc-300 
                            hover:text-blue-600 dark:hover:text-blue-400 group/button"
                        >
                          READ MORE
                          <ArrowRight
                            size={14}
                            className="ml-1 transition-transform group-hover/button:translate-x-1"
                          />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link href="/blog">
            <Button
              className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600
                text-white rounded-full font-mono font-bold md:text-md 2xl:text-lg px-8 py-6 group 
                transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              VIEW ALL ARTICLES
              <ArrowRight
                className="ml-2 transition-transform group-hover:translate-x-1"
                size={18}
              />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModernBlog;
