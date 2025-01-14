export const blogBucket = "blogs";

export const kBlogTypes = ["life", "career", "achievement"] as const;

export const blogTypesExt: Record<
  (typeof kBlogTypes)[number],
  { label: string }
> = {
  life: { label: "Life" },
  career: { label: "Career" },
  achievement: { label: "Achievement" },
};
