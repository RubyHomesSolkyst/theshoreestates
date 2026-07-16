/**
 * Compact SVG country flags for the language switcher.
 *
 * Locale → flag mapping (brief request):
 *   en → GB, pl → PL, ro → RO, fr → FR, nl → NL, nl-be → BE, hu → HU
 *
 * The `code` (GB, PL, …) is exposed as the accessible label / tooltip.
 */
export type FlagCode = "GB" | "PL" | "RO" | "FR" | "NL" | "BE" | "HU";

function Frame({
  children,
  code,
}: {
  children: React.ReactNode;
  code: FlagCode;
}) {
  return (
    <svg
      viewBox="0 0 60 40"
      role="img"
      aria-label={code}
      xmlns="http://www.w3.org/2000/svg"
      className="block h-full w-full"
    >
      <title>{code}</title>
      {children}
    </svg>
  );
}

function GB() {
  return (
    <Frame code="GB">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="13" />
      <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="7" />
    </Frame>
  );
}

function PL() {
  return (
    <Frame code="PL">
      <rect width="60" height="20" fill="#fff" />
      <rect y="20" width="60" height="20" fill="#DC143C" />
    </Frame>
  );
}

function RO() {
  return (
    <Frame code="RO">
      <rect width="20" height="40" fill="#002B7F" />
      <rect x="20" width="20" height="40" fill="#FCD116" />
      <rect x="40" width="20" height="40" fill="#CE1126" />
    </Frame>
  );
}

function FR() {
  return (
    <Frame code="FR">
      <rect width="20" height="40" fill="#002395" />
      <rect x="20" width="20" height="40" fill="#fff" />
      <rect x="40" width="20" height="40" fill="#ED2939" />
    </Frame>
  );
}

function NL() {
  return (
    <Frame code="NL">
      <rect width="60" height="13.33" fill="#AE1C28" />
      <rect y="13.33" width="60" height="13.34" fill="#fff" />
      <rect y="26.67" width="60" height="13.33" fill="#21468B" />
    </Frame>
  );
}

function BE() {
  return (
    <Frame code="BE">
      <rect width="20" height="40" fill="#000" />
      <rect x="20" width="20" height="40" fill="#FDDA24" />
      <rect x="40" width="20" height="40" fill="#EF3340" />
    </Frame>
  );
}

function HU() {
  return (
    <Frame code="HU">
      <rect width="60" height="13.33" fill="#CD2A3E" />
      <rect y="13.33" width="60" height="13.34" fill="#fff" />
      <rect y="26.67" width="60" height="13.33" fill="#436F4D" />
    </Frame>
  );
}

const FLAGS: Record<FlagCode, () => React.JSX.Element> = {
  GB,
  PL,
  RO,
  FR,
  NL,
  BE,
  HU,
};

export function Flag({
  code,
  className,
}: {
  code: FlagCode;
  className?: string;
}) {
  const Component = FLAGS[code];
  return (
    <span
      className={`inline-block overflow-hidden rounded-[2px] ring-1 ring-ink/15 ${className ?? ""}`}
    >
      <Component />
    </span>
  );
}
