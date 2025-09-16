import React from "react";
import img1 from "../assets/collage.svg";

export default function CanvasOfLuxuryCollage() {
  return (
    <div className="w-full bg-white flex flex-col py-8 px-4 md:px-8">
      <div className="mb-2 text-xs md:text-base text-center text-gray-600">
        Inspire &amp; Be Inspired — Showcase your style with
      </div>

      <div className="font-bold text-2xl sm:text-3xl md:text-4xl text-center text-gray-900">
        #CanvasOfLuxury
      </div>

      <div className="flex justify-center items-center">
        <div className="w-full overflow-hidden shadow-ms">
          <img
            src={img1}
            loading="lazy"

            alt="Canvas of Luxury Collage"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
