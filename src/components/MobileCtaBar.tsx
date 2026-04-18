export default function MobileCtaBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-bg-card border-t border-line shadow-[0_-2px_10px_rgba(0,0,0,0.08)] px-4 py-3 md:hidden">
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        {/* Call button */}
        <a
          href="tel:+15058771113"
          aria-label="Call us at (505) 877-1113"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-500 text-white font-medium text-sm rounded-full px-4 py-2.5 min-h-[44px] hover:bg-primary-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          Call
        </a>

        {/* Text button */}
        <a
          href="sms:+15058771113"
          aria-label="Text us at (505) 877-1113"
          className="flex-1 inline-flex items-center justify-center gap-2 border border-line-2 text-ink font-medium text-sm rounded-full px-4 py-2.5 min-h-[44px] hover:bg-bg-warm transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          Text
        </a>
      </div>
    </div>
  );
}
