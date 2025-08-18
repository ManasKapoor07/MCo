import React, { useState } from "react";

/**
 * ProductDetail.tsx
 * React + TypeScript + Tailwind implementation of the provided design image.
 *
 * Usage:
 *   <ProductDetail />
 *
 * (Replace sampleProduct data with real product data where needed.)
 */

/* ---------- Types ---------- */
type Product = {
  id: number;
  title: string;
  price: number;
  category?: string;
  images: string[]; // urls
  colors: string[]; // keys that map to colors (white, black, teal, etc.)
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
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(v);

/* a tiny map for color backgrounds. Replace/get from your util if needed */
const COLOR_MAP: Record<string, string> = {
  white: "#FFFFFF",
  black: "#111827",
  teal: "#14B8A6",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  light: "#E6EAE4",
  beige: "#EDE8DA",
};

/* ---------- Small subcomponents ---------- */

function IconStar({ className = "w-4 h-4 inline-block" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function IconShare({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 6l-4-4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconHeart({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* simple accordion */
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4">
      <button
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between p-3 rounded-[8px] border border-[#0000001A] bg-white hover:shadow-sm"
      >
        <div className="font-[Poppins] font-semibold text-sm">{title}</div>
        <div className={`transform transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`} aria-hidden>
          ▼
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="p-3 pt-2 bg-white border border-t-0 border-[#0000000A] rounded-b-[8px] text-sm text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
}

/* review item */
function ReviewItem({ r }: { r: Product["reviews"][number] }) {
  return (
    <div className="flex gap-4 py-4 border-b border-[#0000000A]">
      <div className="flex-none">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
          {r.author.charAt(0)}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-[Poppins] font-semibold text-sm">{r.author}</div>
          <div className="text-xs text-gray-400">{r.date}</div>
        </div>
        <div className="flex items-center gap-1 text-yellow-500 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <IconStar key={i} className="w-4 h-4" />
          ))}
          <div className="text-xs text-gray-500 ml-2">({r.rating}/5)</div>
        </div>
        <p className="text-sm text-gray-700 mt-2">{r.text}</p>
      </div>
    </div>
  );
}

/* single related product card (simplified) */
function RelatedCard({ title, price }: { title: string; price: number }) {
  return (
    <div className="bg-white rounded-[8px] p-3 shadow-sm border border-[#0000000A]">
      <div className="h-36 bg-gray-100 rounded-md mb-3" />
      <div className="font-[Poppins] font-semibold text-sm">{title}</div>
      <div className="text-xs text-gray-500 mt-1">Wash Basins</div>
      <div className="mt-2 font-[Poppins] font-semibold">{inr(price)}</div>
    </div>
  );
}

/* ---------- Sample product data ---------- */
const sampleProduct: Product = {
  id: 1,
  title: "Premium Ceramic Basin",
  price: 7568,
  category: "Wash Basin",
  images: [
    // in your project replace these with real image URLs or next/image usage
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7c7e835d4faa7c7f6c9a8e7e9e7b4f60",
    "https://images.unsplash.com/photo-1581579183349-4f0f7f6c0f1f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2921b5b2a2b1f1e38f9e9c6f1d6b4a8b",
    "https://images.unsplash.com/photo-1616627568037-4b433d20ad7d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3f6b9e4f9a8b2c3f4d5e6a7b8c9d0e1f",
  ],
  colors: ["black", "light", "beige"],
  description:
    "Upgrade your bathroom with this sleek and contemporary rectangular countertop basin. Crafted from high-gloss ceramic with a smooth white finish, this sink combines both functionality and elegance.",
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
      text: "This item is of amazing quality! It's the perfect uniform for those self employed who still want to look professional. I will be ordering more now & in the future!",
    },
    {
      id: 2,
      author: "Selena Hadid",
      date: "Dec 9, 2022",
      rating: 5,
      text: "Comfortable product for everyday wear around the house truly just such a great piece.",
    },
    {
      id: 3,
      author: "Selena Hadid",
      date: "Dec 9, 2022",
      rating: 5,
      text: "Very nice item. Quality is lovely.",
    },
  ],
};

/* ---------- Main component ---------- */
export default function ProductContent() {
  const p = sampleProduct;
  const [mainIndex, setMainIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(p.colors[0]);
  const [wish, setWish] = useState(false);

  return (
    <div className="min-h-screen bg-white px-6 md:px-12 py-10">
      <div className="max-w-7xl mx-auto">
        {/* breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6">
          <span className="font-[Poppins] font-semibold tracking-wider uppercase">Home</span>
          <span className="mx-2">/</span>
          <span className="font-[Poppins] font-semibold tracking-wider uppercase text-gray-400">{p.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* left gallery */}
          <div className="lg:col-span-7">
            <div className="rounded-[12px] border border-[#0000001A] p-4 shadow-[0_40px_90px_rgba(0,0,0,0.12)]">
              <div className="relative overflow-hidden rounded-[12px] bg-white">
                <img
                  src={p.images[mainIndex]}
                  alt={p.title}
                  className="w-full h-[520px] md:h-[560px] object-cover rounded-[12px]"
                />
                {/* small top progress-like indicator (as in image) */}
                <div className="absolute left-6 right-6 top-4 h-1 bg-white/50 rounded-full" />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {p.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setMainIndex(i)}
                    className={`relative rounded-[8px] overflow-hidden border ${
                      i === mainIndex ? "border-blue-600 ring-2 ring-offset-2 ring-blue-100" : "border-transparent"
                    }`}
                    aria-label={`Show image ${i + 1}`}
                  >
                    <img src={img} alt={`${p.title} ${i + 1}`} className="w-full h-20 object-cover" />
                    {i === mainIndex && (
                      <div className="absolute inset-0 pointer-events-none" aria-hidden>
                        {/* subtle overlay */}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* right info */}
          <div className="lg:col-span-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600 mb-2">
                  {p.category}
                </div>
                <h1 className="font-[Poppins] font-bold text-2xl leading-[1.05] tracking-tight mb-2">{p.title.toUpperCase()}</h1>
                <div className="text-xl font-[Poppins] font-semibold mb-3">{inr(p.price)}</div>
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <IconStar className="w-4 h-4 text-yellow-500" />
                    <span className="ml-1 text-gray-800 font-semibold">4.8</span>
                    <span className="text-gray-400"> (76)</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <button
                  onClick={() => setWish((s) => !s)}
                  aria-pressed={wish}
                  className="p-2 rounded-md border border-[#0000001A] bg-white"
                  title="Wishlist"
                >
                  <IconHeart className="w-5 h-5 text-gray-600" />
                </button>

                <button className="p-2 rounded-md border border-[#0000001A] bg-white" title="Share">
                  <IconShare className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* colors */}
            <div className="mt-4">
              <div className="text-sm text-gray-600 mb-2 font-[Poppins] font-semibold">Available Colors</div>
              <div className="flex items-center gap-3">
                {p.colors.map((c) => {
                  const selected = selectedColor === c;
                  const bg = COLOR_MAP[c] ?? c;
                  const tickColor = c === "white" ? "#111827" : "#fff";
                  return (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center border-2 ${selected ? "ring-2 ring-offset-2 ring-blue-500 border-transparent" : "border-gray-300"}`}
                      style={{ background: bg }}
                      aria-pressed={selected}
                      title={c}
                    >
                      {selected && (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17L4 12" stroke={tickColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add to cart */}
            <div className="mt-6 flex items-center gap-3">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-full font-[Poppins] font-semibold">
                Add to cart
              </button>
              <button className="w-12 h-12 rounded-full border border-[#0000001A] flex items-center justify-center bg-white">
                ♡
              </button>
            </div>

            {/* Accordions */}
            <div className="mt-6">
              <Accordion title="Description & Fit">
                <p>{p.description}</p>
              </Accordion>

              <Accordion title="Specifications & Dimensions">
                <div className="grid grid-cols-2 gap-4">
                  {p.specs.map((s) => (
                    <div key={s.label} className="text-sm">
                      <div className="text-xs text-gray-500">{s.label}</div>
                      <div className="font-[Poppins] font-semibold mt-1">{s.value}</div>
                    </div>
                  ))}
                </div>
              </Accordion>

              <Accordion title="Installation & Care">
                <div className="text-sm space-y-2">
                  <div className="font-[Poppins] font-semibold">Installation Requirements</div>
                  <ul className="list-disc list-inside text-gray-700">
                    {p.installation.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                </div>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-[Poppins] font-semibold text-lg">Reviews</h2>
            <div className="text-sm text-gray-500">Sort by: <select className="ml-2 px-2 py-1 border rounded text-sm border-[#0000001A]"><option>Suggested</option></select></div>
          </div>

          <div className="bg-white rounded-[8px] border border-[#0000001A] p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="text-sm font-semibold">All reviews</div>
              <div className="text-sm text-gray-500">76</div>
            </div>

            {p.reviews.map((r) => <ReviewItem key={r.id} r={r} />)}

            {/* simple pagination UI */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <button className="px-3 py-2 rounded-full border border-[#0000001A]">←</button>
              <div className="px-3 py-2 rounded-full bg-gray-100">1</div>
              <div className="px-3 py-2 rounded-full">2</div>
              <div className="px-3 py-2 rounded-full">3</div>
              <button className="px-3 py-2 rounded-full border border-[#0000001A]">→</button>
            </div>
          </div>
        </section>

        {/* Related products */}
        <section className="mt-12 bg-gradient-to-b from-white/60 to-sky-50 py-10 px-6 rounded-lg">
          <h3 className="font-[Poppins] font-semibold text-lg mb-6">More Related Products From The Brand</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <RelatedCard title="Norma Table Top Wash Basin" price={2925} />
            <RelatedCard title="Athos One Piece Commode" price={10627} />
            <RelatedCard title="Norma Table Top Wash Basin" price={2925} />
            <RelatedCard title="Athos One Piece Commode" price={10627} />
          </div>
        </section>
      </div>
    </div>
  );
}
