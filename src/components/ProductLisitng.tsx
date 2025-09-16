import React, { useState, useEffect } from "react";
import { Heart, Share2, Repeat2 } from "lucide-react";
import product1 from "../assets/product1.svg"; // Replace with correct image asset

function ProductCard({ product, isFav, onFav, onClick }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Conditional fallback if image is missing
  const imageSrc = product.image?.image_url || product1;

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer  flex flex-col group transition-shadow"
      style={{ width: "100%", minWidth: 180, maxWidth: 350 }}
      onClick={() => onClick(product)}
    >
      <div className="relative">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-80  object-cover bg-gray-50 rounded-md"
          style={{ aspectRatio: "4/3" }}
          draggable={false}
        />
        {/* Favorite Heart - Top right */}
        {/* <button
          className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white p-1.5 rounded-full shadow flex items-center justify-center"
          onClick={e => {
            e.stopPropagation();
            onFav(product.id);
          }}
        >
          <Heart
            size={20}
            fill={isFav ? "#ef4444" : "none"}
            className={isFav ? "text-red-500" : "text-gray-400"}
          />
        </button> */}
        {/* Hover Overlay only on desktop */}
        {!isMobile && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="mb-3 hover:cursor-pointer px-6 py-2 rounded shadow bg-white text-blue-700 font-semibold text-sm sm:text-base"
              onClick={e => {
                e.stopPropagation();
                /* Add to cart logic */
              }}
            >
              Add to cart
            </button>
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1 text-white text-xs hover:text-blue-400 transition"
              >
                <Share2 size={16} /> <span>Share</span>
              </button>
              <button
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1 text-white text-xs hover:text-blue-400 transition"
              >
                <Repeat2 size={16} /> <span>Compare</span>
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  onFav(product.id);
                }}
                className="flex items-center gap-1 text-white text-xs hover:text-blue-400 transition"
              >
                <Heart
                  size={16}
                  fill={isFav ? "#ef4444" : "none"}
                  className={isFav ? "text-red-500" : "text-white"}
                />
                <span>Like</span>
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Mobile Actions */}
      {isMobile && (
        <div className="flex items-center gap-4 mt-2 px-1 mb-1">
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm font-semibold flex-1"
            onClick={e => {
              e.stopPropagation();
              /* Add to cart logic */
            }}
          >
            Add to cart
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              onFav(product.id);
            }}
            className={`flex items-center gap-1 text-sm font-medium ${
              isFav ? "text-red-600" : "text-gray-600"
            }`}
          >
            <Heart size={16} fill={isFav ? "#ef4444" : "none"} /> <span>Like</span>
          </button>
        </div>
      )}
      {/* Product Info Bar */}
      <div className="flex items-end justify-between px-4 pt-2 pb-3 gap-2">
        <div className="flex flex-col flex-1 min-w-0">
          <span className="block text-sm font-semibold text-gray-900 truncate">
            {product.name}
          </span>
          <span className="block text-xs text-gray-500 pt-0.5">{product.brand}</span>
        </div>
        <span className="bg-[#F6F6F6] rounded-lg px-2 py-1 text-sm font-semibold text-gray-900 border border-gray-100 ml-2">
          ₹{product.price?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
}

export default function ProductListing() {
  // Updated example products array: adjust brand names to match screenshot
  const products = [
    {
      id: 1,
      name: "Norma Table Top Wash Basin",
      brand: "Jaguar",
      price: 2925,
      image: { image_url: product1 },
    },
    {
      id: 2,
      name: "Athos One Piece Western Commode",
      brand: "Ruhe",
      price: 10627,
      image: { image_url: product1 },
    },
    {
      id: 3,
      name: "Athos One Piece Western Commode",
      brand: "Ruhe",
      price: 10627,
      image: { image_url: product1 },
    },
    {
      id: 4,
      name: "Castor Table-Top Wash Basin",
      brand: "Cera",
      price: 4002,
      image: { image_url: product1 },
    },
    {
      id: 5,
      name: "Norma Table Top Wash Basin",
      brand: "Jaguar",
      price: 2925,
      image: { image_url: product1 },
    },
    {
      id: 6,
      name: "Athos One Piece Western Commode",
      brand: "Ruhe",
      price: 10627,
      image: { image_url: product1 },
    },
    {
      id: 7,
      name: "Risa Wall Hung Western Commode",
      brand: "Hindware",
      price: 8443,
      image: { image_url: product1 },
    },
    {
      id: 8,
      name: "Castor Table-Top Wash Basin",
      brand: "Cera",
      price: 4002,
      image: { image_url: product1 },
    },
  ];

  const [favorites, setFavorites] = useState([]);

  const handleFavToggle = id =>
    setFavorites(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  const handleCardClick = product => {
    console.log("Clicked product:", product.name);
    // navigation/modal logic here
  };

  return (
    <div className="py-8 sm:py-12 px-3 sm:px-6 lg:px-0">
      {/* Heading and Subheading */}
      <div className="max-w-6xl mx-auto text-center mb-6 sm:mb-10 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight">
          Beyond Bathrooms: A Canvas of Everyday Luxury
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg font-normal leading-relaxed">
          More than just functional spaces, our designs transform bathrooms into personal retreats—where style, serenity, and everyday indulgence coexist in perfect harmony.
        </p>
      </div>
      {/* Product Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 sm:gap-8 px-2 sm:px-0">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isFav={favorites.includes(product.id)}
            onFav={handleFavToggle}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}
