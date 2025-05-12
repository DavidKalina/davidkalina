"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";

const ModernBlog = () => {
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
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white dark:bg-zinc-900 rounded-2xl p-6 
                border border-zinc-100 dark:border-zinc-700/50 
                hover:border-zinc-200 dark:hover:border-zinc-600 
                transition-all duration-300 hover:shadow-lg"
            >
              <div className="space-y-4">
                {/* Category Badge */}
                <Badge
                  className="bg-[#333] dark:bg-zinc-700 text-white px-3 lg:px-4 py-2 
                  rounded-full text-[10px] lg:text-xs font-mono"
                >
                  {post.category}
                </Badge>

                {/* Title */}
                <h3
                  className="font-mono text-xl font-bold text-zinc-900 dark:text-zinc-200 
                  group-hover:text-[#333] dark:group-hover:text-white transition-colors duration-300"
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="font-mono text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400 pt-2">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span className="font-mono text-xs">{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={14} />
                    <span className="font-mono text-xs">{post.comments} comments</span>
                  </div>
                </div>

                {/* Read More Button */}
                <div className="pt-4">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-mono text-sm text-zinc-600 dark:text-zinc-300 
                      group-hover:text-[#333] dark:group-hover:text-white"
                  >
                    READ ARTICLE
                    <ArrowRight
                      size={16}
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    />
                  </Button>
                </div>
              </div>
            </Link>
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
