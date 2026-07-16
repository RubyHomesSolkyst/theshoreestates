/**
 * The Shore Estates brand mark.
 *
 * Rebuilt from the design brief (§6) since the referenced
 * `theshoreestates-logo-concept.svg` was not present in the project — swap the
 * SVG here if/when the final asset lands. The mark echoes the "horizon rule"
 * motif: a half-circle sun in ochre gold resting on a navy horizon line.
 *
 * `LogoMark` is the standalone icon; `Logo` pairs it with the Fraunces
 * wordmark (hidden on mobile per the header spec).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 34"
      role="img"
      aria-label="The Shore Estates"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sun — upper half-circle resting on the horizon */}
      <path d="M9 22a15 15 0 0 1 30 0Z" fill="#C9A227" />
      {/* Sun glow accent */}
      <path
        d="M15 22a9 9 0 0 1 18 0Z"
        fill="#12313F"
        fillOpacity="0.08"
      />
      {/* Horizon line with a subtle gradient toward the marker */}
      <line
        x1="2"
        y1="22"
        x2="46"
        y2="22"
        stroke="#12313F"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Glowing horizon marker (the sun's meeting point) */}
      <circle cx="24" cy="22" r="2.6" fill="#C9A227" stroke="#12313F" strokeWidth="1.2" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-8 w-auto shrink-0" />
      <span className="hidden font-display text-lg leading-none tracking-tight text-ink sm:inline">
        The Shore Estates
      </span>
    </span>
  );
}
