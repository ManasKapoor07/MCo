import React, { useEffect, useRef } from "react";

type RangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  values: [number, number]; // controlled committed values
  minGap?: number; // minimum allowed gap between low & high
  onChange: (vals: [number, number]) => void; // called while dragging
};

export default function RangeSlider({
  min,
  max,
  step = 100,
  values,
  minGap = 0,
  onChange,
}: RangeSliderProps) {
    const thumbOffset = "6px";
  const [lowCommitted, highCommitted] = values;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<"low" | "high" | null>(null);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const active = activeRef.current;
      if (!active) return;
      const el = trackRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      const raw = min + pct * (max - min);
      const stepped = Math.round(raw / step) * step;

      if (active === "low") {
        const newLow = Math.min(stepped, highCommitted - minGap);
        if (newLow !== lowCommitted) onChange([newLow, highCommitted]);
      } else {
        const newHigh = Math.max(stepped, lowCommitted + minGap);
        if (newHigh !== highCommitted) onChange([lowCommitted, newHigh]);
      }
    }

    function onUp() {
      activeRef.current = null;
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [min, max, step, minGap, lowCommitted, highCommitted, onChange]);

  // Helpers
  const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
  const clientXToSteppedValue = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return min;
    const rect = el.getBoundingClientRect();
    const pct = clamp((clientX - rect.left) / rect.width, 0, 1);
    const raw = min + pct * (max - min);
    return clamp(Math.round(raw / step) * step, min, max);
  };

  function pickThumbForClientX(clientX: number) {
    const val = clientXToSteppedValue(clientX);
    const mid = (lowCommitted + highCommitted) / 2;
    return val <= mid ? "low" : "high";
  }

  function handleTrackPointerDown(e: React.PointerEvent) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const pick = pickThumbForClientX(e.clientX);
    activeRef.current = pick;

    const v = clientXToSteppedValue(e.clientX);
    if (pick === "low") {
      const newLow = Math.min(v, highCommitted - minGap);
      onChange([newLow, highCommitted]);
    } else {
      const newHigh = Math.max(v, lowCommitted + minGap);
      onChange([lowCommitted, newHigh]);
    }

    (e.target as Element).setPointerCapture?.((e as unknown as PointerEvent).pointerId);
    e.preventDefault();
  }

  function onThumbPointerDown(which: "low" | "high", e: React.PointerEvent) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    activeRef.current = which;
    (e.target as Element).setPointerCapture?.((e as unknown as PointerEvent).pointerId);
    e.stopPropagation();
  }

  // visual track gradient
  const range = Math.max(1, max - min);
  const lowPct = ((lowCommitted - min) / range) * 100;
  const highPct = ((highCommitted - min) / range) * 100;
  const trackStyle: React.CSSProperties = {
    background: `linear-gradient(90deg, rgba(229,231,235,1) ${lowPct}%, rgba(59,130,246,1) ${lowPct}%, rgba(59,130,246,1) ${highPct}%, rgba(229,231,235,1) ${highPct}%)`,
  };

  // format INR with decimals
  const formatter = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const lowLabel = formatter.format(lowCommitted);
  const highLabel = formatter.format(highCommitted);

  const lowLeft = `${lowPct}%`;
  const highLeft = `${highPct}%`;

  return (
    <div className="w-full">

      {/* slider track + thumbs */}
      <div
        ref={trackRef}
        className="relative h-10 select-none ml-1"
        onPointerDown={handleTrackPointerDown}
        role="presentation"
      >
        {/* track */}
        <div className="absolute left-0 right-0 top-4 h-2 rounded-full" style={trackStyle} aria-hidden />

        {/* low thumb (visual) */}
        <div
          role="slider"
          aria-label="Minimum price"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={lowCommitted}
          tabIndex={0}
          onPointerDown={(e) => onThumbPointerDown("low", e)}
          className="absolute top-5 w-5 h-5 rounded-full shadow transform -translate-x-1/2"
          style={{
  left: `calc(${lowLeft} + 6px)`,
  transform: "translate(-50%, -50%)",
  background: "#2563eb",
  boxShadow: "0 6px 16px rgba(37,99,235,0.18)",
  cursor: "pointer",
  zIndex: activeRef.current === "low" ? 60 : 40,
}}
        />

        {/* high thumb (visual) */}
        <div
          role="slider"
          aria-label="Maximum price"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={highCommitted}
          tabIndex={0}
          onPointerDown={(e) => onThumbPointerDown("high", e)}
          className="absolute  top-5 w-5 h-5 rounded-full shadow transform -translate-x-1/2"
          style={{
  left: `calc(${highLeft} + 6px)`,
  transform: "translate(-50%, -50%)",
  background: "#2563eb",
  boxShadow: "0 6px 16px rgba(37,99,235,0.18)",
  cursor: "pointer",
  zIndex: activeRef.current === "high" ? 60 : 50,
}}
        />
      </div>

      {/* hidden native ranges for keyboard accessibility (kept unreachable by pointer) */}
      <div className="sr-only">
        <input
          aria-hidden
          type="range"
          min={min}
          max={max}
          step={step}
          value={lowCommitted}
          readOnly
        />
        <input
          aria-hidden
          type="range"
          min={min}
          max={max}
          step={step}
          value={highCommitted}
          readOnly
        />
      </div>

       <div className="flex justify-between items-center mb-3 text-sm">
        <div className="font-[Poppins] font-normal text-sm leading-none tracking-normal text-center">{lowLabel}</div>
        <div className="font-[Poppins] font-normal text-sm leading-none tracking-normal text-center">{highLabel}</div>
      </div>

      {/* small CSS for better pointer target & visual (thumb size controlled via inline styles above) */}
      <style>{`
        /* remove default number spinners if ever used elsewhere */
        input[type="number"] { -moz-appearance: textfield; }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>
    </div>
  );
}
