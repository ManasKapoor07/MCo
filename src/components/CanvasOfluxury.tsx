import React from "react";

// Example: replace with actual imports or URLs
import img1 from "../assets/carousel1.png";
import img2 from "../assets/carousel2.png";
import img3 from "../assets/carousel2.png";
import img4 from "../assets/carousel1.png";
import img5 from "../assets/carousel1.png";
import img6 from "../assets/carousel1.png";
import img7 from "../assets/carousel1.png";
import img8 from "../assets/carousel1.png";
import img9 from "../assets/carousel1.png";

// Images in left-to-right, top-to-bottom screenshot order:
const images = [
  img1, // left vertical
  img2, // blue
  img3, // green wall, orange lamp
  img4, // marble wall, bath
  img5, // gold shower
  img6, // lower left, wall WC
  img7, // lower middle, WC&shower
  img8, // gold-light bath
  img9, // black window bath
];

export default function CanvasOfLuxuryCollage() {
  return (
    <div className="w-full h-full bg-white flex flex-col py-8 px-2 md:px-8">
      <div className="mb-2 text-xs md:text-base text-center text-gray-600">
        Inspire &amp; Be Inspired — Showcase your style with
      </div>
      <div className="font-bold text-2xl md:text-4xl text-center text-gray-900 mb-8">
        #CanvasOfLuxury
      </div>
      <div className="w-full  grid grid-cols-5 grid-rows-4 gap-3 md:gap-5 auto-rows-[90px] md:auto-rows-[140px]">
        {/* Left Tall Image */}
        <div className="row-span-4 col-span-1">
          <img
            src={images[0]}
            alt=""
            className="w-full h-full object-cover rounded-xl shadow-xl"
          />
        </div>
        {/* Top featured blue */}
        <div className="col-span-2 row-span-2">
          <img
            src={images[1]}
            alt=""
            className="w-full h-full object-cover rounded-xl shadow-xl"
          />
        </div>
        {/* Green theme, middle */}
        <div className="col-span-2 row-span-2">
          <img
            src={images[2]}
            alt=""
            className="w-full h-full object-cover rounded-xl shadow-xl"
          />
        </div>
        {/* Large marble bath */}
        <div className="col-span-2 row-span-2">
          <img
            src={images[3]}
            alt=""
            className="w-full h-full object-cover rounded-xl shadow-xl"
          />
        </div>
        {/* Gold shower, rightmost */}
        <div className="col-span-1 row-span-2">
          <img
            src={images[4]}
            alt=""
            className="w-full h-full object-cover rounded-xl shadow-xl"
          />
        </div>
        {/* Lower left wall WC */}
        <div className="col-span-1 row-span-2">
          <img
            src={images[5]}
            alt=""
            className="w-full h-full object-cover rounded-xl shadow-xl"
          />
        </div>
        {/* Lower wc+shower */}
        <div className="col-span-2 row-span-2">
          <img
            src={images[6]}
            alt=""
            className="w-full h-full object-cover rounded-xl shadow-xl"
          />
        </div>
        {/* Gold-light bath */}
        <div className="col-span-1 row-span-2">
          <img
            src={images[7]}
            alt=""
            className="w-full h-full object-cover rounded-xl shadow-xl"
          />
        </div>
        {/* Lower right window bath */}
        <div className="col-span-1 row-span-2">
          <img
            src={images[8]}
            alt=""
            className="w-full h-full object-cover rounded-xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
