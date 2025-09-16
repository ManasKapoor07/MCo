import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import img1 from "../assets/carousel1.png";
import img2 from "../assets/carousel2.png";
import img3 from "../assets/carousel3.jpg";

const styles = [
  {
    title: "Urban Minimal",
    desc: "Sleek lines and modern finishes for city living.",
    img: img1,
  },
  {
    title: "Classic Elegance",
    desc: "Elegant fixtures and timeless style for a classic touch.",
    img: img2,
  },
  {
    title: "Nature Retreat",
    desc: "Warm wood and soft tones for a relaxing escape.",
    img: img1,
  },
  {
    title: "Nature Retreat",
    desc: "Warm wood and soft tones for a relaxing escape.",
    img: img2,
  },
  {
    title: "Nature Retreat",
    desc: "Warm wood and soft tones for a relaxing escape.",
    img: img3,
  },
];

function mod(n, m) {
  return ((n % m) + m) % m;
}

export default function BathroomGallery() {
  const [index, setIndex] = useState(0);

  // Automatic slide effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((i) => (i + 1) % styles.length);
    }, 3000); // Change slide every 3 seconds

    // Cleanup interval on unmount or index change
    return () => clearInterval(intervalId);
  }, []);

  const next = mod(index + 1, styles.length);
  const next2 = mod(index + 2, styles.length);

  return (
    <div className="flex flex-col md:flex-row overflow-hidden justify-between items-center w-full mb-6 px-2 sm:px-6 md:px-10 py-2 md:py-4">
      {/* Left Section */}
      <div className="w-full md:w-[40%] px-2 sm:px-6 md:px-10 flex flex-col">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          From Modern Minimal to <br />
          Timeless Classic — <br />
          Explore Bathroom Styles
        </h2>
        <p className="text-xs sm:text-base text-gray-600 mb-4 sm:mb-8">
          Discover a curated gallery of bathroom inspirations to spark ideas for
          your dream space.
        </p>
        <button className="bg-[#1447E6] hover:bg-blue-700 rounded-[10px] w-2/3 sm:w-1/2 md:w-[40%] text-white py-2 md:py-3 shadow-2xl font-medium transition self-start">
          Explore More
        </button>
      </div>
      {/* Right Section */}
      <div className="relative flex flex-col items-center justify-start w-full md:w-[60%] pt-6 md:pt-0">
        <div className="flex items-center w-full gap-2 md:gap-2">
          {/* Active Slide */}
          <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden shadow-2xl z-10 transform transition duration-700 ease-in-out flex-shrink-0">
            <img
              src={styles[index].img}
              loading="lazy"
              alt={styles[index].title}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-3 left-2 md:bottom-6 md:left-6 backdrop-blur-2xl bg-[#FFFFFFD1] font-semibold px-2 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 shadow-lg flex items-center justify-between w-[85%] sm:w-[75%] transition duration-500 ease-in-out">
              <div>
                <div className="text-xs md:text-sm text-gray-500 mb-1">
                  0{index + 1} — {styles[index].title}
                </div>
                <div className="text-xs md:text-sm text-gray-800">
                  {styles[index].desc}
                </div>
              </div>
              <button
                onClick={() => setIndex((i) => (i + 1) % styles.length)}
                className="ml-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 px-2 sm:px-3 flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition relative md:absolute md:-right-12 md:-bottom-0"
                aria-label="Next slide"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
          {/* Next Slides */}
          <div className="hidden md:flex w-[calc(100%-340px)] gap-2">
            <div className="overflow-hidden h-64 md:h-80 lg:h-96 flex-shrink-0 transform scale-95 transition duration-700 ease-in-out hover:scale-100 shadow-2xl">
              <img
                src={styles[next].img}
                alt={styles[next].title}
                loading="lazy"
                className="object-cover w-[120px] sm:w-[180px] md:w-[260px] h-full"
              />
            </div>
            <div className="relative overflow-hidden w-[80px] sm:w-[100px] md:w-[120px] h-64 md:h-80 lg:h-96 flex-shrink-0 transform scale-90 transition duration-700 ease-in-out hover:scale-95 shadow-2xl">
              <img
                src={styles[next2].img}
                alt={styles[next2].title}
                loading="lazy"
                className="object-cover w-full h-full z-10"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((i) => (i + 1) % styles.length);
                }}
                className="absolute top-1/2 -translate-y-1/2 right-1 w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center shadow-lg z-20"
                aria-label="Next slide"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
        {/* Carousel Dots */}
        <div className="mt-4 flex gap-2 z-20 justify-center">
          {styles.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full font-semibold transition duration-500 ${
                i === index
                  ? "bg-blue-600 scale-125 border border-blue-600"
                  : "bg-gray-300 scale-100"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
