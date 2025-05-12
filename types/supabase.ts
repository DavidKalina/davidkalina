export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          category: string;
          date: string;
          read_time: string;
          comments_count: number;
          markdown_content: string;
          html_content: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          category: string;
          date: string;
          read_time: string;
          comments_count?: number;
          markdown_content: string;
          html_content?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          category?: string;
          date?: string;
          read_time?: string;
          comments_count?: number;
          markdown_content?: string;
          html_content?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
      };
      article_tags: {
        Row: {
          article_id: string;
          tag_id: string;
        };
        Insert: {
          article_id: string;
          tag_id: string;
        };
        Update: {
          article_id?: string;
          tag_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
