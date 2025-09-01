import React from "react";
import img1 from "../assets/category1.svg";
import img2 from "../assets/category2.svg";
import img3 from "../assets/category3.svg";
import img4 from "../assets/category4.svg";

export default function PremiumShowcase() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12 ">
      <div className="mx-auto">
        {/* Title & Subtitle */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
            Curated for Your Perfect Space
          </h2>
          <p className="text-base sm:text-xl text-gray-600">
            Explore our finest sanitaryware collections, designed to redefine
            bathrooms with elegance, durability, and modern charm.
          </p>
        </div>

        <div className="flex gap-5 justify-center items-center">
          <div className="bg-white rounded-lg hover:cursor-pointer overflow-hidden shadow-md relative group">
            <img
              src={img1}
              alt="Basins & Vanities"
              className="w-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute bottom-5 left-3">
              <span className="bg-white p-3 text-base font-semibold">
                Basins & Vanities
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden hover:cursor-pointer shadow-md relative group">
            <img
              src={img2}
              alt="Water Closets"
              className="w-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute bottom-5  left-3">
              <span className="bg-white p-3 text-base font-semibold">
                Water Closets
              </span>
            </div>
          </div>
          <div className="flex flex-col hover:cursor-pointer justify-between items-center gap-2 h-full">
            <div className="bg-white rounded-lg overflow-hidden shadow-md relative group">
              <img
                src={img3}
                alt="Accessories"
                className="w-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute bottom-5 left-3">
                <span className="bg-white p-3 text-base font-semibold">
                  ACCESSORIES
                </span>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md relative group">
              <img
                src={img4}
                alt="Showers"
                className="w-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute bottom-5 left-3">
                <span className="bg-white p-3 text-base font-semibold">
                  Showers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
