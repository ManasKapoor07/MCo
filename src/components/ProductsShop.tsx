import { useState, useEffect } from "react";
import { Heart, Share2, Repeat2, SlidersHorizontal, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import sink from "../assets/PremiumShowcase.png";
import { useLazyProductsQuery } from "@/redux/api/api";

// --- Product Card ---
function ProductCard({ product, isFav, onFav, onClick }) {
  return (
    <div
      className="rounded-md overflow-hidden cursor-pointer flex flex-col group transition-shadow"
      style={{ width: "100%", minWidth: 180, maxWidth: 280 }}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[320px] sm:h-[370px] object-cover bg-gray-50 rounded-md"
          style={{ aspectRatio: "4/3" }}
          draggable={false}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex flex-col rounded-md items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40 z-10">
          <button
            className="mb-3 hover:cursor-pointer px-6 py-2 rounded shadow bg-white text-blue-700 font-semibold text-sm sm:text-base"
            onClick={(e) => {
              e.stopPropagation();
              /* add to cart logic */
            }}
          >
            Add to cart
          </button>
          <div className="flex items-center gap-4 sm:gap-6 mb-2">
            <button
              onClick={(e) => e.stopPropagation()}
              className="group/icon flex items-center gap-1 text-white text-xs sm:text-sm hover:text-blue-400 transition"
            >
              <Share2 size={16} className="group-hover/icon:text-blue-400" />
              <span>Share</span>
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="group/icon flex items-center gap-1 text-white text-xs sm:text-sm hover:text-blue-400 transition"
            >
              <Repeat2 size={16} className="group-hover/icon:text-blue-400" />
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
                className={
                  isFav
                    ? "fill-red-500 text-red-500"
                    : "text-white group-hover/icon:text-blue-400"
                }
                fill={isFav ? "#ef4444" : "none"}
              />
              <span>Like</span>
            </button>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="flex items-end justify-between px-3 pt-2 pb-3 gap-2">
        <div className="flex flex-col flex-1 min-w-0">
          <span className="block text-sm font-semibold text-gray-900 truncate">
            {product.name}
          </span>
          <span className="block text-xs text-gray-500 font-medium pt-0.5">
            {product.brand}
          </span>
        </div>
        <span className="bg-[#F6F6F6] rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-sm sm:text-base font-semibold text-gray-900 border border-gray-100 ml-2">
          ₹{product.price?.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
// --- End Product Card ---

export default function BestShop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // State
  const [tempFilters, setTempFilters] = useState({
    brands: new Set(),
    finish: new Set(),
    colors: new Set(),
  });
  const [tempPriceValue, setTempPriceValue] = useState(null);
  const [filters, setFilters] = useState({
    brands: new Set(),
    finish: new Set(),
    colors: new Set(),
  });
  const [priceValue, setPriceValue] = useState(null);
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
    setPriceValue(Number(searchParams.get("maxPrice")) || null);
    setTempFilters(newFilters);
    setTempPriceValue(Number(searchParams.get("maxPrice")) || null);
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    filters.brands.forEach((b) => params.append("brand", b));
    filters.finish.forEach((f) => params.append("finish", f));
    filters.colors.forEach((c) => params.append("color", c));
    if (priceValue) params.append("maxPrice", priceValue);
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
    if (data?.success && Array.isArray(data.data)) {
      const mapped = data.data.map((item, idx) => ({
        id: item.id ?? idx,
        name: item.product_name,
        price: item.price,
        image: sink,
        brand: item.company ?? "Brand",
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
    setTempPriceValue(null);
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
    if (tempPriceValue) params.append("maxPrice", tempPriceValue);
    params.append("tab", tab);
    setSearchParams(params);
    setShowFilters(false); // close sidebar on mobile
  };

  return (
    <div className="w-full py-6 px-2 sm:px-4 md:px-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* SIDEBAR */}
        <aside
          className={`fixed lg:static top-0 right-0 h-full w-72 bg-white shadow-lg border-l border-gray-200 z-50 transform transition-transform ${
            showFilters ? "translate-x-0" : "translate-x-full"
          } lg:translate-x-0 rounded-none lg:rounded-xl p-6`}
        >
          {/* Close btn on mobile */}
          <div className="flex justify-between items-center mb-5 lg:hidden">
            <h2 className="text-sm font-bold uppercase text-gray-800">
              Filters
            </h2>
            <button onClick={() => setShowFilters(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Filters content */}
          <div className="space-y-8">
            {/* Example filter inputs - replace with dynamic API-driven filters */}
            <section>
              <div className="text-xs font-bold text-gray-700 uppercase mb-3 tracking-wider">
                Price
              </div>
              <input
                type="number"
                value={tempPriceValue ?? ""}
                onChange={(e) => setTempPriceValue(Number(e.target.value))}
                placeholder="Enter max price"
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </section>

            <div className="flex gap-3">
              <button
                onClick={applyFilters}
                className="w-1/2 py-2 rounded-md text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
              >
                Apply
              </button>
              <button
                onClick={clearTempFilters}
                className="w-1/2 py-2 rounded-md text-sm sm:text-base bg-gray-100 text-gray-700 font-semibold shadow transition"
              >
                Clear
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 w-full">
          {/* Top Controls */}
          <div className="flex justify-between items-center mb-4">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 lg:hidden px-3 py-2 rounded-md border text-sm font-medium text-gray-700"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>

            {/* Tabs */}
            <div className="flex rounded-full overflow-hidden">
              <button
                onClick={() => setTab("new")}
                className={`text-sm px-5 py-2 font-semibold transition ${
                  tab === "new" ? "text-blue-600" : "text-gray-700"
                }`}
              >
                New
              </button>
              <button
                onClick={() => setTab("recommended")}
                className={`text-sm px-5 py-2 font-semibold transition ${
                  tab === "recommended" ? "text-blue-600" : "text-gray-700"
                }`}
              >
                Recommended
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
            {products.length > 0 ? (
              products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isFav={favourites.includes(p.id)}
                  onFav={toggleFavourite}
                  onClick={() => navigate(`/product/${p.id}`)}
                />
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-full mt-24 text-lg font-medium">
                {isLoading ? "Loading products..." : "No products found."}
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
