import React, { useState } from "react";
import sink from "../assets/sinka.jpg";
import bathrrom from "../assets/PremiumShowcase.png";
import shop from "../assets/PremiumShowcase.png";

import { ChevronDown } from "lucide-react";

/* ---------- Types ---------- */
type Product = {
  id: number;
  title: string;
  price: number;
  category?: string;
  images: string[];
  colors: string[];
  description: string;
  specs: { label: string; value: string }[];
  installation: string[];
  reviews: {
    id: number;
    author: string;
    date: string;
    rating: number;
    text: string;
  }[];
};

/* ---------- Helpers ---------- */
const inr = (v: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(v);

const COLOR_MAP: Record<string, string> = {
  white: "#FFFFFF",
  black: "#111827",
  teal: "#14B8A6",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  light: "#E6EAE4",
  beige: "#EDE8DA",
};

/* ---------- Icons ---------- */
function IconStar({
  className = "w-4 h-4 inline-block fill-gray-200",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function IconShare({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 6l-4-4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconHeart({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Review Item ---------- */
function ReviewItem({ r }: { r: Product["reviews"][number] }) {
  return (
    <div className="flex gap-5 py-6 border-b border-gray-100">
      <div className="flex-none">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-lg font-semibold text-white shadow">
          {r.author.charAt(0)}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-[Poppins] font-semibold text-base">
            {r.author}
          </div>
          <div className="text-sm text-gray-400">{r.date}</div>
        </div>
        <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <IconStar
              key={i}
              className={`w-5 h-5 ${
                i < r.rating ? "fill-yellow-400" : "fill-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-base text-gray-700 mt-3">{r.text}</p>
      </div>
    </div>
  );
}

/* ---------- Product Data ---------- */
const sampleProduct: Product = {
  id: 1,
  title: "Premium Ceramic Basin",
  price: 7568,
  category: "Wash Basin",
  images: [bathrrom, bathrrom, sink],
  colors: ["black", "light", "beige"],
  description:
    "Upgrade your bathroom with this sleek, premium rectangular countertop basin. Crafted from high-gloss ceramic with a smooth finish, it combines functionality and elegance.",
  specs: [
    { label: "Dimensions", value: "60cm (W) × 40cm (D) × 15cm (H)" },
    { label: "Material", value: "High-grade ceramic" },
    { label: "Weight", value: "12.5 kg" },
    { label: "Warranty", value: "10 years" },
  ],
  installation: [
    "Wall-mounted bracket system included",
    "Requires solid wall construction",
    "Professional installation recommended",
    "Standard waste fitting (32mm)",
  ],
  reviews: [
    {
      id: 1,
      author: "Abel Tesfaye",
      date: "Dec 9, 2022",
      rating: 5,
      text: "Amazing quality! Perfect for a professional look. Will definitely reorder.",
    },
    {
      id: 2,
      author: "Selena Hadid",
      date: "Dec 9, 2022",
      rating: 4,
      text: "Comfortable and practical product for everyday use.",
    },
  ],
};

/* ---------- More Like This Sample Products ---------- */
const moreLikeThis: Product[] = [
  {
    id: 2,
    title: "Modern Wall-mounted Basin",
    price: 6799,
    category: "Wash Basin",
    images: [shop],
    colors: ["white", "light"],
    description: "Stylish wall-mounted basin with elegant finish.",
    specs: [],
    installation: [],
    reviews: [],
  },
  {
    id: 3,
    title: "Classic Ceramic Wash Basin",
    price: 5899,
    category: "Wash Basin",
    images: [sink],
    colors: ["beige", "black"],
    description: "Classic design with premium ceramic material.",
    specs: [],
    installation: [],
    reviews: [],
  },
  {
    id: 4,
    title: "Compact Basin with Tap Hole",
    price: 5200,
    category: "Wash Basin",
    images: [bathrrom],
    colors: ["white", "blue"],
    description: "Space-saving basin with built-in tap hole.",
    specs: [],
    installation: [],
    reviews: [],
  },
];

/* ---------- Main Component ---------- */
export default function ProductDetail() {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (section: string) => {
    setOpen(open === section ? null : section);
  };
  const p = sampleProduct;
  const [mainIndex, setMainIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    p.colors[0]
  );
  const [wish, setWish] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 py-6">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="text-[10px] sm:text-xs text-gray-500 mb-4">
          <span className="font-[Poppins] font-semibold uppercase tracking-wide">
            Home
          </span>
          <span className="mx-2">/</span>
          <span className="font-[Poppins] font-semibold uppercase text-gray-400">
            {p.title}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10 w-full">
          {/* Left: Gallery */}
          <div className="flex w-full lg:w-[55%] flex-col">
            <div className="rounded-xl w-full shadow-xl">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={p.images[mainIndex]}
                  alt={p.title}
                  className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Thumbnails with scroll on mobile */}
            <div className="mt-4 flex w-full overflow-x-auto gap-3 pb-2 hide-scrollbar">
              {p.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainIndex(i)}
                  className={`flex-shrink-0 rounded-xl overflow-hidden border transition ${
                    i === mainIndex
                      ? "border-blue-500 ring-2 ring-blue-200 shadow scale-105"
                      : "border-gray-200 hover:scale-105 hover:shadow"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${p.title} ${i + 1}`}
                    className="w-24 sm:w-32 md:w-40 h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col w-full lg:w-[45%] space-y-8 mt-6 lg:mt-0">
            {/* Title & Price */}
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-xs sm:text-sm text-gray-600 mb-3">
                {p.category}
              </div>
              <h1 className="font-[Poppins] font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-gray-900">
                {p.title}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-blue-600 mt-2">
                {inr(p.price)}
              </p>
              <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600 mt-1">
                <IconStar className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400" />
                <span className="font-semibold text-gray-800">4.8</span>
                <span className="text-gray-400">(76 reviews)</span>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className=" rounded-xl bg-white shadow-md divide-y divide-gray-200 overflow-hidden">
              {/* Description */}
              <button
                type="button"
                onClick={() => toggle("description")}
                className="flex justify-between items-center w-full px-6 py-4 text-left text-gray-900 font-semibold text-lg sm:text-xl transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-t-xl"
                aria-expanded={open === "description"}
                aria-controls="description-panel"
              >
                <span>Description</span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${
                    open === "description"
                      ? "rotate-180 text-blue-600"
                      : "text-gray-500"
                  }`}
                />
              </button>
              <div
                id="description-panel"
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  open === "description" ? "max-h-screen py-4" : "max-h-0"
                } text-gray-700 text-sm sm:text-base`}
              >
                {p.description}
              </div>

              {/* Specs */}
              <button
                type="button"
                onClick={() => toggle("specs")}
                className="flex justify-between items-center w-full px-6 py-4 text-left text-gray-900 font-semibold text-lg sm:text-xl transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-expanded={open === "specs"}
                aria-controls="specs-panel"
              >
                <span>Specifications</span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${
                    open === "specs"
                      ? "rotate-180 text-blue-600"
                      : "text-gray-500"
                  }`}
                />
              </button>
              <div
                id="specs-panel"
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  open === "specs" ? "max-h-screen py-4" : "max-h-0"
                } text-gray-700 text-sm sm:text-base`}
              >
                <ul className="list-disc pl-5 space-y-2">
                  {p.specs.map((s) => (
                    <li key={s.label}>
                      <strong className="font-semibold">{s.label}:</strong>{" "}
                      {s.value}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Installation */}
              <button
                type="button"
                onClick={() => toggle("installation")}
                className="flex justify-between items-center w-full px-6 py-4 text-left text-gray-900 font-semibold text-lg sm:text-xl transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-b-xl"
                aria-expanded={open === "installation"}
                aria-controls="installation-panel"
              >
                <span>Installation</span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${
                    open === "installation"
                      ? "rotate-180 text-blue-600"
                      : "text-gray-500"
                  }`}
                />
              </button>
              <div
                id="installation-panel"
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  open === "installation" ? "max-h-screen py-4" : "max-h-0"
                } text-gray-700 text-sm sm:text-base`}
              >
                <ul className="list-disc pl-5 space-y-2">
                  {p.installation.map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Colors */}
            <section>
              <h2 className="text-sm sm:text-base font-semibold mb-2">
                Available Colors
              </h2>
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                {p.colors.map((c) => {
                  const selected = selectedColor === c;
                  const bg = COLOR_MAP[c] ?? c;
                  return (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 transition ${
                        selected
                          ? "ring-2 ring-blue-500 border-transparent scale-110"
                          : "border-gray-300 hover:scale-105"
                      }`}
                      style={{ background: bg }}
                      aria-label={`Select color ${c}`}
                    >
                      {selected && (
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="currentColor"
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
            </section>

            {/* Add to Cart & Wishlist Buttons */}
            <div className="flex gap-4">
              <button className="flex-grow bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-6 py-3 sm:py-4 rounded-full font-[Poppins] font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.97] transition">
                Add to Cart
              </button>
              <button
                onClick={() => setWish(!wish)}
                aria-label={wish ? "Remove from wishlist" : "Add to wishlist"}
                className={`flex items-center justify-center w-12 h-12 rounded-full border hover:bg-gray-200 transition ${
                  wish ? "text-red-600" : "text-gray-600"
                }`}
              >
                <IconHeart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* More Like This Section */}
        <section className="mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[Poppins] font-bold text-3xl mb-8 text-gray-900">
            More Like This
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {moreLikeThis.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                title={product.title}
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-56 object-cover transition-transform duration-400 hover:scale-105"
                />
                <div className="p-6 space-y-3">
                  <h3
                    className="font-semibold text-xl text-gray-900 truncate"
                    title={product.title}
                  >
                    {product.title}
                  </h3>
                  <p className="text-blue-600 font-bold text-lg">
                    {inr(product.price)}
                  </p>
                  {product.category && (
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                      {product.category}
                    </p>
                  )}
                  <div className="flex items-center gap-3 flex-wrap">
                    {product.colors.map((c) => (
                      <span
                        key={c}
                        className="w-6 h-6 rounded-full border border-gray-300 shadow-sm"
                        style={{ backgroundColor: COLOR_MAP[c] ?? c }}
                        title={c}
                      />
                    ))}
                  </div>
                  {product.description && (
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {product.description}
                    </p>
                  )}
                  <button
                    className="mt-3 w-full text-center bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-2 rounded-full font-semibold text-sm hover:from-blue-700 hover:to-indigo-600 transition-colors"
                    aria-label={`View details of ${product.title}`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-12 sm:mt-16  mx-auto px-4 sm:px-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <h2 className="font-[Poppins] font-bold text-2xl sm:text-3xl text-gray-900">
              Reviews
            </h2>
            <div className="flex items-center text-sm text-gray-600">
              <label htmlFor="sortReviews" className="mr-2 font-medium">
                Sort by:
              </label>
              <select
                id="sortReviews"
                className="ml-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option>Suggested</option>
                <option>Newest</option>
                <option>Highest Rating</option>
                <option>Lowest Rating</option>
              </select>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-300 p-6 shadow-lg divide-y divide-gray-200">
            {p.reviews.length ? (
              p.reviews.map((r) => <ReviewItem key={r.id} r={r} />)
            ) : (
              <p className="text-center text-gray-500 italic py-6">
                No reviews yet.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
