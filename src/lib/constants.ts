export const kBlogTypes = ["life", "career", "achievements"] as const;

export const blogTypesExt: Record<
  (typeof kBlogTypes)[number],
  { label: string }
> = {
  life: { label: "Life" },
  career: { label: "Career" },
  achievements: { label: "Achievements" },
};
