import { useState, useEffect, useCallback, useRef } from 'react';

interface Review {
  text: string;
  author: string;
}

interface Props {
  reviews: Review[];
}

export default function ReviewCarousel({ reviews }: Props) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (prefersReducedMotion.current) return;
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent((prev) => (prev + 1) % reviews.length);
      }
    }, 8000);
  }, [reviews.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index);
      startTimer();
    },
    [startTimer]
  );

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
    startTimer();
  }, [reviews.length, startTimer]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % reviews.length);
    startTimer();
  }, [reviews.length, startTimer]);

  const handlePause = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const handleResume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  if (reviews.length === 0) return null;

  const review = reviews[current];

  return (
    <div
      className="relative bg-bg-card border border-line rounded-lg max-w-2xl mx-auto overflow-hidden"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocus={handlePause}
      onBlur={handleResume}
    >
      {/* Prev button */}
      <button
        onClick={prev}
        aria-label="Previous review"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-primary-500/90 hover:bg-primary-700 text-white w-10 h-10 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center z-10 cursor-pointer transition-colors"
      >
        ❮
      </button>

      {/* Next button */}
      <button
        onClick={next}
        aria-label="Next review"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary-500/90 hover:bg-primary-700 text-white w-10 h-10 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center z-10 cursor-pointer transition-colors"
      >
        ❯
      </button>

      {/* Review content */}
      <div aria-live="polite" className="px-10 md:px-16 py-10 text-center">
        <div className="text-xl text-gold mb-4 tracking-wider" aria-hidden="true">
          ★★★★★
        </div>
        <p className="text-lg italic text-ink-2 leading-relaxed mb-5 font-display">
          &ldquo;{review.text}&rdquo;
        </p>
        <p className="font-medium text-primary-500">{review.author}</p>
      </div>

      {/* Dots */}
      <div className="flex gap-2 justify-center mt-0 pb-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to review ${index + 1}`}
            className={`w-2.5 h-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer bg-transparent border-0 p-0`}
          >
            <span
              className={`block w-2.5 h-2.5 rounded-full transition-colors ${
                index === current ? 'bg-primary-500' : 'bg-line-2'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
