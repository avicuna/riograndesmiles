import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    serviceSlug: z.string(),
    icon: z.string(),
    titleEn: z.string(),
    titleEs: z.string(),
    descriptionEn: z.string(),
    descriptionEs: z.string(),
    order: z.number(),
  }),
});

export const collections = { services };
