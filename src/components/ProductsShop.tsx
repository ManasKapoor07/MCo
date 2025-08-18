import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { getColorForName } from "@/lib/utils";
import RangeSlider from "./RangeSlider";
import Dropdown from "./Dropdown";

const SAMPLE_COUNT = 30;

function setsEqual(a: Set<string>, b: Set<string>) {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

export default function ShopPage() {
  const sampleProducts: Product[] = useMemo(() => {
    return Array.from({ length: SAMPLE_COUNT }).map((_, i) => ({
      id: i + 1,
      name: "Athos One Piece Western Commode",
      price: 10627 + ((i % 6) * 100),
      rating: 3.5,
      reviews: (10 + (i * 3)) % 200,
      image: null,
      brand: ["Johnson Bathware", "Kohler", "Cera", "Hindware", "Ruhe"][i % 5],
      category: ["Water Closet", "Wash Basin", "Bathtub", "Urinals", "Bathroom Vanity"][i % 5],
      color: ["white", "black", "teal", "blue", "purple"][i % 5],
    }));
  }, []);

  // DEFAULTS
  const DEFAULT_MIN = 7000;
  const DEFAULT_MAX = 11000;

  // --- staged UI state (what user is currently choosing) ---
  const [stagedMinPrice, setStagedMinPrice] = useState<number>(DEFAULT_MIN);
  const [stagedMaxPrice, setStagedMaxPrice] = useState<number>(DEFAULT_MAX);
  const [stagedSelectedCategories, setStagedSelectedCategories] = useState<Set<string>>(new Set());
  const [stagedSelectedBrands, setStagedSelectedBrands] = useState<Set<string>>(new Set());
  const [stagedSelectedColor, setStagedSelectedColor] = useState<string | null>(null);

  // --- applied filters (used to compute filtered products) ---
  const [appliedMinPrice, setAppliedMinPrice] = useState<number>(DEFAULT_MIN);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number>(DEFAULT_MAX);
  const [appliedSelectedCategories, setAppliedSelectedCategories] = useState<Set<string>>(new Set());
  const [appliedSelectedBrands, setAppliedSelectedBrands] = useState<Set<string>>(new Set());
  const [appliedSelectedColor, setAppliedSelectedColor] = useState<string | null>(null);

  // other UI state
  const [sortBy, setSortBy] = useState<string>("Most Popular");
  const [page, setPage] = useState<number>(1);
  const pageSize = 9;

  // categories / brands / colors data
  const categories = ["Water Closet", "Wash Basin", "Bathtub", "Urinals", "Bathroom Vanity"];
  const brands = ["Cera", "Ruhe", "Kohler", "Hindware", "Johnson Bathware"];
  const colors = ["white", "black", "purple", "teal", "blue"];

  // helper to update a Set immutably (works for staged sets)
  function toggleSet<T>(setObj: Set<T>, value: T) {
    const copy = new Set(setObj);
    if (copy.has(value)) copy.delete(value);
    else copy.add(value);
    return copy;
  }

  // Are staged filters different from applied ones? (used to enable/disable Apply)
  const filtersChanged =
    stagedMinPrice !== appliedMinPrice ||
    stagedMaxPrice !== appliedMaxPrice ||
    stagedSelectedColor !== appliedSelectedColor ||
    !setsEqual(stagedSelectedCategories, appliedSelectedCategories) ||
    !setsEqual(stagedSelectedBrands, appliedSelectedBrands);

  // --- Filtering & sorting (based on APPLIED filters only) ---
  const filtered = useMemo(() => {
    let list = sampleProducts.filter((p) => p.price >= appliedMinPrice && p.price <= appliedMaxPrice);

    if (appliedSelectedCategories.size) list = list.filter((p) => appliedSelectedCategories.has(p.category));
    if (appliedSelectedBrands.size) list = list.filter((p) => appliedSelectedBrands.has(p.brand));
    if (appliedSelectedColor) list = list.filter((p) => p.color === appliedSelectedColor);

    if (sortBy === "Price: Low to High") list = list.slice().sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") list = list.slice().sort((a, b) => b.price - a.price);
    else if (sortBy === "Newest") list = list.slice().reverse();

    return list;
  }, [sampleProducts, appliedMinPrice, appliedMaxPrice, appliedSelectedCategories, appliedSelectedBrands, appliedSelectedColor, sortBy]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const showing = filtered.slice((page - 1) * pageSize, page * pageSize);

  // --- Apply / Reset handlers ---
  function applyFilters() {
    setAppliedMinPrice(stagedMinPrice);
    setAppliedMaxPrice(stagedMaxPrice);
    setAppliedSelectedCategories(new Set(stagedSelectedCategories));
    setAppliedSelectedBrands(new Set(stagedSelectedBrands));
    setAppliedSelectedColor(stagedSelectedColor);
    setPage(1);
    // (optional) you might want to scroll to top or close sidebar here
  }

  function resetFilters() {
    // reset staged AND applied to defaults
    setStagedMinPrice(DEFAULT_MIN);
    setStagedMaxPrice(DEFAULT_MAX);
    setStagedSelectedCategories(new Set());
    setStagedSelectedBrands(new Set());
    setStagedSelectedColor(null);

    setAppliedMinPrice(DEFAULT_MIN);
    setAppliedMaxPrice(DEFAULT_MAX);
    setAppliedSelectedCategories(new Set());
    setAppliedSelectedBrands(new Set());
    setAppliedSelectedColor(null);

    setPage(1);
  }

  // keep the staged inputs in sync if you want to reflect applied changes
  // (optional: e.g., when you programmatically change applied filters from outside)
  useEffect(() => {
    // if applied changed externally, update staged so UI reflects actual filters
    setStagedMinPrice(appliedMinPrice);
    setStagedMaxPrice(appliedMaxPrice);
    setStagedSelectedCategories(new Set(appliedSelectedCategories));
    setStagedSelectedBrands(new Set(appliedSelectedBrands));
    setStagedSelectedColor(appliedSelectedColor);
    // we intentionally do NOT auto-apply staged -> applied; user must press Apply
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only on mount to sync initial values (remove / expand if needed)

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
          <aside className="col-span-12 md:col-span-3 ml-2">
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.36 }}
              className="bg-white shadow-sm mt-2 rounded-[8px] border border-[#0000001A] p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-[Poppins] font-semibold text-[20px] leading-[100%] tracking-[0] align-middle">Filters</h3>
                <div className="flex gap-2">
                  <button
                    onClick={resetFilters}
                    className="text-sm text-gray-600 px-3 py-1 rounded-md hover:bg-gray-50"
                  >
                   <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.125 12.125V20.75C13.125 21.0484 13.0065 21.3345 12.7955 21.5455C12.5845 21.7565 12.2984 21.875 12 21.875C11.7016 21.875 11.4155 21.7565 11.2045 21.5455C10.9935 21.3345 10.875 21.0484 10.875 20.75V12.125C10.875 11.8266 10.9935 11.5405 11.2045 11.3295C11.4155 11.1185 11.7016 11 12 11C12.2984 11 12.5845 11.1185 12.7955 11.3295C13.0065 11.5405 13.125 11.8266 13.125 12.125ZM18.75 18.5C18.4516 18.5 18.1655 18.6185 17.9545 18.8295C17.7435 19.0405 17.625 19.3266 17.625 19.625V20.75C17.625 21.0484 17.7435 21.3345 17.9545 21.5455C18.1655 21.7565 18.4516 21.875 18.75 21.875C19.0484 21.875 19.3345 21.7565 19.5455 21.5455C19.7565 21.3345 19.875 21.0484 19.875 20.75V19.625C19.875 19.3266 19.7565 19.0405 19.5455 18.8295C19.3345 18.6185 19.0484 18.5 18.75 18.5ZM21 14.75H19.875V4.25C19.875 3.95163 19.7565 3.66548 19.5455 3.4545C19.3345 3.24353 19.0484 3.125 18.75 3.125C18.4516 3.125 18.1655 3.24353 17.9545 3.4545C17.7435 3.66548 17.625 3.95163 17.625 4.25V14.75H16.5C16.2016 14.75 15.9155 14.8685 15.7045 15.0795C15.4935 15.2905 15.375 15.5766 15.375 15.875C15.375 16.1734 15.4935 16.4595 15.7045 16.6705C15.9155 16.8815 16.2016 17 16.5 17H21C21.2984 17 21.5845 16.8815 21.7955 16.6705C22.0065 16.4595 22.125 16.1734 22.125 15.875C22.125 15.5766 22.0065 15.2905 21.7955 15.0795C21.5845 14.8685 21.2984 14.75 21 14.75ZM5.25 15.5C4.95163 15.5 4.66548 15.6185 4.4545 15.8295C4.24353 16.0405 4.125 16.3266 4.125 16.625V20.75C4.125 21.0484 4.24353 21.3345 4.4545 21.5455C4.66548 21.7565 4.95163 21.875 5.25 21.875C5.54837 21.875 5.83452 21.7565 6.0455 21.5455C6.25647 21.3345 6.375 21.0484 6.375 20.75V16.625C6.375 16.3266 6.25647 16.0405 6.0455 15.8295C5.83452 15.6185 5.54837 15.5 5.25 15.5ZM7.5 11.75H6.375V4.25C6.375 3.95163 6.25647 3.66548 6.0455 3.4545C5.83452 3.24353 5.54837 3.125 5.25 3.125C4.95163 3.125 4.66548 3.24353 4.4545 3.4545C4.24353 3.66548 4.125 3.95163 4.125 4.25V11.75H3C2.70163 11.75 2.41548 11.8685 2.2045 12.0795C1.99353 12.2905 1.875 12.5766 1.875 12.875C1.875 13.1734 1.99353 13.4595 2.2045 13.6705C2.41548 13.8815 2.70163 14 3 14H7.5C7.79837 14 8.08452 13.8815 8.2955 13.6705C8.50647 13.4595 8.625 13.1734 8.625 12.875C8.625 12.5766 8.50647 12.2905 8.2955 12.0795C8.08452 11.8685 7.79837 11.75 7.5 11.75ZM14.25 7.25H13.125V4.25C13.125 3.95163 13.0065 3.66548 12.7955 3.4545C12.5845 3.24353 12.2984 3.125 12 3.125C11.7016 3.125 11.4155 3.24353 11.2045 3.4545C10.9935 3.66548 10.875 3.95163 10.875 4.25V7.25H9.75C9.45163 7.25 9.16548 7.36853 8.9545 7.5795C8.74353 7.79048 8.625 8.07663 8.625 8.375C8.625 8.67337 8.74353 8.95952 8.9545 9.1705C9.16548 9.38147 9.45163 9.5 9.75 9.5H14.25C14.5484 9.5 14.8345 9.38147 15.0455 9.1705C15.2565 8.95952 15.375 8.67337 15.375 8.375C15.375 8.07663 15.2565 7.79048 15.0455 7.5795C14.8345 7.36853 14.5484 7.25 14.25 7.25Z" fill="black" fill-opacity="0.4"/>
</svg>

                  </button>
                </div>
              </div>

              <hr className="border-gray-200 mt-2 mb-4" />

              {/* Price (staged) */}
              <Dropdown title="Price">
                <div className="mb-3 text-sm text-gray-600">
                  ₹ {stagedMinPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })} — ₹ {stagedMaxPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
                <RangeSlider
                  min={1000}
                  max={20000}
                  step={100}
                  values={[stagedMinPrice, stagedMaxPrice]}
                  minGap={500}
                  onChange={([low, high]) => {
                    setStagedMinPrice(low);
                    setStagedMaxPrice(high);
                  }}
                />
              </Dropdown>

              {/* Category (staged) */}
              <Dropdown title="Category">
                <motion.div layout className="flex flex-wrap gap-3">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setStagedSelectedCategories(toggleSet(stagedSelectedCategories, c))}
                      className={`px-3.5 py-1.5 rounded-full text-sm font-[Poppins] ${stagedSelectedCategories.has(c) ? "bg-blue-600 text-white" : "bg-gray-100 text-black/60"}`}
                    >
                      {c}
                    </button>
                  ))}
                </motion.div>
              </Dropdown>

              {/* Brands (staged) */}
              <Dropdown title="Brands">
                <motion.div layout className="flex flex-wrap gap-3">
                  {brands.map((b) => (
                    <motion.button
                      key={b}
                      onClick={() => setStagedSelectedBrands(toggleSet(stagedSelectedBrands, b))}
                      whileTap={{ scale: 0.97 }}
                      className={`px-3.5 py-1.5 rounded-full text-sm font-[Poppins] ${stagedSelectedBrands.has(b) ? "bg-blue-600 text-white" : "bg-gray-100 text-black/60"}`}
                    >
                      {b}
                    </motion.button>
                  ))}
                </motion.div>
              </Dropdown>

              {/* Colors (staged) */}
             <Dropdown title="Colors">
                <motion.div layout className="flex items-center gap-3 my-2 ml-1">
                  {colors.map((c) => {
                    const selected = stagedSelectedColor === c;
                    // For light backgrounds (like "white") show dark tick; otherwise white.
                    const tickColor = c === "white" ? "#111827" : "#ffffff";

                    return (
                      <motion.button
                        aria-label={c}
                        key={c}
                        onClick={() => setStagedSelectedColor(selected ? null : c)}
                        whileTap={{ scale: 0.95 }}
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center border-2 focus:outline-none ${
                          selected ? "ring-2 ring-offset-2 ring-blue-500 border-transparent" : "border-gray-300"
                        }`}
                        style={{ background: getColorForName(c) }}
                        title={c}
                        aria-pressed={selected}
                      >
                        {/* tick — animated when selected */}
                        <motion.svg
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={selected ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
                          transition={{ duration: 0.16 }}
                          className="absolute w-4 h-4 pointer-events-none"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke={tickColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </motion.svg>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </Dropdown>

              {/* APPLY button (uses staged -> applied) */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={applyFilters}
                  disabled={!filtersChanged}
                  className={`flex-1 py-3 rounded-full text-white font-semibold shadow ${filtersChanged ? "bg-blue-600 hover:scale-[1.01]" : "bg-gray-300 cursor-not-allowed"}`}
                >
                  Apply Filter
                </button>

                <button
                  onClick={resetFilters}
                  className="px-4 py-3 rounded-full border border-[#0000001A] text-sm"
                >
                  Clear
                </button>
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
                  className="font-[Poppins] font-normal text-base leading-none tracking-normal text-black w-7/12 ml-3"
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
                  className="px-4 py-2 border border-[#0000002A] rounded-[8px] text-sm"
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
                    className={`px-3 font-[Poppins] text-sm border ${page === i + 1 ? "text-gray-800 border-[#0000002A] bg-gray-100 py-2" : "text-gray-500 border-[#0000001A] bg-white py-[8px]"}`}
                  >
                    {i + 1}
                  </motion.button>
                ))}
              </div>
              <div>
                <motion.button
                  onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 border border-[#0000002A] rounded-[8px] text-sm"
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
