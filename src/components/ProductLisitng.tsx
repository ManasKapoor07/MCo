import React, { useState } from "react";
import { Star } from "lucide-react";
import product1 from "../assets/product1.svg"; // Adjust path per your file setup

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
    <div className="bg-blue-50 min-h-screen py-10 px-2 md:px-0">
      {/* Headings */}
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
          Our Premium Collection
        </h1>
        <p className="text-gray-600 text-base md:text-lg font-normal">
          Discover our range of innovative sanitaryware products designed to
          elevate your bathroom
          <br />
          experience with cutting-edge technology and timeless elegance.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-10 flex-wrap mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-5 py-2 rounded-sm font-normal shadow-md cursor-pointer transition-colors mb-2 ${
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
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product, idx) => (
          <div
            key={idx}
            className="bg-white w-full md:w-auto rounded-md shadow-lg px-4 p-5 flex flex-col items-start relative group transition hover:shadow-xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-44 object-contain mb-4 rounded-md "
            />
            <div className="text-base font-semibold mb-1">{product.name}</div>
            <div className="text-xs text-gray-500 font-normal mb-2">
              {product.category}
            </div>

            {/* Rating Block */}
            <div className="flex items-center mb-1">
              {[1, 2, 3, 4, 5].map((starIdx) => (
                <Star
                  key={starIdx}
                  size={18}
                  color={
                    starIdx <= Math.round(product.rating)
                      ? "#F7B500"
                      : "#e5e7eb"
                  }
                  fill={
                    starIdx <= Math.round(product.rating) ? "#F7B500" : "none"
                  }
                  className="mr-0.5"
                />
              ))}
              <span className="ml-2 text-gray-700 font-medium">
                {product.rating}
              </span>
            </div>
            <div className="text-xs text-gray-500 mb-4">{product.reviews}</div>
            {/* Price */}
            <div className="text-xl font-bold text-gray-800 mt-auto">
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
      <div className="flex justify-center mt-12">
        <button className="bg-[#1447E6] text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition w-52">
          View More
        </button>
      </div>
    </div>
  );
}
