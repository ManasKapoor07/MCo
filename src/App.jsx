import React from "react";
import Three from "./components/Three";

export default function App() {
  return (
    <div className="bg-[#f8fbff] flex flex-col h-full w-full font-sans">
      <div className="flex w-full h-full flex-col p-10">
        <h2 className="text-2xl font-bold text-center mb-2">
          Experience Innovation in 3D
        </h2>
        <p className="text-center mx-auto text-gray-600 mb-4">
          View and interact with our products in 3D! Drag, zoom and explore
          every feature from every angle right here in your browser.
        </p>
        <div className="rounded-2xl overflow-hidden shadow-lg mt-6 mx-auto w-[100%] bg-gradient-to-br from-[#0a1220] to-[#243c5a] p-2">
          <Three />
        </div>
      </div>
    </div>
  );
}
