import { motion } from "framer-motion";
import { Product } from "@/types";
import { Heart } from "lucide-react";

// Helper to generate star rating visuals
function getStars(rating: number) {
  const fullStars = Math.round(rating);
  return (
    <span>
      <span className="text-yellow-400 text-base">{"★".repeat(fullStars)}</span>
      <span className="text-gray-300 text-base">
        {"★".repeat(5 - fullStars)}
      </span>
    </span>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl p-5 relative shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300"
    >
      {/* Favorites button */}

      {/* Product Image */}
      <div className="relative rounded-xl overflow-hidden">
        <img
          src="/assets/ShopProduct.png"
          alt={product.name}
          className="w-full h-full object-contain  group-hover:shadow-lg rounded-lg"
        />
      </div>
      <motion.button
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.15, rotate: [0, -15, 15, 0] }}
        aria-label={`Add ${product.name} to favorites`}
        className="absolute top-7 right-7 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <Heart className="h-4 w-4 text-pink-600 drop-shadow-md" />
      </motion.button>

      {/* Product Name */}
      <h3 className="mt-4 mb-1 font-[Poppins] font-extrabold text-lg leading-tight text-gray-900 capitalize truncate tracking-wide">
        {product.name}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <div>{getStars(product.rating)}</div>
        <span className="text-xs text-gray-500 font-medium">
          {product.rating} / 5
        </span>
      </div>

      {/* Brand & Category Pills */}
      <div className="mb-4 flex flex-wrap gap-3 text-xs font-semibold">
        <span className="px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200 capitalize shadow-sm transition-colors duration-300 hover:bg-pink-100 hover:text-pink-800 cursor-default">
          {product.brand}
        </span>
        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 capitalize shadow-sm transition-colors duration-300 hover:bg-blue-100 hover:text-blue-800 cursor-default">
          {product.category}
        </span>
      </div>

      <hr className="border-gray-200 mb-4" />

      {/* Price and Add to Cart */}
      <div className="flex items-center justify-between">
        <div className="font-[Poppins] font-extrabold text-xl text-gray-900 tracking-tight">
          ₹{product.price.toLocaleString()}
        </div>
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="px-5 py-2 rounded-full text-sm bg-blue-600 text-white font-[Poppins] font-semibold shadow-lg transition-transform duration-200 hover:shadow-xl"
          aria-label={`Add ${product.name} to cart`}
        >
          Add To Cart
        </motion.button>
      </div>
    </motion.article>
  );
}
