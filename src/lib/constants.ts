export const kBlogTypes = ["life", "career", "achievement"] as const;
export const kCodingSkills = [
  "js",
  "tailwind",
  "next",
  "postgres",
  "flutter",
] as const;
export const kDesignSkills = ["photoshop", "visio", "figma"] as const;

export const blogTypesExt: Record<
  (typeof kBlogTypes)[number],
  { label: string }
> = {
  life: { label: "Life" },
  career: { label: "Career" },
  achievement: { label: "Achievement" },
};

export const codingSkillsExt: Record<
  (typeof kCodingSkills)[number],
  { label: string }
> = {
  js: {
    label: "Javascript",
  },
  tailwind: {
    label: "TailwindCSS",
  },
  next: {
    label: "NextJS",
  },
  postgres: {
    label: "PostgreSQL",
  },
  flutter: {
    label: "Flutter",
  },
};

export const designSkillsExt: Record<
  (typeof kDesignSkills)[number],
  { label: string }
> = {
  photoshop: {
    label: "Photoshop",
  },
  visio: {
    label: "MS Visio",
  },
  figma: {
    label: "Figma",
  },
};
