import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MyModel from "../MyModel";
import Loader from "../components/Loader";
import bath from "../assets/bath.svg";

function ControlAction({ icon, label }) {
  return (
    <div className="text-center min-w-[70px]">
      <div className="text-lg mb-0.5">{icon}</div>
      <div className="text-xs text-[#c1cbdd] font-medium">{label}</div>
    </div>
  );
}

function NavControl({ icon, label }) {
  return (
    <div className="text-center min-w-[90px]">
      <div>{icon}</div>
      <div className="text-[10px] text-[#b5bedf]" style={{ marginTop: 2 }}>
        {label}
      </div>
    </div>
  );
}

export default function Three() {
  return (
    <div
      className="w-full h-[500px] relative overflow-hidden rounded-xl"

      style={{
        background: `
          radial-gradient(
            ellipse at 60% 80%,
            rgba(64,112,209,0.1) 0%,
            rgba(13,20,30,0.95) 80%,
            #0a1220 100%
          ),
          linear-gradient(
            120deg,
            #111827 0%,
            #1a263b 100%
          )
        `,
      }}
    >
      {/* Top Info Card */}
      <div className="absolute top-5 left-5 h-32 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-xl shadow-[#4DA6FF26] px-2 py-5 w-[300px] text-[#e5eaf1] z-20">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 bg-gradient-to-br from-[#55b3fe] to-[#395bff] rounded-sm flex items-center justify-center">
            <img src={bath} alt="bath icon" className="w-6 h-6 object-contain" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm leading-tight">Premium Bathroom Design</div>
            <div className="text-[12px] leading-normal text-[#bfd3ed] mt-0.5">
              Sleek modern design with water-saving
              <br />
              technology
            </div>
            <div className="flex gap-8 mt-1 text-[11px]">
              <div>
                <div className="text-[#b7bdd4] font-medium">Dimensions</div>
                <div className="font-semibold text-[12px] text-white mt-0.5">
                  650 × 350 × 780 mm
                </div>
              </div>
              <div>
                <div className="text-[#b7bdd4] font-medium">Material</div>
                <div className="font-semibold text-[12px] text-white mt-0.5">
                  Vitreous China
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Model */}
      <Canvas
        camera={{ position: [200, 400, 500], fov: 50 }}
        className="absolute inset-0 z-10"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.4} />
        <Suspense fallback={<Loader />}>
          <MyModel scale={1.5} position={[0, -50, 0]} />
        </Suspense>
        <OrbitControls enableZoom enablePan enableRotate />
      </Canvas>

      {/* Controls Toolbar */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 z-20 flex flex-col items-center gap-2">
        {/* Top Action Bar */}
        {/* <div className="flex gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-2.5 min-w-[300px] justify-center shadow-md shadow-[#4DA6FF26]">
          <ControlAction icon={<span className="text-[14px]">⟳</span>} label="Reset" />
          <ControlAction icon={<span className="text-[14px]">↻</span>} label="Rotate" />
          <ControlAction icon={<span className="text-[14px]">📷</span>} label="Screenshot" />
          <ControlAction icon={<span className="text-[14px]">⛶</span>} label="Fullscreen" />
        </div> */}
        {/* Navigation Controls */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-sm px-6 py-2 min-w-[340px] flex flex-col items-center shadow-[#4DA6FF26]">
          <div className="text-[#e7ebf6] font-semibold text-xs mb-1 tracking-wide select-none">
            Navigation Controls
          </div>
          <div className="flex gap-4">
            <NavControl icon={<span>🔄</span>} label="Drag to Rotate" />
            <NavControl icon={<span>🔎</span>} label="Scroll to Zoom" />
            <NavControl icon={<span className="text-base">⇧</span>} label="Shift+Drag to Pan" />
          </div>
        </div>
      </div>
    </div>
  );
}
