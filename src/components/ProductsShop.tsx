import { useState, useEffect } from "react";
import { Heart, Share2, Repeat2, SlidersHorizontal, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import sink from "../assets/product1.svg";
import { useLazyProductsQuery } from "@/redux/api/api";

const brands = ["Kohler", "Cera", "Johnson", "Jaquar", "Ruhe"];
const colors = ["#FFFFFF", "#000000", "#6B7280", "#0EA5E9", "#3B82F6"];
const finishTypes = ["Glossy White", "Matte", "Black", "Sand", "Custom"];
const priceRange = { min: 7000, max: 13000 };

function ProductCard({ product, isFav, onFav, onClick }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageSrc = product.image?.image_url || sink;

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className="rounded-lg shadow-lg overflow-hidden cursor-pointer flex flex-col group  outline-none "
      style={{ width: "100%", minWidth: 180, maxWidth: 330 }}
      onClick={() => onClick()}
    >
      <div className="relative p-1 bg-white">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-[420px] object-cover rounded-md "
          style={{ aspectRatio: "4/3" }}
          draggable={false}
        />
        {!isMobile && (
          <div className="absolute inset-0 flex flex-col rounded-md items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="mb-3 px-8 py-2 rounded-full shadow-lg bg-white text-blue-700 font-semibold text-sm sm:text-base hover:bg-blue-100 transition"
              onClick={(e) => {
                e.stopPropagation();
                // add to cart logic
              }}
            >
              Add to cart
            </button>
            <div className="flex items-center gap-4 sm:gap-6 mb-2">
              <button
                onClick={(e) => e.stopPropagation()}
                className="group/icon flex items-center gap-1 text-white text-xs sm:text-sm hover:text-blue-400 transition"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="group/icon flex items-center gap-1 text-white text-xs sm:text-sm hover:text-blue-400 transition"
              >
                <Repeat2 size={16} />
                <span>Compare</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFav(product.id);
                }}
                className="group/icon flex items-center gap-1 text-white text-xs sm:text-sm hover:text-blue-400 transition"
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

      {isMobile && (
        <div className="flex items-center gap-4 sm:gap-6 mt-2 px-1 mb-1">
          <button
            className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold flex-1 hover:bg-blue-700 transition"
            onClick={(e) => {
              e.stopPropagation();
              // add to cart logic
            }}
          >
            Add to cart
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFav(product.id);
            }}
            className={`flex items-center gap-1 text-sm font-medium ${
              isFav ? "text-red-600" : "text-gray-600"
            }`}
            type="button"
          >
            <Heart size={16} fill={isFav ? "#ef4444" : "none"} /> <span>Like</span>
          </button>
        </div>
      )}

      <div className="flex items-center justify-between px-5 pt-3 pb-4 border-t border-gray-200 gap-2">
        <div className="flex flex-col flex-1 min-w-0">
          <span className="block text-base font-semibold text-gray-900 truncate">
            {product.name}
          </span>
          <span className="block text-xs text-gray-500 font-medium pt-0.5">
            {product.brand}
          </span>
        </div>
        <span className="bg-[#F6F6F6] rounded-lg px-3 py-1 text-base font-semibold text-gray-900 border border-gray-100 ml-4 whitespace-nowrap">
          ₹{product.price?.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default function BestShop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [tempFilters, setTempFilters] = useState({
    brands: new Set(),
    finish: new Set(),
    colors: new Set(),
  });
  const [tempPriceValue, setTempPriceValue] = useState(priceRange.max);
  const [filters, setFilters] = useState({
    brands: new Set(),
    finish: new Set(),
    colors: new Set(),
  });
  const [priceValue, setPriceValue] = useState(priceRange.max);
  const [tab, setTab] = useState("new");
  const [products, setProducts] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const limit = 20;

  const [getProduct, { isLoading, data }] = useLazyProductsQuery();

  useEffect(() => {
    const newFilters = {
      brands: new Set(searchParams.getAll("brand")),
      finish: new Set(searchParams.getAll("finish")),
      colors: new Set(searchParams.getAll("color")),
    };
    setFilters(newFilters);
    setPriceValue(Number(searchParams.get("maxPrice")) || priceRange.max);
    setTempFilters(newFilters);
    setTempPriceValue(Number(searchParams.get("maxPrice")) || priceRange.max);
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    filters.brands.forEach((b) => params.append("brand", b));
    filters.finish.forEach((f) => params.append("finish", f));
    filters.colors.forEach((c) => params.append("color", c));
    params.append("maxPrice", priceValue);
    params.append("tab", tab);

    const query = {};
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
  }, [getProduct, page, filters, priceValue, tab]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const mapped = data.map((item, idx) => ({
        id: item.id ?? idx,
        name: item.name,
        price: Number(item.price),
        image: item.images && item.images.length > 0 ? item.images[0] : sink,
        brand: item.brand?.name ?? "Brand",
        slug: item.slug,
        stockQuantity: item.stock_quantity,
        available: item.available,
      }));
      setProducts(mapped);
    }
  }, [data]);

  const toggleTempFilter = (type, value) => {
    setTempFilters((prev) => {
      const set = new Set(prev[type]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...prev, [type]: set };
    });
  };

  const clearTempFilters = () => {
    setTempFilters({ brands: new Set(), finish: new Set(), colors: new Set() });
    setTempPriceValue(priceRange.max);
    setSearchParams({});
  };

  const toggleFavourite = (id) =>
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  const applyFilters = () => {
    setFilters(tempFilters);
    setPriceValue(tempPriceValue);
    setPage(1);
    const params = new URLSearchParams();
    params.append("page", "1");
    params.append("limit", limit.toString());
    tempFilters.brands.forEach((b) => params.append("brand", b));
    tempFilters.finish.forEach((f) => params.append("finish", f));
    tempFilters.colors.forEach((c) => params.append("color", c));
    params.append("maxPrice", tempPriceValue);
    params.append("tab", tab);
    setSearchParams(params);
    setShowFilters(false); // close sidebar on mobile
  };

  return (
    <div className="w-full py-6 px-2 sm:px-4 md:px-6 mx-auto">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* SIDEBAR */}
        <aside
          className={`fixed lg:static top-0 right-0 h-full w-72 bg-white shadow-xl border-l border-gray-200  transform transition-transform rounded-xl p-6 overflow-y-auto ${
            showFilters ? "translate-x-0" : "translate-x-full"
          } lg:translate-x-0`}
          style={{ maxHeight: "100%" }}
        >
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-base font-bold uppercase text-gray-800 tracking-widest">
              Filters
            </h2>
            <button onClick={() => setShowFilters(false)} aria-label="Close Filters">
              <X size={20} />
            </button>
          </div>

          <section className="mb-8 border-b border-gray-200 pb-6 last:border-0 last:mb-0">
            <h3 className="text-xs font-bold text-gray-700 uppercase mb-3 tracking-wide">
              Price
            </h3>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step={100}
              value={tempPriceValue}
              onChange={(e) => setTempPriceValue(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs mt-2 font-medium text-gray-600">
              <span>₹ {priceRange.min}</span>
              <span>₹ {tempPriceValue}</span>
            </div>
          </section>

          <section className="mb-8 border-b border-gray-200 pb-6">
            <h3 className="text-xs font-bold text-gray-700 uppercase mb-3 tracking-wide">
              Brands
            </h3>
            <ul className="space-y-2">
              {brands.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={tempFilters.brands.has(b)}
                    onChange={() => toggleTempFilter("brands", b)}
                    className="accent-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-800">{b}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8 border-b border-gray-200 pb-6">
            <h3 className="text-xs font-bold text-gray-700 uppercase mb-3 tracking-wide">
              Finish Type
            </h3>
            <ul className="space-y-2">
              {finishTypes.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={tempFilters.finish.has(f)}
                    onChange={() => toggleTempFilter("finish", f)}
                    className="accent-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-800">{f}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xs font-bold text-gray-700 uppercase mb-3 tracking-wide">
              Colors
            </h3>
            <div className="flex gap-2 flex-wrap">
              {colors.map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => toggleTempFilter("colors", col)}
                  className={`w-6 h-6 rounded-full border transition ${
                    tempFilters.colors.has(col)
                      ? "border-blue-600 ring-2 ring-blue-200"
                      : "border-gray-300"
                  } flex items-center justify-center`}
                  style={{ backgroundColor: col }}
                  aria-label={`Color filter ${col}`}
                >
                  {tempFilters.colors.has(col) && (
                    <span className="text-[11px] text-white font-bold select-none">✓</span>
                  )}
                </button>
              ))}
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={applyFilters}
              className="w-full sm:w-1/2 py-3 rounded-md text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
            >
              Apply
            </button>
            <button
              onClick={clearTempFilters}
              className="w-full sm:w-1/2 py-3 rounded-md text-sm sm:text-base bg-gray-100 text-gray-700 font-semibold shadow transition"
            >
              Clear
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 w-full">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 lg:hidden px-4 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              aria-label="Open Filters"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>

            <div className="flex rounded-full overflow-hidden border border-gray-300">
              <button
                onClick={() => setTab("new")}
                className={`text-sm px-6 py-2 font-semibold transition rounded-full ${
                  tab === "new" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                New
              </button>
              <button
                onClick={() => setTab("recommended")}
                className={`text-sm px-6 py-2 font-semibold transition rounded-full ${
                  tab === "recommended"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Recommended
              </button>
            </div>
          </div>

          <div className="w-full justify-center items-center bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
              {products.length > 0 ? (
                products.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    isFav={favourites.includes(p.id)}
                    onFav={toggleFavourite}
                    onClick={() => navigate(`/product/${p.slug || p.id}`)}
                  />
                ))
              ) : (
                <p className="text-gray-600 text-center col-span-full mt-24 text-lg font-medium">
                  {isLoading ? "Loading products..." : "No products found."}
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
