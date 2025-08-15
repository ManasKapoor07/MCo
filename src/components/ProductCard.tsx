import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
export default function ProductCard({ product }: { product: Product }) {
    return (
      <motion.article
        layout
        initial={{ opacity: 0, scale: 0.98, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -6 }}
        transition={{ duration: 0.32 }}
        className="bg-white rounded-2xl p-4 border shadow-sm relative"
      >
        <div className="relative rounded-lg overflow-hidden bg-gray-100" style={{ height: 220 }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="absolute left-4 top-4 px-3 py-1 rounded-md bg-blue-600 text-white text-sm"
            aria-label={`Add ${product.name} to cart`}
          >
            Add To Cart
          </motion.button>

          <div className="w-full h-full flex items-center justify-center">
            {/* Placeholder art */}
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="24" height="24" rx="4" fill="#E5E7EB" />
              <path d="M4 16h16v2H4z" fill="#D1D5DB" />
              <path d="M7 8h10v6H7z" fill="#9CA3AF" />
            </svg>
          </div>
        </div>

        <h3 className="mt-4 font-semibold text-gray-900 leading-snug">{product.name}</h3>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 text-yellow-400">★ ★ ★ ★</div>
          <div className="text-sm text-gray-500">{product.rating} / 5</div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-bold">₹{product.price.toLocaleString()}</div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="text-sm px-3 py-1.5 rounded-md bg-blue-600 text-white"
            aria-label={`Quick add ${product.name}`}
          >
            Add To Cart
          </motion.button>
        </div>
      </motion.article>
    );
  }