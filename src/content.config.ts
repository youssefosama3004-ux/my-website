import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string(),
      description: z.string(),
      cover: image(),
      type: z.string(),
      services: z.array(z.string()),
      tools: z.array(z.string()),
      year: z.string(),
      dateRange: z.string(),
      role: z.string(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
    }),
});

export const collections = { projects };
