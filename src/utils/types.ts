import { kBlogTypes } from "@/lib/constants";

export type ActionResponse = { success: boolean; message?: string };

export type TBlog = {
  id: string;
  image?: string;
  title: string;
  content: string;
  created_at: string;
  type: (typeof kBlogTypes)[number];
};
