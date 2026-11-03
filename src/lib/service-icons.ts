// Line icons for the dental services: 24×24 grid, drawn with `currentColor` strokes.
// Shared style: 1.6 stroke, round caps and joins (set by ServiceIcon.astro).
// Each value is the inner SVG markup for that icon.

// Molar outline reused by several icons, so they all share the same tooth.
const TOOTH =
  'M8.2 3.5C5.6 3.5 4 5.4 4 7.8c0 2 .8 3.4 1.4 5.1.5 1.5.8 3.2 1 5.1.2 1.6.8 2.5 1.7 2.5 1 0 1.5-1 1.8-2.6.3-1.8.8-3.2 2.1-3.2s1.8 1.4 2.1 3.2c.3 1.6.8 2.6 1.8 2.6.9 0 1.5-.9 1.7-2.5.2-1.9.5-3.6 1-5.1.6-1.7 1.4-3.1 1.4-5.1 0-2.4-1.6-4.3-4.2-4.3-1.6 0-2.4.8-3.8.8s-2.2-.8-3.8-.8Z';
// For a scaled-down tooth, thicken its stroke so it matches the other icons at any size.
const tooth = (transform = '', scale = 1) =>
  `<path d="${TOOTH}"${transform ? ` transform="${transform}" stroke-width="${+(1.6 / scale).toFixed(2)}"` : ''}/>`;
const sparkle = (x: number, y: number, r: number) =>
  `<path d="M${x} ${y - r}l${r * 0.3} ${r * 0.7} ${r * 0.7} ${r * 0.3}-${r * 0.7} ${r * 0.3}-${r * 0.3} ${r * 0.7}-${r * 0.3}-${r * 0.7}-${r * 0.7}-${r * 0.3} ${r * 0.7}-${r * 0.3}Z" fill="currentColor"/>`;
// Full denture, front view (the usual way false teeth are drawn): upper gum and teeth,
// a bite gap, then lower teeth and gum.
const DENTURES =
  '<path d="M2.5 7.2V5.3c0-.8.5-1.4 1.3-1.6C5.6 3.3 8.4 3 12 3s6.4.3 8.2.7c.8.2 1.3.8 1.3 1.6v1.9Z"/>' +
  '<path d="M3.6 7.2v1.5a2.1 2.1 0 0 0 4.2 0V7.2M7.8 7.2v1.5a2.1 2.1 0 0 0 4.2 0V7.2M12.0 7.2v1.5a2.1 2.1 0 0 0 4.2 0V7.2M16.2 7.2v1.5a2.1 2.1 0 0 0 4.2 0V7.2"/>' +
  '<path d="M3.6 16.8v-1.5a2.1 2.1 0 0 1 4.2 0v1.5M7.8 16.8v-1.5a2.1 2.1 0 0 1 4.2 0v1.5M12.0 16.8v-1.5a2.1 2.1 0 0 1 4.2 0v1.5M16.2 16.8v-1.5a2.1 2.1 0 0 1 4.2 0v1.5"/>' +
  '<path d="M2.5 16.8v1.9c0 .8.5 1.4 1.3 1.6 1.8.4 4.6.7 8.2.7s6.4-.3 8.2-.7c.8-.2 1.3-.8 1.3-1.6v-1.9Z"/>';
// Wrench adapted from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Contributors.
const WRENCH =
  '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>';

export const serviceIcons = {
  cleanings:
    '<rect x="2.5" y="14.5" width="10.5" height="2.4" rx="1.2"/><rect x="13" y="13.3" width="8.5" height="4.8" rx="1.6"/><path d="M14.8 13.3V10M17.25 13.3V9M19.7 13.3V10"/>' +
    sparkle(6.5, 6.5, 2.4),
  fillings: tooth() + '<circle cx="12" cy="9.2" r="2.1" fill="currentColor" stroke="none"/>',
  crowns: tooth() + '<path d="M5.1 11.4c4.5 1.4 9.3 1.4 13.8 0"/>',
  bridges:
    '<rect x="3" y="4.5" width="6" height="7" rx="2.2"/><rect x="9" y="4.5" width="6" height="7" rx="2.2"/><rect x="15" y="4.5" width="6" height="7" rx="2.2"/><path d="M4.8 11.5l.9 7.3M7.3 11.5l-.4 7.3M16.7 11.5l.4 7.3M19.2 11.5l-.9 7.3"/>',
  implants:
    '<path d="M7.2 3.2h9.6a1.7 1.7 0 0 1 1.7 1.7v2.2a2.6 2.6 0 0 1-2.6 2.6H8.1a2.6 2.6 0 0 1-2.6-2.6V4.9a1.7 1.7 0 0 1 1.7-1.7Z"/><path d="M10.2 9.7v2.1h3.6V9.7M10 11.8h4l-.6 9h-2.8Z"/><path d="M9.2 14.6h5.6M9.5 17.5h5"/>',
  dentures: DENTURES,
  partials: '<g transform="translate(12 12) scale(1.15) translate(-12 -11.4)" stroke-width="1.39">' +
    '<path d="M2.5 11.2V9.3c0-.8.5-1.4 1.3-1.6C5.6 7.3 8.4 7 12 7s6.4.3 8.2.7c.8.2 1.3.8 1.3 1.6v1.9Z"/>' +
    '<path d="M7.8 11.2v1.5a2.1 2.1 0 0 0 4.2 0v-1.5M12.0 11.2v1.5a2.1 2.1 0 0 0 4.2 0v-1.5"/>' +
    '<path d="M4.6 11.2v2.3a1.3 1.3 0 0 0 2.6 0M19.4 11.2v2.3a1.3 1.3 0 0 1-2.6 0"/></g>',
  'denture-repair': `<g transform="translate(0 6.2) scale(.74)" stroke-width="2.16">${DENTURES}</g>` +
    `<g transform="translate(12.6 0) scale(.5)" stroke-width="3.2">${WRENCH}</g>`,
  bleaching: tooth('translate(-1.4 1.6) scale(.9)', 0.9) + sparkle(19.2, 4.2, 2.6) + sparkle(15.5, 2.4, 1.3),
  veneers: tooth() + '<path d="M6.1 8.3c0-1.9 1.2-3 2.9-3 1.2 0 1.9.6 3 .6s1.8-.6 3-.6c1.7 0 2.9 1.1 2.9 3"/>',
  'root-canals': tooth() + '<path d="M9.4 9.4c1.7 1 3.5 1 5.2 0M10 10.2l.6 7.8M14 10.2l-.6 7.8"/>',
  extractions: tooth('translate(2.4 4.4) scale(.8)', 0.8) + '<path d="M12 6.2V1.4M9.8 3.6 12 1.4l2.2 2.2"/>',
  'wisdom-teeth':
    '<path d="M2.5 5c3.2 1.2 6.3 1.2 9.5 0s6.3-1.2 9.5 0"/>' + tooth('translate(12.8 15) rotate(28) scale(.66) translate(-12 -12)', 0.66),
} as const;

export type ServiceIconName = keyof typeof serviceIcons;
export const serviceIconNames = Object.keys(serviceIcons) as ServiceIconName[];
