import React from "react";
import img1 from "../assets/category1.svg";
import img2 from "../assets/category2.svg";
import img3 from "../assets/category3.svg";
import img4 from "../assets/category4.svg";

export default function PremiumShowcase() {
  return (
    <section className="py-10 px-2 sm:px-6 md:px-12">
      <div>
        {/* Title & Subtitle */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold text-gray-900 mb-2">
            Curated for Your Perfect Space
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Explore our finest sanitaryware collections, designed to redefine
            bathrooms with elegance, durability, and modern charm.
          </p>
        </div>

        {/* Responsive Grid of Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full justify-center items-stretch">
          <div className="bg-white rounded-lg overflow-hidden shadow-md relative hover:cursor-pointer group flex flex-col">
            <img
              src={img1}
              alt="Basins & Vanities"
              className="w-full h-52 sm:h-64 md:h-72 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute bottom-5 left-3">
              <span className="bg-white p-2 sm:p-3 text-base font-semibold">
                Basins & Vanities
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md relative hover:cursor-pointer group flex flex-col">
            <img
              src={img2}
              alt="Water Closets"
              className="w-full h-52 sm:h-64 md:h-72 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute bottom-5 left-3">
              <span className="bg-white p-2 sm:p-3 text-base font-semibold">
                Water Closets
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md relative hover:cursor-pointer group flex flex-col">
            <img
              src={img3}
              alt="Accessories"
              className="w-full h-52 sm:h-64 md:h-72 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute bottom-5 left-3">
              <span className="bg-white p-2 sm:p-3 text-base font-semibold">
                Accessories
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md relative hover:cursor-pointer group flex flex-col">
            <img
              src={img4}
              alt="Showers"
              className="w-full h-52 sm:h-64 md:h-72 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute bottom-5 left-3">
              <span className="bg-white p-2 sm:p-3 text-base font-semibold">
                Showers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
