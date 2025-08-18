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
        className="bg-white rounded-2xl p-4 shadow-[0px_40px_90px_0px_rgba(0,0,0,0.12)] relative"
      >
        <div className="relative rounded-lg overflow-hidden bg-gray-100" style={{ height: 220 }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="absolute bottom-2 left-3/11 px-6 py-[9px] rounded-md bg-[#1447E6E5] text-white font-[Poppins] font-semibold text-[11.5px] leading-[100%] tracking-normal"
            aria-label={`Add ${product.name} to cart`}
          >
            Add To Cart
          </motion.button>

          <div className="w-full h-full flex items-center justify-center">
            {/* Placeholder art */}
           <img src="/assets/ShopProduct.png" />
          </div>
        </div>

        <h3 className="mt-4 font-[Poppins] font-semibold text-[20px] leading-snug align-middle tracking-[0]">{product.name}</h3>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 text-yellow-400">★ ★ ★ ★</div>
          <div className="text-sm text-gray-500">{product.rating} / 5</div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="font-[Poppins] font-semibold text-[20px] leading-[100%] tracking-[0] align-middle">₹{product.price.toLocaleString()}</div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-3 py-2 rounded-md bg-[#1447E6E5] text-white font-[Poppins] font-semibold text-[12px] leading-[100%] tracking-normal"
            aria-label={`Quick add ${product.name}`}
          >
            Add To Cart
          </motion.button>
        </div>
      </motion.article>
    );
  }