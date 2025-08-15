import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { getColorForName } from "@/lib/utils"; 
import RangeSlider from "./RangeSlider";

const SAMPLE_COUNT = 30;

export default function ShopPage() {

  const sampleProducts: Product[] = useMemo(() => {
    return Array.from({ length: SAMPLE_COUNT }).map((_, i) => ({
      id: i + 1,
      name: "Athos One Piece Western Commode",
      price: 10627 + ((i % 6) * 100),
      rating: 3.5,
      reviews: 10 + (i * 3) % 200,
      image: null,
      brand: ["Johnson Bathware", "Kohler", "Cera", "Hindware"][i % 4],
      category: ["Water Closet", "Wash Basin", "Bathtub", "Urinals"][i % 4],
      color: ["white", "black", "teal", "blue"][i % 4],
    }));
  }, []);

  const [minPrice, setMinPrice] = useState<number>(7000);
  const [maxPrice, setMaxPrice] = useState<number>(11000);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("Most Popular");
  const [page, setPage] = useState<number>(1);
  const pageSize = 9;

  const [debounceTrigger, setDebounceTrigger] = useState<number>(0);
  useEffect(() => {
    const t = window.setTimeout(() => setDebounceTrigger((v) => v + 1), 220);
    return () => window.clearTimeout(t);
  }, [minPrice, maxPrice, Array.from(selectedBrands).join(','), Array.from(selectedCategories).join(','), selectedColor, sortBy]);

  const categories = ["Water Closet", "Wash Basin", "Bathtub", "Urinals", "Bathroom Vanity"];
  const brands = ["Cera", "Ruhe", "Kohler", "Hindware", "Johnson Bathware"];
  const colors = ["white", "black", "purple", "teal", "blue"];

  const filtered = useMemo(() => {

    let list = sampleProducts.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    if (selectedCategories.size) list = list.filter((p) => selectedCategories.has(p.category));
    if (selectedBrands.size) list = list.filter((p) => selectedBrands.has(p.brand));
    if (selectedColor) list = list.filter((p) => p.color === selectedColor);

    if (sortBy === "Price: Low to High") list = list.slice().sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") list = list.slice().sort((a, b) => b.price - a.price);
    else if (sortBy === "Newest") list = list.slice().reverse();

    return list;
  }, [debounceTrigger]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const showing = filtered.slice((page - 1) * pageSize, page * pageSize);

  // --- helpers ---
  function toggleSet<T>(setObj: Set<T>, value: T) {
    const copy = new Set(setObj);
    if (copy.has(value)) copy.delete(value);
    else copy.add(value);
    return copy;
  }

  const gridVariants = {
    animate: { transition: { staggerChildren: 0.03 } },
  };

  return (
    <div className="min-h-screen bg-white py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <nav className="text-xs text-gray-500 mb-6">
          <span className="font-[Poppins] font-bold text-[12px] leading-[14px] tracking-[1.26px] align-middle uppercase text-[#030303]">Home</span>
          <span className="mx-2">/</span>
          <span className="font-[Poppins] font-bold text-[12px] leading-[14px] tracking-[1.26px] align-middle uppercase text-[#808080]">Shop</span>
        </nav>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.36 }}
              className="bg-white shadow-sm mt-2"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button className="text-gray-400 text-xl"><svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.125 9.125V17.75C12.125 18.0484 12.0065 18.3345 11.7955 18.5455C11.5845 18.7565 11.2984 18.875 11 18.875C10.7016 18.875 10.4155 18.7565 10.2045 18.5455C9.99353 18.3345 9.875 18.0484 9.875 17.75V9.125C9.875 8.82663 9.99353 8.54048 10.2045 8.3295C10.4155 8.11853 10.7016 8 11 8C11.2984 8 11.5845 8.11853 11.7955 8.3295C12.0065 8.54048 12.125 8.82663 12.125 9.125ZM17.75 15.5C17.4516 15.5 17.1655 15.6185 16.9545 15.8295C16.7435 16.0405 16.625 16.3266 16.625 16.625V17.75C16.625 18.0484 16.7435 18.3345 16.9545 18.5455C17.1655 18.7565 17.4516 18.875 17.75 18.875C18.0484 18.875 18.3345 18.7565 18.5455 18.5455C18.7565 18.3345 18.875 18.0484 18.875 17.75V16.625C18.875 16.3266 18.7565 16.0405 18.5455 15.8295C18.3345 15.6185 18.0484 15.5 17.75 15.5ZM20 11.75H18.875V1.25C18.875 0.951631 18.7565 0.665483 18.5455 0.454505C18.3345 0.243526 18.0484 0.125 17.75 0.125C17.4516 0.125 17.1655 0.243526 16.9545 0.454505C16.7435 0.665483 16.625 0.951631 16.625 1.25V11.75H15.5C15.2016 11.75 14.9155 11.8685 14.7045 12.0795C14.4935 12.2905 14.375 12.5766 14.375 12.875C14.375 13.1734 14.4935 13.4595 14.7045 13.6705C14.9155 13.8815 15.2016 14 15.5 14H20C20.2984 14 20.5845 13.8815 20.7955 13.6705C21.0065 13.4595 21.125 13.1734 21.125 12.875C21.125 12.5766 21.0065 12.2905 20.7955 12.0795C20.5845 11.8685 20.2984 11.75 20 11.75ZM4.25 12.5C3.95163 12.5 3.66548 12.6185 3.4545 12.8295C3.24353 13.0405 3.125 13.3266 3.125 13.625V17.75C3.125 18.0484 3.24353 18.3345 3.4545 18.5455C3.66548 18.7565 3.95163 18.875 4.25 18.875C4.54837 18.875 4.83452 18.7565 5.0455 18.5455C5.25647 18.3345 5.375 18.0484 5.375 17.75V13.625C5.375 13.3266 5.25647 13.0405 5.0455 12.8295C4.83452 12.6185 4.54837 12.5 4.25 12.5ZM6.5 8.75H5.375V1.25C5.375 0.951631 5.25647 0.665483 5.0455 0.454505C4.83452 0.243526 4.54837 0.125 4.25 0.125C3.95163 0.125 3.66548 0.243526 3.4545 0.454505C3.24353 0.665483 3.125 0.951631 3.125 1.25V8.75H2C1.70163 8.75 1.41548 8.86853 1.2045 9.0795C0.993526 9.29048 0.875 9.57663 0.875 9.875C0.875 10.1734 0.993526 10.4595 1.2045 10.6705C1.41548 10.8815 1.70163 11 2 11H6.5C6.79837 11 7.08452 10.8815 7.2955 10.6705C7.50647 10.4595 7.625 10.1734 7.625 9.875C7.625 9.57663 7.50647 9.29048 7.2955 9.0795C7.08452 8.86853 6.79837 8.75 6.5 8.75ZM13.25 4.25H12.125V1.25C12.125 0.951631 12.0065 0.665483 11.7955 0.454505C11.5845 0.243526 11.2984 0.125 11 0.125C10.7016 0.125 10.4155 0.243526 10.2045 0.454505C9.99353 0.665483 9.875 0.951631 9.875 1.25V4.25H8.75C8.45163 4.25 8.16548 4.36853 7.9545 4.5795C7.74353 4.79048 7.625 5.07663 7.625 5.375C7.625 5.67337 7.74353 5.95952 7.9545 6.1705C8.16548 6.38147 8.45163 6.5 8.75 6.5H13.25C13.5484 6.5 13.8345 6.38147 14.0455 6.1705C14.2565 5.95952 14.375 5.67337 14.375 5.375C14.375 5.07663 14.2565 4.79048 14.0455 4.5795C13.8345 4.36853 13.5484 4.25 13.25 4.25Z" fill="black" fill-opacity="0.4"/>
</svg>
</button>
              </div>

              {/* Price */}
              <RangeSlider
                    min={1000}
                    max={20000}
                    step={100}
                    values={[minPrice, maxPrice]}
                    minGap={500} 
                    onChange={([low, high]) => {
                        setMinPrice(low);
                        setMaxPrice(high);
                    }}
                />

              {/* Category */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Category</h4>
                  <button className="text-gray-400 text-sm">^</button>
                </div>
                <motion.div layout className="flex flex-col gap-3">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCategories(toggleSet(selectedCategories, c));
                        setPage(1);
                      }}
                      className={`text-left px-3 py-2 rounded-lg text-sm border ${selectedCategories.has(c) ? "bg-gray-100 font-medium" : "bg-white"}`}
                    >
                      {c}
                    </button>
                  ))}
                </motion.div>
              </div>

              <hr className="my-4" />

              {/* Brands */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Brands</h4>
                  <button className="text-gray-400 text-sm">^</button>
                </div>
                <motion.div layout className="flex flex-wrap gap-3">
                  {brands.map((b) => (
                    <motion.button
                      key={b}
                      onClick={() => {
                        setSelectedBrands(toggleSet(selectedBrands, b));
                        setPage(1);
                      }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-3 py-1.5 rounded-full text-sm border ${selectedBrands.has(b) ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                    >
                      {b}
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Colors</h4>
                  <button className="text-gray-400 text-sm">^</button>
                </div>
                <motion.div layout className="flex items-center gap-3">
                  {colors.map((c) => (
                    <motion.button
                      aria-label={c}
                      key={c}
                      onClick={() => {
                        setSelectedColor(selectedColor === c ? null : c);
                        setPage(1);
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        selectedColor === c ? "ring-2 ring-offset-2 ring-blue-500 border-transparent" : "border-gray-200"
                      }`}
                      style={{ background: getColorForName(c) }}
                    />
                  ))}
                </motion.div>
              </div>

              <div className="mt-6">
                <motion.button
                  onClick={() => {
                    // Reset to first page and trigger the debounced filter
                    setPage(1);
                    setDebounceTrigger((v) => v + 1);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold shadow"
                >
                  Apply Filter
                </motion.button>
              </div>
            </motion.div>
          </aside>

          {/* Main content */}
          <main className="col-span-12 md:col-span-9">
            <div className="flex justify-end gap-4 items-center mb-6">
              <div className="font-[Poppins] font-normal text-base leading-none tracking-normal text-black/60">
                Showing {filtered.length ? (page - 1) * pageSize + 1 : 0}-{Math.min(page * pageSize, filtered.length)} of {filtered.length} Products
              </div>
              <div className="flex items-center">
                <div className="font-[Poppins] font-normal text-base leading-none tracking-normal text-black/60">Sort by:</div>
                <select
                  className="font-[Poppins] font-normal text-base leading-none tracking-normal text-black w-7/12"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                >
                  <option>Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            <motion.section layout variants={gridVariants} animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence initial={false} mode="popLayout">
                {showing.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </AnimatePresence>
            </motion.section>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-between">
              <div>
                <motion.button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-full border text-sm"
                >
                  ← Previous
                </motion.button>
              </div>
              <div className="flex items-center gap-2">
                {Array.from({ length: pages }).map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-2 rounded-full text-sm border ${page === i + 1 ? "bg-gray-800 text-white" : "bg-white"}`}
                  >
                    {i + 1}
                  </motion.button>
                ))}
              </div>
              <div>
                <motion.button
                  onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-full border text-sm"
                >
                  Next →
                </motion.button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// --- small utility ---

