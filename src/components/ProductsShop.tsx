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
      price: 10627 + (i % 6) * 100,
      rating: 3.5,
      reviews: (10 + i * 3) % 200,
      image: null,
      brand: ["Johnson Bathware", "Kohler", "Cera", "Hindware", "Ruhe"][i % 5],
      category: [
        "Water Closet",
        "Wash Basin",
        "Bathtub",
        "Urinals",
        "Bathroom Vanity",
      ][i % 5],
      color: ["white", "black", "teal", "blue", "purple"][i % 5],
    }));
  }, []);

  // DEFAULTS
  const DEFAULT_MIN = 7000;
  const DEFAULT_MAX = 11000;

  // --- staged UI state (what user is currently choosing) ---
  const [stagedMinPrice, setStagedMinPrice] = useState<number>(DEFAULT_MIN);
  const [stagedMaxPrice, setStagedMaxPrice] = useState<number>(DEFAULT_MAX);
  const [stagedSelectedCategories, setStagedSelectedCategories] = useState<
    Set<string>
  >(new Set());
  const [stagedSelectedBrands, setStagedSelectedBrands] = useState<Set<string>>(
    new Set()
  );
  const [stagedSelectedColor, setStagedSelectedColor] = useState<string | null>(
    null
  );

  // --- applied filters (used to compute filtered products) ---
  const [appliedMinPrice, setAppliedMinPrice] = useState<number>(DEFAULT_MIN);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number>(DEFAULT_MAX);
  const [appliedSelectedCategories, setAppliedSelectedCategories] = useState<
    Set<string>
  >(new Set());
  const [appliedSelectedBrands, setAppliedSelectedBrands] = useState<
    Set<string>
  >(new Set());
  const [appliedSelectedColor, setAppliedSelectedColor] = useState<
    string | null
  >(null);

  // other UI state
  const [sortBy, setSortBy] = useState<string>("Most Popular");
  const [page, setPage] = useState<number>(1);
  const pageSize = 12;

  // categories / brands / colors data
  const categories = [
    "Water Closet",
    "Wash Basin",
    "Bathtub",
    "Urinals",
    "Bathroom Vanity",
  ];
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
    let list = sampleProducts.filter(
      (p) => p.price >= appliedMinPrice && p.price <= appliedMaxPrice
    );

    if (appliedSelectedCategories.size)
      list = list.filter((p) => appliedSelectedCategories.has(p.category));
    if (appliedSelectedBrands.size)
      list = list.filter((p) => appliedSelectedBrands.has(p.brand));
    if (appliedSelectedColor)
      list = list.filter((p) => p.color === appliedSelectedColor);

    if (sortBy === "Price: Low to High")
      list = list.slice().sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low")
      list = list.slice().sort((a, b) => b.price - a.price);
    else if (sortBy === "Newest") list = list.slice().reverse();

    return list;
  }, [
    sampleProducts,
    appliedMinPrice,
    appliedMaxPrice,
    appliedSelectedCategories,
    appliedSelectedBrands,
    appliedSelectedColor,
    sortBy,
  ]);

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
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 py-4 px-2 md:px-2">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs mb-8">
          <span className="font-semibold tracking-wide uppercase text-gray-900">
            Home
          </span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="font-semibold tracking-wide uppercase text-blue-600">
            Shop
          </span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="md:col-span-3 col-span-1 md:sticky md:top-24">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.36 }}
              className="bg-white/90 shadow-lg p-6 rounded-2xl border border-slate-100"
            >
              {/* Filters heading */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-gray-900">Filters</h3>
                <button
                  onClick={resetFilters}
                  className="p-1 hover:bg-gray-100 rounded-full transition"
                  title="Clear all filters"
                >
                  {/* Your SVG here */}
                </button>
              </div>
              <hr className="border-gray-100 mb-6" />

              {/* Filter controls */}
              <Dropdown title="Price">
                <div className="mb-2 text-sm text-gray-700">
                  <span className="font-medium">
                    ₹{stagedMinPrice.toLocaleString()} - ₹
                    {stagedMaxPrice.toLocaleString()}
                  </span>
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
              <Dropdown title="Category">
                <motion.div layout className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() =>
                        setStagedSelectedCategories(
                          toggleSet(stagedSelectedCategories, c)
                        )
                      }
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150
                        ${
                          stagedSelectedCategories.has(c)
                            ? "bg-pink-600 text-white shadow"
                            : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                        }`}
                    >
                      {c}
                    </button>
                  ))}
                </motion.div>
              </Dropdown>
              <Dropdown title="Brands">
                <motion.div layout className="flex flex-wrap gap-2">
                  {brands.map((b) => (
                    <motion.button
                      key={b}
                      onClick={() =>
                        setStagedSelectedBrands(
                          toggleSet(stagedSelectedBrands, b)
                        )
                      }
                      whileTap={{ scale: 0.97 }}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150
                        ${
                          stagedSelectedBrands.has(b)
                            ? "bg-blue-600 text-white shadow"
                            : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                    >
                      {b}
                    </motion.button>
                  ))}
                </motion.div>
              </Dropdown>
              <Dropdown title="Colors">
                <motion.div
                  layout
                  className="flex items-center gap-3 mt-2 ml-2"
                >
                  {colors.map((c) => {
                    const selected = stagedSelectedColor === c;
                    const tickColor = c === "white" ? "#222" : "#fff";
                    return (
                      <motion.button
                        aria-label={c}
                        key={c}
                        onClick={() =>
                          setStagedSelectedColor(selected ? null : c)
                        }
                        whileTap={{ scale: 0.95 }}
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center border
                          ${
                            selected
                              ? "ring-2 ring-pink-500 border-white scale-105"
                              : "border-gray-300"
                          }
                        transition`}
                        style={{ background: getColorForName(c) }}
                        title={c}
                        aria-pressed={selected}
                      >
                        <motion.svg
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={
                            selected
                              ? { scale: 1, opacity: 1 }
                              : { scale: 0.6, opacity: 0 }
                          }
                          transition={{ duration: 0.21 }}
                          className="absolute w-4 h-4 pointer-events-none"
                          viewBox="0 0 24 24"
                          fill="none"
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

              {/* Apply / Clear */}
              <div className="mt-7 flex justify-between items-center gap-2">
                <button
                  onClick={applyFilters}
                  disabled={!filtersChanged}
                  className={`rounded-md font-semibold p-2 shadow-lg transition w-[50%]
                    ${
                      filtersChanged
                        ? "bg-blue-600 text-white hover:bg-blue-500 hover:scale-[1.03]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  Apply
                </button>
                <button
                  onClick={resetFilters}
                  className="p-2 rounded-md border w-[50%] border-gray-200 text-sm text-gray-600 hover:bg-gray-100"
                >
                  Clear
                </button>
              </div>
            </motion.div>
          </aside>

          {/* Main Products Area */}
          <main className="md:col-span-9 col-span-1 flex flex-col  -mt-5">
            {/* Header: Product count & sort */}
            <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
              <div className="text-gray-700 font-medium text-sm">
                {filtered.length
                  ? `Showing ${(page - 1) * pageSize + 1}–${Math.min(
                      page * pageSize,
                      filtered.length
                    )} of ${filtered.length} Products`
                  : "No Products Found"}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">Sort by:</span>
                <select
                  className="bg-gray-100 rounded-md py-1 px-2 focus:ring-pink-500 border-none text-gray-700 text-sm"
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

            {/* Product Grid */}
            <motion.section
              layout
              variants={gridVariants}
              animate="animate"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence initial={false} mode="popLayout">
                {showing.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </AnimatePresence>
            </motion.section>

            {/* Pagination */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <motion.button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-pink-50 transition"
                disabled={page === 1}
              >
                ← Prev
              </motion.button>
              <div className="flex items-center gap-1">
                {Array.from({ length: pages }).map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    whileTap={{ scale: 0.99 }}
                    className={`px-4 py-1.5 rounded-full font-semibold transition
                      ${
                        page === i + 1
                          ? "bg-blue-600 text-white shadow"
                          : "bg-gray-100 text-slate-700"
                      }
                    `}
                  >
                    {i + 1}
                  </motion.button>
                ))}
              </div>
              <motion.button
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-pink-50 transition"
                disabled={page === pages}
              >
                Next →
              </motion.button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
