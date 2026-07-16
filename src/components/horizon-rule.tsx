/**
 * Signature element (brief §6): a horizon rule that traces the sun's arc across
 * the coast through the day. Each instance takes a position (0 dawn → 1 dusk)
 * and renders a gradient line with a glowing marker at that position.
 */
export function HorizonRule({ position = 0.5 }: { position?: number }) {
  const hue = 45 - position * 90; // gold (45) toward deep blue-violet
  const glow = `hsl(${((hue % 360) + 360) % 360}, 70%, 60%)`;
  return (
    <div className="relative h-px w-full overflow-visible bg-gradient-to-r from-transparent via-ink/15 to-transparent">
      <div
        className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
        style={{
          left: `${position * 100}%`,
          backgroundColor: glow,
          boxShadow: `0 0 14px 3px ${glow}`,
        }}
      />
    </div>
  );
}

export function HorizonDivider({ position = 0.5 }: { position?: number }) {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <HorizonRule position={position} />
    </div>
  );
}
