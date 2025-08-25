import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  SearchIcon,
  Star,
  X,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import sink from "../assets/PremiumShowcase.png"; // Placeholder image
import { useLazyProductsQuery } from "@/redux/api/api";

const brands = ["Kohler", "Cera", "Johnson", "Jaquar", "Ruhe"];
const discounts = [15, 20];
const deliveryOptions = ["Free Installation"];
const categories = [
  "Water Closet",
  "Wash Basin",
  "Bathtub",
  "Urinals",
  "Bathroom Vanity",
];
const colors = ["#FFFFFF", "#000000", "#6B7280", "#0EA5E9", "#3B82F6"];

export default function BestShop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // All temporary states used in UI inputs before applying
  const [tempFilters, setTempFilters] = useState({
    brands: new Set<string>(),
    discounts: new Set<number>(),
    delivery: new Set<string>(),
    categories: new Set<string>(),
    colors: new Set<string>(),
  });
  const [tempSearchText, setTempSearchText] = useState("");
  const [tempSortKey, setTempSortKey] = useState<
    "priceAsc" | "priceDesc" | "ratingDesc" | "none"
  >("none");
  const priceRange = { min: 5000, max: 15000 };
  const [tempPriceValue, setTempPriceValue] = useState(priceRange.max);

  // Actual filter state (synced from URL) used for API calls and displaying products
  const [filters, setFilters] = useState({
    brands: new Set<string>(),
    discounts: new Set<number>(),
    delivery: new Set<string>(),
    categories: new Set<string>(),
    colors: new Set<string>(),
  });
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState<
    "priceAsc" | "priceDesc" | "ratingDesc" | "none"
  >("none");
  const [priceValue, setPriceValue] = useState(priceRange.max);

  const [showFilters, setShowFilters] = useState(false);
  const [openFilters, setOpenFilters] = useState({
    brand: true,
    discount: true,
    delivery: true,
    category: true,
    color: true,
    price: true,
  });

  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 20;
  const [getProduct, { isLoading, data }] = useLazyProductsQuery();
  const [favourites, setFavourites] = useState<number[]>([]);

  // Parse URL params into sets for actual filters on mount & param change
  useEffect(() => {
    const newFilters = {
      brands: new Set(searchParams.getAll("brand")),
      discounts: new Set(
        searchParams.getAll("discount").map(Number).filter(Boolean)
      ),
      delivery: new Set(searchParams.getAll("delivery")),
      categories: new Set(searchParams.getAll("category")),
      colors: new Set(searchParams.getAll("color")),
    };
    setFilters(newFilters);
    setSearchText(searchParams.get("name") || "");
    setSortKey(
      searchParams.get("sort") === "price_asc"
        ? "priceAsc"
        : searchParams.get("sort") === "price_desc"
        ? "priceDesc"
        : searchParams.get("sort") === "rating_desc"
        ? "ratingDesc"
        : "none"
    );
    setPriceValue(Number(searchParams.get("maxPrice")) || priceRange.max);

    // Also reflect on temp controls when URL changes (e.g. back/forward navigation)
    setTempFilters(newFilters);
    setTempSearchText(searchParams.get("name") || "");
    setTempSortKey(
      searchParams.get("sort") === "price_asc"
        ? "priceAsc"
        : searchParams.get("sort") === "price_desc"
        ? "priceDesc"
        : searchParams.get("sort") === "rating_desc"
        ? "ratingDesc"
        : "none"
    );
    setTempPriceValue(Number(searchParams.get("maxPrice")) || priceRange.max);
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  // Fetch products when actual filters change
  useEffect(() => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (searchText) params.append("name", searchText);
    filters.brands.forEach((b) => params.append("brand", b));
    filters.discounts.forEach((d) => params.append("discount", d.toString()));
    filters.delivery.forEach((d) => params.append("delivery", d));
    filters.categories.forEach((c) => params.append("category", c));
    filters.colors.forEach((c) => params.append("color", c));
    params.append("maxPrice", priceValue.toString());
    if (sortKey === "priceAsc") params.append("sort", "price_asc");
    else if (sortKey === "priceDesc") params.append("sort", "price_desc");
    else if (sortKey === "ratingDesc") params.append("sort", "rating_desc");

    const query: Record<string, any> = {};
    params.forEach((value, key) => {
      if (query[key]) {
        query[key] = Array.isArray(query[key])
          ? [...query[key], value]
          : [query[key], value];
      } else {
        query[key] = value;
      }
    });

    getProduct(query);
  }, [getProduct, page, filters, searchText, sortKey, priceValue]);

  // Map API data
  useEffect(() => {
    if (data?.success && Array.isArray(data.data)) {
      const mapped = data.data.map((item: any, idx: number) => {
        const basePrice = item.price + 300;
        const discountPercent = Math.round(
          ((basePrice - item.price) / basePrice) * 100
        );
        return {
          id: item.id ?? idx,
          name: item.product_name,
          brand: item.company,
          price: item.price,
          oldPrice: basePrice,
          discount: discountPercent,
          rating: item.rating ?? 4.0,
          reviews: item.reviews ?? 1000,
          image: sink,
          delivery: item.delivery ?? "Free Installation",
          stock: item.stock ?? null,
          category: item.category ?? "",
          color: item.color ?? "",
        };
      });
      setProducts(mapped);
    }
  }, [data]);

  // Handlers for temp controls (update local tempFilters etc)
  const toggleTempFilter = (type: keyof typeof tempFilters, value: any) => {
    setTempFilters((prev) => {
      const newSet = new Set(prev[type]);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      return { ...prev, [type]: newSet };
    });
  };
  const clearTempFilters = () => {
    setTempFilters({
      brands: new Set(),
      discounts: new Set(),
      delivery: new Set(),
      categories: new Set(),
      colors: new Set(),
    });
    setTempSearchText("");
    setTempSortKey("none");
    setTempPriceValue(priceRange.max);
    setPage(1);

    // Remove all query params from URL on clear
    setSearchParams({});
    setShowFilters(false);
  };

  const toggleFavourite = (id: number) =>
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  const toggleDropdown = (key: keyof typeof openFilters) =>
    setOpenFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  // Apply Filters (copy temp to actual state and update URL params)
  const applyFilters = () => {
    setFilters(tempFilters);
    setSearchText(tempSearchText);
    setSortKey(tempSortKey);
    setPriceValue(tempPriceValue);
    setPage(1);

    // Build URL params from temp state
    const params = new URLSearchParams();
    params.append("page", "1");
    params.append("limit", limit.toString());
    if (tempSearchText) params.append("name", tempSearchText);
    tempFilters.brands.forEach((b) => params.append("brand", b));
    tempFilters.discounts.forEach((d) =>
      params.append("discount", d.toString())
    );
    tempFilters.delivery.forEach((d) => params.append("delivery", d));
    tempFilters.categories.forEach((c) => params.append("category", c));
    tempFilters.colors.forEach((c) => params.append("color", c));
    params.append("maxPrice", tempPriceValue.toString());
    if (tempSortKey === "priceAsc") params.append("sort", "price_asc");
    else if (tempSortKey === "priceDesc") params.append("sort", "price_desc");
    else if (tempSortKey === "ratingDesc") params.append("sort", "rating_desc");

    setSearchParams(params);
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen py-10 px-2 sm:px-4 md:px-6">
      <div className="mx-auto flex flex-col lg:flex-row gap-10">
        <aside
          className={`sticky top-16 h-fit w-full max-w-xs bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-transform transform lg:translate-x-0 ${
            showFilters ? "translate-x-0" : "translate-x-[-110%]"
          } lg:static lg:block z-30`}
          style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-2 lg:hidden px-2">
            <h2 className="text-xl font-semibold text-gray-900 tracking-wide">
              Filters
            </h2>
            <button
              onClick={() => setShowFilters(false)}
              aria-label="Close Filters"
              className="p-1 rounded-md hover:bg-gray-100 transition"
            >
              <X size={24} strokeWidth={2} className="text-gray-900" />
            </button>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2 hidden lg:block tracking-wide">
            Filters
          </h2>

          {/* Search */}
          <div className="mb-6 relative">
            <label
              htmlFor="search"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Search
            </label>
            <div className="relative">
              <input
                id="search"
                type="search"
                value={tempSearchText}
                onChange={(e) => setTempSearchText(e.target.value)}
                placeholder="Type to search..."
                className="w-full border border-gray-300 text-sm px-4 py-2 text-gray-900 placeholder-gray-400 rounded-md focus:outline-none focus:border-blue-500 focus:shadow-[0_2px_15px_-3px_rgba(59,130,246,0.3)] transition duration-300 ease-in-out"
                aria-label="Search products"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none opacity-70 transition-opacity duration-300 ease-in-out">
                <SearchIcon />
              </span>
            </div>
          </div>

          {/* Price Range */}
          <section className="mb-6">
            <button
              type="button"
              onClick={() => toggleDropdown("price")}
              className="w-full flex justify-between items-center text-base font-semibold text-gray-800 border-b border-gray-300 py-1.5 cursor-pointer"
              aria-expanded={openFilters.price}
              aria-controls="price-filter"
            >
              Price
              {openFilters.price ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            {openFilters.price && (
              <div id="price-filter" className="mt-3">
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  step={100}
                  value={tempPriceValue}
                  onChange={(e) => setTempPriceValue(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>₹ {priceRange.min.toLocaleString()}</span>
                  <span>₹ {tempPriceValue.toLocaleString()}</span>
                </div>
              </div>
            )}
          </section>

          {/* Categories */}
          <section className="mb-6">
            <button
              type="button"
              onClick={() => toggleDropdown("category")}
              className="w-full flex justify-between items-center text-base font-semibold text-gray-800 border-b border-gray-300 py-1.5 cursor-pointer"
              aria-expanded={openFilters.category}
              aria-controls="category-filter"
            >
              Category
              {openFilters.category ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            {openFilters.category && (
              <div id="category-filter" className="mt-3 flex flex-wrap gap-2">
                {categories.map((c) => {
                  const isActive = tempFilters.categories.has(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleTempFilter("categories", c)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                        isActive
                          ? "bg-gray-200 text-gray-900 border-blue-300 shadow"
                          : "bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* Brands */}
          <section className="mb-6">
            <button
              type="button"
              onClick={() => toggleDropdown("brand")}
              className="w-full flex justify-between items-center text-base font-semibold text-gray-800 border-b border-gray-300 py-1.5 cursor-pointer"
              aria-expanded={openFilters.brand}
              aria-controls="brand-filter"
            >
              Brands
              {openFilters.brand ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            {openFilters.brand && (
              <div id="brand-filter" className="mt-3 flex flex-wrap gap-2">
                {brands.map((b) => {
                  const isActive = tempFilters.brands.has(b);
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => toggleTempFilter("brands", b)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* Discounts */}
          <section className="mb-6">
            <button
              type="button"
              onClick={() => toggleDropdown("discount")}
              className="w-full flex justify-between items-center text-base font-semibold text-gray-800 border-b border-gray-300 py-1.5 cursor-pointer"
              aria-expanded={openFilters.discount}
              aria-controls="discount-filter"
            >
              Discount %
              {openFilters.discount ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            {openFilters.discount && (
              <div id="discount-filter" className="mt-3 flex flex-wrap gap-2">
                {discounts.map((d) => {
                  const isActive = tempFilters.discounts.has(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleTempFilter("discounts", d)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {d}% Off
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* Delivery */}
          <section className="mb-6">
            <button
              type="button"
              onClick={() => toggleDropdown("delivery")}
              className="w-full flex justify-between items-center text-base font-semibold text-gray-800 border-b border-gray-300 py-1.5 cursor-pointer"
              aria-expanded={openFilters.delivery}
              aria-controls="delivery-filter"
            >
              Delivery Options
              {openFilters.delivery ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            {openFilters.delivery && (
              <div id="delivery-filter" className="mt-3 flex flex-wrap gap-2">
                {deliveryOptions.map((d) => {
                  const isActive = tempFilters.delivery.has(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleTempFilter("delivery", d)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* Colors */}
          <section className="mb-8">
            <button
              type="button"
              onClick={() => toggleDropdown("color")}
              className="w-full flex justify-between items-center text-base font-semibold text-gray-800 border-b border-gray-300 py-1.5 cursor-pointer"
              aria-expanded={openFilters.color}
              aria-controls="color-filter"
            >
              Colors
              {openFilters.color ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            {openFilters.color && (
              <div id="color-filter" className="mt-3 flex gap-3">
                {colors.map((col) => {
                  const isActive = tempFilters.colors.has(col);
                  return (
                    <button
                      key={col}
                      type="button"
                      onClick={() => toggleTempFilter("colors", col)}
                      className={`w-7 h-7 rounded-full border-2 transition relative ${
                        isActive ? "border-blue-600" : "border-gray-200"
                      }`}
                      style={{ background: col }}
                      aria-label={col}
                    >
                      {isActive && (
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <div className="flex justify-center items-center gap-5">
            <button
              onClick={applyFilters}
              className="w-full py-2 rounded-md text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
            >
              Apply Filter
            </button>
            <button
              onClick={() => {
                clearTempFilters();

                setShowFilters(false);
              }}
              className="w-full py-2 rounded-md bg-gray-200 text-gray-600 font-semibold shadow transition"
            >
              Clear
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between gap-6 items-center mb-8">
            <button
              className="lg:hidden px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md"
              onClick={() => setShowFilters(true)}
              aria-label="Show Filters"
            >
              Filters
            </button>

            {/* <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <label
                htmlFor="sort"
                className="text-gray-700 text-sm font-medium"
              >
                Sort by:
              </label>
              <div className="relative w-40">
                <select
                  id="sort"
                  value={tempSortKey}
                  onChange={(e) => setTempSortKey(e.target.value as any)}
                  className="w-full appearance-none border border-gray-300 bg-white px-4 py-2 pr-8 text-sm font-medium text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition"
                >
                  <option value="none">Default</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="ratingDesc">Rating: High to Low</option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div> */}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 -mt-8 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products.length > 0 ? (
              products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-transform duration-200 hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative rounded-t-lg overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-52 object-cover rounded-t-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between relative">
                    <button
                      onClick={() => toggleFavourite(p.id)}
                      aria-label="Toggle Favorite"
                      className="absolute top-1 right-4 rounded-full p-2 hover:bg-gray-100 transition"
                    >
                      <Heart
                        size={22}
                        className={
                          favourites.includes(p.id)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400 hover:text-gray-700"
                        }
                      />
                    </button>
                    <div>
                      <span className="block text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">
                        {p.brand}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                        {p.name}
                      </h3>
                      <span className=" bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md select-none z-10">
                        {p.discount}% OFF
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-xl font-bold text-blue-700">
                          ₹{p.price.toLocaleString()}
                        </span>
                        <span className="text-sm line-through text-gray-400">
                          ₹{p.oldPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Star size={18} className="text-yellow-400" />
                        <span className="font-semibold text-sm">
                          {p.rating.toFixed(1)}
                        </span>
                        <span className="text-gray-500 text-xs">
                          ({Math.floor(p.reviews / 1000)}k+ reviews)
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                        <span className="px-3 py-1 bg-gray-100 rounded-full font-semibold">
                          {p.delivery}
                        </span>

                      </div>
                      <button className="mt-2 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-2 shadow-md transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-full mt-20 text-lg font-medium">
                {isLoading
                  ? "Loading products..."
                  : "No products found matching your criteria."}
              </p>
            )}
          </div>

          {/* Pagination */}
          {data?.total_pages > 1 && (
            <div className="flex justify-center gap-3 mt-12">
              {Array.from({ length: data.total_pages }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-4 py-2 rounded-md font-semibold shadow transition ${
                      page === p
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                    aria-current={page === p ? "page" : undefined}
                  >
                    {p}
                  </button>
                )
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
