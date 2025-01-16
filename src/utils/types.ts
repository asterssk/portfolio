import { kBlogTypes } from "@/lib/constants";

export type ActionResponse = { success: boolean; message?: string };

export type TBlog = {
  id: string;
  official_date: string;
  image_path?: string;
  title: string;
  content: string;
  is_published: boolean;
  created_at: string;
  categories: (typeof kBlogTypes)[number][];
};
