export const blogBucket = "blogs";
export const machineIdCookieKey = "machineId";

export const adminPagePreviewPaths = [
  "/blog/blog-form.png",
  "/blog/admin-content.png",
  "/blog/content.png",
] as const;

export const kBlogTypes = ["life", "career", "achievement"] as const;

export const blogTypesExt: Record<
  (typeof kBlogTypes)[number],
  { label: string }
> = {
  life: { label: "Life" },
  career: { label: "Career" },
  achievement: { label: "Achievement" },
};
