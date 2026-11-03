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
// Upper denture seen from the front: gum band with a row of teeth.
const DENTURE_GUM = '<path d="M3 7.5c3.5-2.7 14.5-2.7 18 0V10c-3.5 1.4-14.5 1.4-18 0Z"/>';
const DENTURE_TEETH =
  '<path d="M4.6 10.8v3.4a1.6 1.6 0 0 0 3.2 0v-2.9M7.8 11.3v4.3a1.6 1.6 0 0 0 3.2 0v-4.1M11 11.5v4.6a1.6 1.6 0 0 0 3.2 0v-4.6M14.2 11.5v4.1a1.6 1.6 0 0 0 3.2 0v-4.3M17.4 11.3v2.9a1.6 1.6 0 0 0 3.2 0v-3.4"/>';

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
  dentures: DENTURE_GUM + DENTURE_TEETH,
  partials:
    '<path d="M7 8h10v2.8H7Z"/><path d="M8.2 10.8v4a1.9 1.9 0 0 0 3.8 0v-4M12 10.8v4a1.9 1.9 0 0 0 3.8 0v-4"/><path d="M7 9.4H4.4a1.9 1.9 0 0 0 0 3.8M17 9.4h2.6a1.9 1.9 0 0 1 0 3.8"/>',
  'denture-repair': DENTURE_GUM + DENTURE_TEETH + '<path d="M12.6 4.6l-1.2 2.1 1.4 1.5-1.1 2.4" stroke-width="1.4"/>',
  bleaching: tooth('translate(-1.4 1.6) scale(.9)', 0.9) + sparkle(19.2, 4.2, 2.6) + sparkle(15.5, 2.4, 1.3),
  veneers: tooth() + '<path d="M6.1 8.3c0-1.9 1.2-3 2.9-3 1.2 0 1.9.6 3 .6s1.8-.6 3-.6c1.7 0 2.9 1.1 2.9 3"/>',
  'root-canals': tooth() + '<path d="M9.4 9.4c1.7 1 3.5 1 5.2 0M10 10.2l.6 7.8M14 10.2l-.6 7.8"/>',
  extractions: tooth('translate(2.4 4.4) scale(.8)', 0.8) + '<path d="M12 6.2V1.4M9.8 3.6 12 1.4l2.2 2.2"/>',
  'wisdom-teeth':
    '<path d="M2.5 5c3.2 1.2 6.3 1.2 9.5 0s6.3-1.2 9.5 0"/>' + tooth('translate(12.8 15) rotate(28) scale(.66) translate(-12 -12)', 0.66),
} as const;

export type ServiceIconName = keyof typeof serviceIcons;
export const serviceIconNames = Object.keys(serviceIcons) as ServiceIconName[];
