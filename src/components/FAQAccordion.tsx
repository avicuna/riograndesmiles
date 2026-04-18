import { useState, useCallback } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="max-w-[900px] mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const contentId = `faq-content-${index}`;
        const headerId = `faq-header-${index}`;

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
                className={`w-8 h-8 rounded-full border flex-shrink-0 grid place-items-center transition-all duration-[250ms] ${
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
            <div
              id={contentId}
              role="region"
              aria-labelledby={headerId}
              className="overflow-hidden transition-[max-height,padding] duration-[350ms] ease-in-out"
              style={{
                maxHeight: isOpen ? '400px' : '0px',
                paddingTop: isOpen ? '16px' : '0px',
              }}
            >
              <p className="text-ink-2 text-base leading-[1.7]">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
