import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates the estimated read time for a given content string
 * @param content The content to calculate read time for (HTML or plain text)
 * @param wordsPerMinute Average reading speed (default: 200 words per minute)
 * @returns Formatted read time string (e.g. "5 min read")
 */
export function calculateReadTime(content: string, wordsPerMinute = 200): string {
  // Remove HTML tags and decode HTML entities
  const plainText = content
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
    .replace(/&amp;/g, "&") // Replace &amp; with &
    .replace(/&lt;/g, "<") // Replace &lt; with <
    .replace(/&gt;/g, ">") // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'"); // Replace &#39; with '

  // Count words (split by whitespace and filter out empty strings)
  const wordCount = plainText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  // Calculate read time in minutes
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  // Return formatted string
  return `${readTimeMinutes} min read`;
}
