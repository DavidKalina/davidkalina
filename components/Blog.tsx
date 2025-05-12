"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";
import { type BlogPost } from "@/lib/blog-data";

interface BlogProps {
  posts: BlogPost[];
}

const ModernBlog = ({ posts }: BlogProps) => {
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
          {posts?.length ? (
            posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white dark:bg-zinc-800 rounded-2xl lg:rounded-3xl 
                  border-2 border-zinc-100 dark:border-zinc-700/50 
                  hover:border-black dark:hover:border-white 
                  transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50
                  hover:-translate-y-1 hover:scale-[1.01] overflow-hidden"
              >
                <div className="relative h-full">
                  {/* Gradient Header */}
                  <div className="relative bg-gradient-to-br from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-6 lg:p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.04),rgba(255,255,255,0))] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      {/* Category Badge */}
                      <Badge
                        className="bg-white/10 text-white px-3 lg:px-4 py-2 
                        rounded-full text-[10px] lg:text-xs font-mono mb-4"
                      >
                        {post.category}
                      </Badge>

                      {/* Title */}
                      <h3
                        className="font-mono text-xl font-bold text-white mb-3
                        group-hover:text-white/90 transition-colors duration-300"
                      >
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="font-mono text-sm text-white/60 line-clamp-3">{post.excerpt}</p>
                    </div>
                  </div>

                  {/* Content Footer */}
                  <div className="p-6 lg:p-8 bg-white dark:bg-zinc-800">
                    <div className="space-y-6">
                      {/* Meta Information */}
                      <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
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
                      <Button
                        variant="ghost"
                        className="p-0 h-auto font-mono text-sm text-zinc-600 dark:text-zinc-300 
                          group-hover:text-[#333] dark:group-hover:text-white w-full justify-between"
                      >
                        <span>READ ARTICLE</span>
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-full p-4 mb-6">
                <BookOpen className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
              </div>
              <h3 className="font-mono text-xl font-bold text-zinc-900 dark:text-zinc-200 mb-2">
                No Articles Yet
              </h3>
              <p className="font-mono text-zinc-600 dark:text-zinc-400 max-w-md">
                I&apos;m currently working on some exciting articles. Check back soon for new
                content!
              </p>
            </div>
          )}
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
