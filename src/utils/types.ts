import { kBlogTypes } from "@/lib/constants";

export type ActionResponse = { success: boolean; message?: string };

export type TBlog = {
  id: string;
  image?: string;
  title: string;
  content: string;
  is_published: boolean;
  created_at: string;
  categories: (typeof kBlogTypes)[number][];
};
