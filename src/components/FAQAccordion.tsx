import { useState, useCallback } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: FAQItem[];
}

// IDs must be unique on the page, and the FAQ page has six accordions. Each Astro island is its own
// React root, so useId() would repeat across them; derive a stable prefix from the first question instead.
const slug = (text: string) => text.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);

export default function FAQAccordion({ items }: Props) {
  const idPrefix = `faq-${slug(items[0]?.question ?? 'list')}`;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="max-w-[900px] mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const contentId = `${idPrefix}-answer-${index}`;
        const headerId = `${idPrefix}-question-${index}`;

        return (
          <div
            key={index}
            className={`border-b border-line-2 py-6 ${index === 0 ? 'border-t border-t-line-2' : ''}`}
          >
            <button
              id={headerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center gap-6 cursor-pointer bg-transparent border-none p-0 text-left"
            >
              <span className="flex-1 min-w-0 font-display text-[1.25rem] font-medium text-ink">
                {item.question}
              </span>
              <span
                className={`w-8 h-8 rounded-full border flex-shrink-0 grid place-items-center transition-all duration-[250ms] motion-reduce:transition-none ${
                  isOpen
                    ? 'bg-primary-500 text-white border-primary-500 rotate-45'
                    : 'bg-bg-card text-ink-2 border-line-2 rotate-0'
                }`}
                aria-hidden="true"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            {/* Animates between 0fr and 1fr grid rows, so an open answer is always its full height
                (a fixed max-height cut long answers off on narrow phones). */}
            <div
              id={contentId}
              role="region"
              aria-labelledby={headerId}
              aria-hidden={!isOpen}
              className="grid transition-[grid-template-rows] duration-[350ms] ease-in-out motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden min-h-0">
                <p className="pt-4 text-ink-2 text-base leading-[1.7]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
