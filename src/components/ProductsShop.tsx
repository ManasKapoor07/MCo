import { useMemo, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { getColorForName } from "@/lib/utils";
import RangeSlider from "./RangeSlider";
import Dropdown from "./Dropdown";
import { SlidersHorizontal } from "lucide-react"; // icon for mobile filter toggle
import { useNavigate, useSearchParams } from "react-router-dom";

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

  // Defaults
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

  // --- applied filters ---
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

  // Other UI state
  const [sortBy, setSortBy] = useState<string>("Most Popular");
  const [page, setPage] = useState<number>(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false); // NEW for mobile sidebar toggle
  const pageSize = 12;

  const categories = [
    "Water Closet",
    "Wash Basin",
    "Bathtub",
    "Urinals",
    "Bathroom Vanity",
  ];
  const brands = ["Cera", "Ruhe", "Kohler", "Hindware", "Johnson Bathware"];
  const colors = ["white", "black", "purple", "teal", "blue"];

  function toggleSet<T>(setObj: Set<T>, value: T) {
    const copy = new Set(setObj);
    if (copy.has(value)) copy.delete(value);
    else copy.add(value);
    return copy;
  }

  const [searchParams, setSeachParams] = useSearchParams();
  const handleProducClick = (id) => {
    searchParams.set("produc_id", id);
    setSeachParams(searchParams);
  };

  const filtersChanged =
    stagedMinPrice !== appliedMinPrice ||
    stagedMaxPrice !== appliedMaxPrice ||
    stagedSelectedColor !== appliedSelectedColor ||
    !setsEqual(stagedSelectedCategories, appliedSelectedCategories) ||
    !setsEqual(stagedSelectedBrands, appliedSelectedBrands);

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

  function applyFilters() {
    setAppliedMinPrice(stagedMinPrice);
    setAppliedMaxPrice(stagedMaxPrice);
    setAppliedSelectedCategories(new Set(stagedSelectedCategories));
    setAppliedSelectedBrands(new Set(stagedSelectedBrands));
    setAppliedSelectedColor(stagedSelectedColor);
    setPage(1);
    setMobileFiltersOpen(false); // close on mobile
  }

  function resetFilters() {
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
    setMobileFiltersOpen(false);
  }

  useEffect(() => {
    setStagedMinPrice(appliedMinPrice);
    setStagedMaxPrice(appliedMaxPrice);
    setStagedSelectedCategories(new Set(appliedSelectedCategories));
    setStagedSelectedBrands(new Set(appliedSelectedBrands));
    setStagedSelectedColor(appliedSelectedColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const handleProductById = (prodId) => {
    navigate(`/product/${prodId}`);
  };

  return (
    <div className="min-h-screen py-4 px-3 sm:px-2">
      <div className="mx-5">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs mb-6 mt-2 sm:mb-4">
          <span className="font-semibold uppercase text-gray-900">Home</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="font-semibold uppercase text-blue-600">Shop</span>
        </nav>

        {/* Mobile "Filters" button shown only when sidebar is closed */}
        {!mobileFiltersOpen && (
          <div className="md:hidden mb-4">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-700"
              aria-label="Open Filters Sidebar"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          {/* Sidebar (desktop & mobile toggle) */}
          <div
            className={`fixed inset-y-0 z-40 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:col-span-3 md:translate-x-0 md:shadow-none md:w-auto ${
              mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="h-full overflow-y-auto shadow-sm shadow-blue-400 rounded-md md:h-auto md:overflow-visible p-6 border-r md:border-none">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-gray-900">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)} // Close sidebar on cross click
                  className="p-1 hover:bg-gray-100 rounded-full transition text-gray-500"
                  title="Close filters sidebar"
                  aria-label="Close Filters Sidebar"
                >
                  ✕
                </button>
              </div>
              <hr className="border-gray-100 mb-6" />

              {/* Filters */}
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
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() =>
                        setStagedSelectedCategories(
                          toggleSet(stagedSelectedCategories, c)
                        )
                      }
                      className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150
                        ${
                          stagedSelectedCategories.has(c)
                            ? "bg-blue-600 text-white shadow"
                            : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </Dropdown>

              <Dropdown title="Brands">
                <div className="flex flex-wrap gap-2">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() =>
                        setStagedSelectedBrands(
                          toggleSet(stagedSelectedBrands, b)
                        )
                      }
                      className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150
                        ${
                          stagedSelectedBrands.has(b)
                            ? "bg-blue-600 text-white shadow"
                            : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </Dropdown>

              <Dropdown title="Colors">
                <div className="flex items-center gap-3 mt-2 ml-2 flex-wrap">
                  {colors.map((c) => {
                    const selected = stagedSelectedColor === c;
                    const tickColor = c === "white" ? "#222" : "#fff";
                    return (
                      <button
                        aria-label={c}
                        key={c}
                        onClick={() =>
                          setStagedSelectedColor(selected ? null : c)
                        }
                        className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border
                          ${
                            selected
                              ? "ring-2 ring-blue-500 border-white scale-105"
                              : "border-gray-300"
                          }`}
                        style={{ background: getColorForName(c) }}
                        title={c}
                      >
                        {selected && (
                          <svg
                            className="absolute w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M20 6L9 17L4 12"
                              stroke={tickColor}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Dropdown>

              {/* Apply / Clear */}
              <div className="mt-7 flex flex-col sm:flex-row justify-between items-center gap-3">
                <button
                  onClick={applyFilters}
                  disabled={!filtersChanged}
                  className={`rounded-md font-semibold py-2 px-4 shadow-md transition w-full sm:w-1/2
                    ${
                      filtersChanged
                        ? "bg-blue-600 text-white hover:bg-blue-500"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  Apply
                </button>
                <button
                  onClick={resetFilters}
                  className="py-2 px-4 rounded-md border w-full sm:w-1/2 border-gray-200 text-sm text-gray-600 hover:bg-gray-100"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Main Products */}
          <main className="md:col-span-9 col-span-1 flex flex-col">
            {/* Mobile filter toggle info (hidden since we have separate button) */}
            {/* You can remove this block if you want to avoid duplicate toggles */}
            {/* 
            <div className="flex justify-between items-center mb-4 md:hidden">
              <div className="text-gray-700 text-sm font-medium">
                {filtered.length
                  ? `${filtered.length} Products`
                  : "No Products Found"}
              </div>
            </div> 
            */}

            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
              <div className="hidden md:block text-gray-700 font-medium text-sm">
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
                  className="bg-gray-100 rounded-md py-1 px-2 text-gray-700 text-sm"
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
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {showing.map((p) => (
                <div onClick={() => handleProductById(p.id)}>
                  <ProductCard key={p.id} product={p} />
                </div>
              ))}
            </section>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2 sm:gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-50 transition text-sm"
                disabled={page === 1}
              >
                ← Prev
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: pages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1.5 rounded-full font-semibold text-sm transition
                      ${
                        page === i + 1
                          ? "bg-blue-600 text-white shadow"
                          : "bg-gray-100 text-slate-700"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-50 transition text-sm"
                disabled={page === pages}
              >
                Next →
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
