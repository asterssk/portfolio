import { kBlogTypes } from "@/lib/constants";
import { z } from "zod";

export const blogSchema = z.object({
  id: z.string().nullish(),
  image: z.object({ preview: z.string(), file: z.any() }).nullish(),
  title: z
    .string({ message: "Please enter blog title" })
    .min(1, "Please enter blog title"),
  content: z
    .string({ message: "Please enter blog content" })
    .min(10, "Please enter at least 10 characters"),
  types: z
    .array(z.enum(kBlogTypes), { message: "Please select a valid blog type" })
    .nonempty("Please select at least 1 blog type"),
});
