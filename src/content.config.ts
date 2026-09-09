import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blogCollection = defineCollection({
  loader: glob({ pattern:
    "**/*.{md,mdx}",
    base: "src/content/blog" }),
  schema: ({ image }) => z.object({
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    tags: z.array(z.string()).optional().nullable(),
    title: z.string().optional(),
    intro: z.string().optional(),
    heroImage: image().optional(),
    heroImageText: z.string().optional(),
    thumbNail: image().optional(),
    thumbNailText: z.string().optional(),
    datePublished: z.date().optional().nullable(),
    contactMessage: z.string().optional(),
    contactButtonText: z.string().optional(),
  })
});

const legalCollection = defineCollection({
  loader: glob({ pattern:
    "**/*.{md,mdx}",
    base: "src/content/legal" }),
  schema: z.object({
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    title: z.string().optional(),
    updatedDate: z.date().optional().nullable(),
  })
});

export const collections = {
  blog: blogCollection,
  legal: legalCollection,
};