import React, { useState } from "react";
import sink from "../assets/sinka.jpg";
import bathrrom from "../assets/PremiumShowcase.png";
import shop from "../assets/image.png";

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
    <div className="min-h-screen bg-gray-50 px-8 md:px-10 py-4">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-4">
          <span className="font-[Poppins] font-semibold uppercase tracking-wide">
            Home
          </span>
          <span className="mx-2">/</span>
          <span className="font-[Poppins] font-semibold uppercase text-gray-400">
            {p.title}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10 w-full justify-center items-start">
          {/* Left: Gallery */}
          <div className="flex w-[60%] flex-col">
            <div className="rounded-xl w-full shadow-2xl">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={p.images[mainIndex]}
                  alt={p.title}
                  className="w-full h-[500px] lg:h-[500px] object-cover rounded-2xl transform transition duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="mt-5 flex w-full justify-center gap-4 ">
              {p.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainIndex(i)}
                  className={`rounded-xl overflow-hidden border transition transform ${
                    i === mainIndex
                      ? "border-blue-500 ring-2 ring-blue-200 shadow-sm scale-105"
                      : "border-gray-200 hover:scale-105 hover:shadow"
                  }`}
                >
                  <div className="flex w-full border-none shadow-none">
                    <img
                      src={img}
                      alt={`${p.title} ${i + 1}`}
                      className="w-40"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col w-[40%] space-y-8">
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-gray-100 text-sm text-gray-600 mb-4">
                {p.category}
              </div>
              <h1 className="font-[Poppins] font-extrabold text-3xl lg:text-4xl text-gray-900 tracking-tight leading-tight">
                {p.title}
              </h1>
              <p className="text-2xl font-[Poppins] font-semibold text-blue-600 mt-2">
                {inr(p.price)}
              </p>
              <div className="flex items-center gap-2 text-base text-gray-600 mt-1">
                <IconStar className="w-5 h-5 fill-yellow-400" />
                <span className="font-semibold text-gray-800">4.8</span>
                <span className="text-gray-400">(76 reviews)</span>
              </div>
            </div>

            {/* Show all content previously in accordions here */}

            {/* Accordion Sections */}
            <div className="space-y-4">
              {/* Description */}
              <div className="rounded-md bg-white shadow-sm border border-gray-100 overflow-hidden">
                <div
                  onClick={() => toggle("description")}
                  className="flex justify-between items-center px-6 py-4 cursor-pointer select-none hover:bg-gray-50 transition"
                >
                  <h2 className="text-lg font-semibold text-gray-900">
                    Description & Fit
                  </h2>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      open === "description" ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    open === "description"
                      ? "max-h-[500px] opacity-100 py-4"
                      : "max-h-0 opacity-0"
                  } px-6 text-gray-600 leading-relaxed`}
                >
                  {p.description}
                </div>
              </div>

              {/* Specifications */}
              <div className="rounded-md bg-white shadow-sm border border-gray-100 overflow-hidden">
                <div
                  onClick={() => toggle("specs")}
                  className="flex justify-between items-center px-6 py-4 cursor-pointer select-none hover:bg-gray-50 transition"
                >
                  <h2 className="text-lg font-semibold text-gray-900">
                    Specifications & Dimensions
                  </h2>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      open === "specs" ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    open === "specs"
                      ? "max-h-[1000px] opacity-100 py-6"
                      : "max-h-0 opacity-0"
                  } px-6`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {p.specs.map((s) => (
                      <div
                        key={s.label}
                        className="p-4 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition flex flex-col"
                      >
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          {s.label}
                        </div>
                        <div className="font-medium text-lg text-gray-900 mt-1">
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Installation */}
              <div className="rounded-md bg-white shadow-sm border border-gray-100 overflow-hidden">
                <div
                  onClick={() => toggle("installation")}
                  className="flex justify-between items-center px-6 py-4 cursor-pointer select-none hover:bg-gray-50 transition"
                >
                  <h2 className="text-lg font-semibold text-gray-900">
                    Installation & Care
                  </h2>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      open === "installation" ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    open === "installation"
                      ? "max-h-[500px] opacity-100 py-4"
                      : "max-h-0 opacity-0"
                  } px-6`}
                >
                  <ul className="space-y-3">
                    {p.installation.map((it, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-700 leading-relaxed"
                      >
                        <span className="mt-2 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Colors */}
            <section>
              <h2 className="text-base font-semibold mb-2">Available Colors</h2>
              <div className="flex items-center gap-4 flex-wrap">
                {p.colors.map((c) => {
                  const selected = selectedColor === c;
                  const bg = COLOR_MAP[c] ?? c;
                  return (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition ${
                        selected
                          ? "ring-2 ring-blue-500 border-transparent scale-110"
                          : "border-gray-300 hover:scale-105"
                      }`}
                      style={{ background: bg }}
                      aria-pressed={selected}
                      title={c}
                    >
                      {selected && (
                        <svg
                          className="w-5 h-5 text-white"
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

            {/* Add to Cart */}
            <div className="mt-4">
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-4 rounded-full font-[Poppins] font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.97] transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-[Poppins] font-bold text-2xl">Reviews</h2>
            <div className="flex items-center text-sm text-gray-500">
              <span>Sort by:</span>
              <select className="ml-2 px-3 py-2 border rounded text-sm border-gray-200 bg-gray-50">
                <option>Suggested</option>
              </select>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            {p.reviews.map((r) => (
              <ReviewItem key={r.id} r={r} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
