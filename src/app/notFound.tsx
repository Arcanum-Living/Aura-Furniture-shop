import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bg-main)] text-[var(--text-dark)] flex items-center justify-center px-6">
      <div className="w-full max-w-4xl text-center">
        {/* Decorative top line */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="h-px w-16 bg-[var(--brand-taupe)]/40" />
          <span className="text-xs tracking-[0.35em] uppercase text-[var(--brand-taupe)]">
            Aura Furniture
          </span>
          <span className="h-px w-16 bg-[var(--brand-taupe)]/40" />
        </div>

        {/* 404 */}
        <div className="relative mb-6">
          <h1 className="font-serif text-[clamp(7rem,20vw,14rem)] leading-none font-medium tracking-[-0.06em] text-[var(--brand-stone)]">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-4xl md:text-5xl italic text-[var(--brand-taupe)]">
              Lost in space
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-xl">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            This space doesn&apos;t exist.
          </h2>

          <p className="font-sans text-base md:text-lg leading-7 text-[var(--brand-taupe)] mb-9">
            It looks like the page you&apos;re looking for has moved,
            disappeared, or never existed. Let&apos;s get you back to
            something beautiful.
          </p>

          {/* CTA */}
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-[var(--text-dark)] text-[var(--bg-main)] px-8 py-4 text-sm uppercase tracking-[0.18em] font-sans transition-all duration-300 hover:bg-[var(--brand-taupe)] hover:-translate-y-0.5"
          >
            <span>Back to Home</span>

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M5 12H19M19 12L13 6M19 12L13 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 flex justify-center">
          <div className="w-20 h-20 border border-[var(--brand-taupe)]/20 rounded-full flex items-center justify-center">
            <div className="w-10 h-10 border border-[var(--brand-gold)]/50 rounded-full" />
          </div>
        </div>
      </div>
    </main>
  )
}

