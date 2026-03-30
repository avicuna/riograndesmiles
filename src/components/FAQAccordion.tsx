import { useState, useCallback } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const contentId = `faq-content-${index}`;
        const headerId = `faq-header-${index}`;

        return (
          <div
            key={index}
            className="bg-white border border-neutral-200 rounded-lg overflow-hidden mb-3 shadow-sm hover:shadow transition-shadow"
          >
            <button
              id={headerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggle(index)}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white px-5 py-4 cursor-pointer font-semibold text-left flex justify-between items-center transition-colors"
            >
              <span>{item.question}</span>
              <span
                className="ml-3 flex-shrink-0 transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>
            <div
              id={contentId}
              role="region"
              aria-labelledby={headerId}
              className="transition-[max-height] duration-300 ease-in-out overflow-hidden"
              style={{ maxHeight: isOpen ? '1000px' : '0px' }}
            >
              <div className="px-5 py-5 text-neutral-700 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
