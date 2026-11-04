import { defineCollection, z } from 'astro:content';
import { serviceIconNames } from '../lib/service-icons';

// Each service is one YAML file in src/content/services/. The filename is the URL slug
// (cleanings.yaml → /services/cleanings/). Both languages live side by side so a missing
// translation fails the build instead of showing English on a Spanish page.
const serviceText = z.object({
  title: z.string(),
  summary: z.string(), // one line, shown on the service cards
  description: z.string(), // intro paragraph at the top of the service page
  expect: z.string(), // "What to expect" paragraph
  benefits: z.array(z.string()).min(1),
});

const services = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number().int().positive(), // position on the homepage and /services
    // Show this service on the homepage. The first one (by order) gets the wide card.
    homepage: z.boolean().default(false),
    icon: z.string().refine((name) => (serviceIconNames as string[]).includes(name), {
      message: `Unknown icon. Use one of: ${serviceIconNames.join(', ')} (src/lib/service-icons.ts)`,
    }),
    en: serviceText,
    es: serviceText,
  }),
});

export const collections = { services };
