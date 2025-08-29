import React, { useEffect, useState } from "react";
import sink from "../assets/sinka.jpg";
import bathroom from "../assets/PremiumShowcase.png";
import shop from "../assets/PremiumShowcase.png";
import { Heart, Star } from "lucide-react";
import { useProductDetailMutation } from "@/redux/api/api";
import { useParams } from "react-router-dom";

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
};

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

function HeartFillIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.77 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function HeartOutlineIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M20.84 4.61c-1.54-1.5-4.04-1.5-5.59 0L12 7.88 8.75 4.61c-1.55-1.5-4.05-1.5-5.6 0-1.74 1.69-1.74 4.41 0 6.1l6.17 6.18a.996.996 0 0 0 1.41 0l6.16-6.18c1.75-1.69 1.75-4.41 0-6.1z" />
    </svg>
  );
}

export default function ProductDetail() {
  const params = useParams();
  const [trigger, { data, isLoading,  isError }] = useProductDetailMutation();

  const dummyProduct: Product = {
    id: 101,
    title: "Modern Bathroom Sink",
    price: 7999,
    category: "Bathroom",
    images: [bathroom, shop, sink],
    colors: ["black", "light", "beige"],
    description:
      "A sleek and modern bathroom sink made from high-quality materials, perfect for your contemporary home.",
    specs: [
      { label: "Material", value: "Ceramic" },
      { label: "Dimensions", value: "60cm x 45cm x 20cm" },
      { label: "Weight", value: "8kg" },
    ],
    installation: [
      "Mount the sink securely to the wall.",
      "Connect water supply lines carefully.",
      "Seal edges with waterproof sealant.",
    ],
  };

  const [product, setProduct] = useState<Product>(dummyProduct);
  const [mainIndex, setMainIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [wish, setWish] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (params.prodId) {
      trigger({ product_id: params.prodId });
    }
  }, [params.prodId, trigger]);

  useEffect(() => {
    if (!data) return;

    const mappedProduct: Product = {
      id: Number(data.id),
      title: String(data.product_name),
      price: Number(data.price),
      category: String(data.categories ?? ""),
      images: [bathroom, shop, sink], // Replace with data.images if available
      colors: ["black", "light", "beige"], // Replace with data.colors if available
      description: String(data.description ?? ""),
      specs: data.specs ?? [],
      installation: data.installation ?? [],
    };

    setProduct(mappedProduct);
    setSelectedColor(mappedProduct.colors?.[0] ?? null);
    setMainIndex(0);
  }, [data]);

  const handleAddToCart = () => {
    if (adding) return;
    setAdding(true);
    // Simulate add to cart operation and reset after animation duration
    setTimeout(() => {
      setAdding(false);
      // Here you could also trigger a global cart update or confirmation toast
    }, 1200);
  };

  function LoadingSkeleton() {
    return (
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 py-6">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-3 w-24 bg-gray-200 rounded mb-4" />
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-[55%]">
              <div className="h-[280px] sm:h-[400px] lg:h-[500px] bg-gray-200 rounded-2xl" />
              <div className="mt-4 flex gap-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-24 sm:w-32 md:w-40 h-20 bg-gray-200 rounded-xl"
                  />
                ))}
              </div>
            </div>
            <div className="w-full lg:w-[45%] space-y-4">
              <div className="h-6 w-28 bg-gray-200 rounded" />
              <div className="h-8 w-3/4 bg-gray-200 rounded" />
              <div className="h-6 w-32 bg-gray-200 rounded" />
              <div className="h-32 w-full bg-gray-200 rounded" />
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 font-semibold">Failed to load product.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left image gallery + color selection */}
        <div className="lg:w-[55%] flex flex-col">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={product.images[mainIndex]}
              alt={product.title}
              className="w-full h-[350px] md:h-[450px] lg:h-[400px] object-cover transition-transform duration-400 hover:scale-105 cursor-pointer rounded-2xl"
            />
          </div>
          <div className="flex gap-4 mt-6  hide-scrollbar">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainIndex(i)}
                className={`flex-shrink-0 rounded-xl overflow-hidden border-2 ${
                  i === mainIndex
                    ? "border-blue-600 shadow-lg scale-110"
                    : "border-gray-300 hover:border-blue-400"
                } transition-transform duration-300`}
                aria-label={`View image ${i + 1}`}
              >
                <img
                  src={img}
                  alt={`${product.title} thumbnail ${i + 1}`}
                  className="w-24 h-20 object-cover"
                />
              </button>
            ))}
          </div>

          {/* Color selection */}
          {/* <div className="mt-8">
            <h2 className="text-base font-semibold mb-3">Available Colors</h2>
            <div className="flex gap-4 flex-wrap">
              {product.colors.map((c) => {
                const selected = selectedColor === c;
                const bg = COLOR_MAP[c] ?? c;
                return (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-transform ${
                      selected
                        ? "ring-2 ring-indigo-500 border-transparent scale-110"
                        : "border-gray-300 hover:border-indigo-400 hover:scale-105"
                    }`}
                    style={{ backgroundColor: bg }}
                    aria-label={`Select color ${c}`}
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
          </div> */}
        </div>

        {/* Right product info */}
        <div className="lg:w-[45%] flex flex-col justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-500 uppercase mb-1 tracking-wide">
              {product.category}
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
              {product.title}
            </h1>
            <div className="text-2xl font-semibold text-indigo-600 mb-2">
              {inr(product.price)}
            </div>
            <div className="w-[90%] flex mb-4 items-center justify-center gap-6">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className={`flex-grow flex  justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl active:scale-95 transition transform ${
                  adding ? "cursor-wait opacity-70" : ""
                }`}
                aria-label="Add to Cart"
              >
                <svg
                  className={`w-6 h-6 transition-transform ${
                    adding ? "animate-bounce" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="7" cy="21" r="1" />
                  <circle cx="17" cy="21" r="1" />
                </svg>
                {adding ? "Added" : "Add to Cart"}
              </button>

              <button
                aria-label={wish ? "Remove from wishlist" : "Add to wishlist"}
                onClick={() => setWish(!wish)}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors transform ${
                  wish
                    ? "text-red-600 border-red-600 bg-red-100 hover:bg-red-200 scale-110"
                    : "text-gray-600 border-gray-300 hover:bg-gray-100 hover:scale-105"
                }`}
              >
                {wish ? (
                  <HeartFillIcon className="w-6 h-6" />
                ) : (
                  <Heart className="w-6 h-6" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-2 mb-6 text-gray-700">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">4.8</span>
              <span className="text-sm text-gray-400">(76 reviews)</span>
            </div>

            {/* Description */}
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-700 text-sm">
                {product.description || dummyProduct.description}
              </p>
            </section>

            {/* Specifications */}
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Specifications
              </h2>
              {dummyProduct.specs.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                  {dummyProduct.specs.map(({ label, value }) => (
                    <li key={label}>
                      <strong>{label}:</strong> {value}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No specifications available.</p>
              )}
            </section>

            {/* Installation */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Installation
              </h2>
              {dummyProduct.installation.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                  {dummyProduct.installation.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No installation info.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
