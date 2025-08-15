import React, { useEffect, useRef, useState } from "react";

type RangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  values: [number, number]; // controlled committed values
  minGap?: number; // minimum allowed gap between low & high
  onChange: (vals: [number, number]) => void; // called while dragging and when typing is committed
};

export default function RangeSlider({
  min,
  max,
  step = 100,
  values,
  minGap = 0,
  onChange,
}: RangeSliderProps) {
  const [lowCommitted, highCommitted] = values;
  const trackRef = useRef<HTMLDivElement | null>(null);

  // local text inputs so typing doesn't jump
  const [lowInput, setLowInput] = useState(String(lowCommitted));
  const [highInput, setHighInput] = useState(String(highCommitted));

  useEffect(() => setLowInput(String(lowCommitted)), [lowCommitted]);
  useEffect(() => setHighInput(String(highCommitted)), [highCommitted]);

  // active thumb being dragged: "low" | "high" | null
  const activeRef = useRef<"low" | "high" | null>(null);

  // helper clamp
  const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

  // convert clientX -> stepped value
  function clientXToValue(clientX: number) {
    const el = trackRef.current;
    if (!el) return min;
    const rect = el.getBoundingClientRect();
    const pct = clamp((clientX - rect.left) / rect.width, 0, 1);
    const raw = min + pct * (max - min);
    // snap to step
    const stepped = Math.round(raw / step) * step;
    return clamp(stepped, min, max);
  }

  // pick nearest thumb to the pointer (ties biased by position)
  function pickThumbForClientX(clientX: number) {
    const val = clientXToValue(clientX);
    const mid = (lowCommitted + highCommitted) / 2;
    // if click value <= mid prefer low, else high (this avoids ambiguous picks)
    return val <= mid ? "low" : "high";
  }

  // pointer handlers (attach to window while dragging)
  useEffect(() => {
    function onMove(e: PointerEvent) {
      const active = activeRef.current;
      if (!active) return;
      const v = clientXToValue(e.clientX);
      if (active === "low") {
        // don't cross high
        const newLow = clamp(v, min, highCommitted - minGap);
        if (newLow !== lowCommitted) onChange([newLow, highCommitted]);
      } else {
        const newHigh = clamp(v, lowCommitted + minGap, max);
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
  }, [min, max, step, lowCommitted, highCommitted, onChange, minGap]);

  // when user presses pointer on track: pick thumb & start drag
  function handleTrackPointerDown(e: React.PointerEvent) {
    // ensure we only react to primary button/touch
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const picked = pickThumbForClientX(e.clientX);
    activeRef.current = picked;
    // move thumb to pointer immediately
    const v = clientXToValue(e.clientX);
    if (picked === "low") {
      const newLow = clamp(v, min, highCommitted - minGap);
      onChange([newLow, highCommitted]);
    } else {
      const newHigh = clamp(v, lowCommitted + minGap, max);
      onChange([lowCommitted, newHigh]);
    }
    // capture pointer on the element so we get subsequent events (optional)
    (e.target as Element).setPointerCapture?.((e as unknown as PointerEvent).pointerId);
    e.preventDefault();
  }

  // direct thumb pointer-down: prefer that thumb
  function onThumbPointerDown(which: "low" | "high", e: React.PointerEvent) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    activeRef.current = which;
    (e.target as Element).setPointerCapture?.((e as unknown as PointerEvent).pointerId);
    e.stopPropagation();
  }

  // track visual gradient
  const range = Math.max(1, max - min);
  const lowPct = ((lowCommitted - min) / range) * 100;
  const highPct = ((highCommitted - min) / range) * 100;
  const trackStyle: React.CSSProperties = {
    background: `linear-gradient(90deg, rgba(229,231,235,1) ${lowPct}%, rgba(59,130,246,1) ${lowPct}%, rgba(59,130,246,1) ${highPct}%, rgba(229,231,235,1) ${highPct}%)`,
  };

  // commit typed inputs on blur/enter
  function commitInputs() {
    const parsedLow = Number(lowInput);
    const parsedHigh = Number(highInput);
    const safeLow = Number.isFinite(parsedLow) ? parsedLow : lowCommitted;
    const safeHigh = Number.isFinite(parsedHigh) ? parsedHigh : highCommitted;

    let newLow = clamp(Math.round(safeLow / step) * step, min, max - minGap);
    let newHigh = clamp(Math.round(safeHigh / step) * step, newLow + minGap, max);

    // final fix if crossing
    if (newHigh - newLow < minGap) {
      newLow = clamp(safeLow, min, max - minGap);
      newHigh = clamp(newLow + minGap, min + minGap, max);
      // snap to step
      newLow = Math.round(newLow / step) * step;
      newHigh = Math.round(newHigh / step) * step;
    }

    setLowInput(String(newLow));
    setHighInput(String(newHigh));
    if (newLow !== lowCommitted || newHigh !== highCommitted) onChange([newLow, newHigh]);
  }
  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      commitInputs();
      (e.target as HTMLInputElement).blur();
    }
  }

  // thumb positions (for rendering)
  const lowLeft = `${lowPct}%`;
  const highLeft = `${highPct}%`;

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        className="relative h-10 select-none"
        onPointerDown={handleTrackPointerDown}
        role="presentation"
      >
        {/* visual track */}
        <div className="absolute left-0 right-0 top-4 h-2 rounded-full" style={trackStyle} aria-hidden />

        {/* invisible clickable rail overlay to make clicks easier (we already use trackRef.onPointerDown) */}
        <div className="absolute left-0 right-0 top-0 bottom-0" />

        {/* low thumb */}
        <div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={lowCommitted}
          tabIndex={0}
          onPointerDown={(e) => onThumbPointerDown("low", e)}
          className="absolute top-7 -translate-y-1/2 w-4 h-4 rounded-full shadow flex items-center justify-center transform -translate-x-1/2"
          style={{
            left: lowLeft,
            zIndex: activeRef.current === "low" ? 60 : 40,
            transform: "translate(-50%, -50%)",
            background: "#2563eb", // blue
            boxShadow: "0 4px 10px rgba(37,99,235,0.18)",
            cursor: "pointer",
          }}
        />

        {/* high thumb */}
        <div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={highCommitted}
          tabIndex={0}
          onPointerDown={(e) => onThumbPointerDown("high", e)}
          className="absolute top-7 -translate-y-1/2 w-4 h-4 rounded-full shadow flex items-center justify-center transform -translate-x-1/2"
          style={{
            left: highLeft,
            zIndex: activeRef.current === "high" ? 60 : 50,
            transform: "translate(-50%, -50%)",
            background: "#2563eb", // blue
            boxShadow: "0 4px 10px rgba(37,99,235,0.18)",
            cursor: "pointer",
          }}
        />
      </div>

      {/* number inputs (no spinners) */}
      <div className="flex gap-3 mt-3 text-sm items-center">
        <input
          aria-label="Minimum price input"
          type="number"
          inputMode="numeric"
          value={lowInput}
          onChange={(e) => setLowInput(e.target.value)}
          onBlur={commitInputs}
          onKeyDown={onInputKeyDown}
          className="w-28 px-2 py-1 border rounded text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none
                     [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <input
          aria-label="Maximum price input"
          type="number"
          inputMode="numeric"
          value={highInput}
          onChange={(e) => setHighInput(e.target.value)}
          onBlur={commitInputs}
          onKeyDown={onInputKeyDown}
          className="w-28 px-2 py-1 border rounded text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none
                     [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
    </div>
  );
}
