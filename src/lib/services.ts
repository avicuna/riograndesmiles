import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/utils';

export type Service = CollectionEntry<'services'>;

/** All services in display order. Every list of services on the site comes from here. */
export async function getServices(): Promise<Service[]> {
  const services = (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
  const orders = services.map((s) => s.data.order);
  const duplicate = orders.find((order, i) => orders.indexOf(order) !== i);
  if (duplicate !== undefined) {
    throw new Error(`[services] Two services share order ${duplicate}; each needs a unique position.`);
  }
  return services;
}

export function servicePath(service: Service, locale: Locale): string {
  return `${locale === 'es' ? '/es' : ''}/services/${service.id}/`;
}
