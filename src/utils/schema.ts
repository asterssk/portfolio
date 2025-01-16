import { kBlogTypes } from "@/lib/constants";
import { z } from "zod";

export const blogSchema = z.object({
  id: z.string().nullish(),
  image: z.object({ preview: z.string(), file: z.any() }).nullish(),
  image_path: z.string().nullish(),
  title: z
    .string({ message: "Please enter blog title" })
    .min(1, "Please enter blog title"),
  is_published: z.boolean(),
  content: z
    .string({ message: "Please enter blog content" })
    .min(10, "Please enter at least 10 characters"),
  official_date: z.string().nullish(),
  categories: z
    .array(z.enum(kBlogTypes), { message: "Please select a valid category" })
    .nonempty("Please select at least 1 category"),
});
