import { useEffect, useRef } from 'react';

interface WeaveSchedulerProps {
  className?: string;
}

export default function WeaveScheduler({ className = '' }: WeaveSchedulerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || !containerRef.current) return;
    scriptLoaded.current = true;

    // TODO: Replace with actual Weave scheduling snippet URL and config
    // The practice's Weave account will provide a specific script tag like:
    // <script src="https://scheduler.weaveportal.com/widget/PRACTICE_ID.js"></script>
    // For now, render a placeholder showing the widget will go here

    const placeholder = document.createElement('div');
    placeholder.className = 'text-center py-12 px-6 bg-primary-50 rounded-xl border-2 border-dashed border-primary-200';
    placeholder.innerHTML = `
      <div class="text-4xl mb-4">📅</div>
      <h3 class="text-lg font-semibold text-primary-700 mb-2">Online Scheduling</h3>
      <p class="text-neutral-500 text-sm max-w-md mx-auto">
        Weave scheduling widget will load here once configured with the practice's Weave account credentials.
      </p>
    `;
    containerRef.current.appendChild(placeholder);
  }, []);

  return <div ref={containerRef} className={className} />;
}
