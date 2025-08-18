import React, { useState } from "react";
import { Star } from "lucide-react";
import product1 from "../assets/product1.svg"; // Adjust path per your setup

const categories = [
  "Modern Wash Basins",
  "Luxury Toilets",
  "Shower Essentials",
  "Designer Accessories",
  "Premium Bath Fittings",
];

const products = [
  {
    name: "Norma Table Top Wash Basin",
    category: "Luxury Toilets",
    rating: 4.1,
    reviews: "Customer Reviews",
    price: 2925,
    currency: "₹",
    image: product1,
  },
  {
    name: "Athos One Piece Western Commode",
    category: "Luxury Toilets",
    rating: 4.1,
    reviews: "Customer Reviews",
    price: 10627,
    currency: "₹",
    image: product1,
  },
  {
    name: "Risa Wall Hung Western Commode",
    category: "Luxury Toilets",
    rating: 4.1,
    reviews: "Customer Reviews",
    price: 8443,
    currency: "₹",
    image: product1,
  },
  {
    name: "Castor Table-Top Wash Basin",
    category: "Luxury Toilets",
    rating: 4.1,
    reviews: "Customer Reviews",
    price: 4002,
    currency: "₹",
    image: product1,
  },
  {
    name: "Aries Wall-Hung Wash Basin",
    category: "Luxury Toilets",
    rating: 4.1,
    reviews: "Customer Reviews",
    price: 1908,
    currency: "₹",
    image: product1,
  },
  {
    name: "Crystal Wall-Hung Western Closet",
    category: "Luxury Toilets",
    rating: 4.1,
    reviews: "Customer Reviews",
    price: 7568,
    currency: "₹",
    image: product1,
  },
];

export default function ProductListing() {
  const [activeCategory, setActiveCategory] = useState("Luxury Toilets");
  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <div className="bg-blue-50 min-h-screen py-8 sm:py-12 px-3 sm:px-6 lg:px-0">
      {/* Headings */}
      <div className="max-w-6xl mx-auto text-center mb-6 sm:mb-10 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight">
          Our Premium Collection
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg font-normal leading-relaxed">
          Discover our range of innovative sanitaryware products designed to
          elevate your bathroom experience with cutting-edge technology and
          timeless elegance.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-start sm:justify-center gap-3 sm:gap-6 overflow-x-auto sm:overflow-visible px-1 mb-8 sm:mb-12 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-md font-medium text-sm sm:text-base shadow-md cursor-pointer transition-colors ${
              cat === activeCategory
                ? "bg-[#1447E6] text-white shadow-md shadow-[#1447E6]"
                : "bg-white hover:bg-[#1447E6] hover:text-white"
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-0">
        {filteredProducts.map((product, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-lg px-3 sm:px-4 py-5 flex flex-col items-start group transition hover:shadow-xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 sm:h-44 object-contain mb-4 rounded-md"
            />
            <div className="text-sm sm:text-base font-semibold mb-1 line-clamp-2">
              {product.name}
            </div>
            <div className="text-xs text-gray-500 font-normal mb-2">
              {product.category}
            </div>

            {/* Rating Block */}
            <div className="flex items-center mb-1">
              {[1, 2, 3, 4, 5].map((starIdx) => (
                <Star
                  key={starIdx}
                  size={16}
                  className="sm:w-[18px] sm:h-[18px]"
                  color={
                    starIdx <= Math.round(product.rating)
                      ? "#F7B500"
                      : "#e5e7eb"
                  }
                  fill={
                    starIdx <= Math.round(product.rating) ? "#F7B500" : "none"
                  }
                />
              ))}
              <span className="ml-2 text-gray-700 text-xs sm:text-sm font-medium">
                {product.rating}
              </span>
            </div>
            <div className="text-xs text-gray-500 mb-4">{product.reviews}</div>

            {/* Price */}
            <div className="text-lg sm:text-xl font-bold text-gray-800 mt-auto">
              {product.currency}
              {product.price.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-10 sm:mt-12 px-3">
        <button className="bg-[#1447E6] text-white py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-semibold hover:bg-blue-700 transition w-full sm:w-52">
          View More
        </button>
      </div>
    </div>
  );
}
