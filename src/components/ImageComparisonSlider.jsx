import { useState } from "react";

export default function ImageComparisonSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforePoints = [],
  afterPoints = [],
}) {
  const [position, setPosition] = useState(50);

  return (
    <figure className="image-comparison-block my-12 w-full max-w-none">
      <span className="sr-only">{afterAlt}</span>
      <div className="relative h-[65vh] min-h-[28rem] max-h-[46rem] overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
        <div
          className="absolute inset-0 overflow-x-hidden overflow-y-auto overscroll-contain [scrollbar-gutter:stable]"
          aria-label="Scrollable before and after product-page screenshots"
          role="region"
          tabIndex={0}
        >
          <div className="relative w-full">
            <img
              src={beforeSrc}
              alt={beforeAlt}
              className="block h-auto w-full select-none"
              draggable="false"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${position}%)` }}
              aria-hidden="true"
            >
              <img
                src={afterSrc}
                alt=""
                className="h-full w-full select-none object-fill object-top"
                draggable="false"
              />
            </div>
          </div>
        </div>

        <span className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
          Before
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-medium uppercase tracking-wider text-white shadow-sm">
          After
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.16)]"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-black/75 text-sm text-white shadow-xl backdrop-blur-sm">
            <span aria-hidden="true">↔</span>
          </span>
          <span className="absolute left-1/2 top-[calc(50%+2.25rem)] -translate-x-1/2 rounded-full bg-black/75 px-2 py-1 text-[10px] font-medium text-white tabular-nums">
            {position}%
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Compare the old and redesigned Koolen product pages"
          aria-valuetext={`${position}% of the old design visible`}
          className="absolute left-0 top-1/2 z-20 h-14 w-full -translate-y-1/2 cursor-ew-resize touch-none opacity-0"
        />
      </div>

      <figcaption className="mt-3 text-center text-sm text-fg-muted">
        Scroll inside the frame to explore both full pages. Drag the divider or use the arrow keys to compare them.
      </figcaption>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="rounded-lg border border-border bg-surface p-5 md:p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted">
            Old experience
          </p>
          <ul className="m-0 space-y-3 pl-5 text-sm leading-relaxed text-fg-secondary">
            {beforePoints.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </section>
        <section className="rounded-lg border border-[color-mix(in_srgb,var(--accent)_38%,var(--border-default))] bg-[color-mix(in_srgb,var(--accent)_8%,var(--bg-surface))] p-5 md:p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Redesigned experience
          </p>
          <ul className="m-0 space-y-3 pl-5 text-sm leading-relaxed text-fg-secondary">
            {afterPoints.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </section>
      </div>
    </figure>
  );
}
