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
    <div className="flex flex-col md:flex-row overflow-hidden justify-between items-center w-full  mb-10 px-4 md:px-10 py-2">
      {/* Left Section */}
      <div className="w-full md:w-[40%] px-10 flex flex-col ">
        <h2 className="text-2xl sm:text-3xl  font-bold text-gray-900 mb-4">
          From Modern Minimal to <br />
          Timeless Classic — <br />
          Explore Bathroom Styles
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
          Discover a curated gallery of bathroom inspirations to spark ideas for
          your dream space.
        </p>
        <button className="bg-[#1447E6] hover:bg-blue-700 rounded-[10px] w-1/2 sm:w-[40%] text-white py-3 shadow-2xl font-medium transition self-start">
          Explore More
        </button>
      </div>

      {/* Right Section */}
      <div className="relative flex flex-col items-center justify-start w-full md:w-[60%]">
        <div className="flex items-center w-full gap-2 md:gap-2">
          {/* Active Slide (Left-most) */}
          <div className="relative w-full max-w-[400px] h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden shadow-2xl z-10 transform transition-transform duration-700 ease-in-out flex-shrink-0">
            <img
              src={styles[index].img}
              loading="lazy"
              alt={styles[index].title}
              className="object-cover w-full h-full"
            />
            {/* Overlay */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 backdrop-blur-2xl bg-[#FFFFFFD1] font-semibold px-4 py-3 md:px-5 md:py-4 shadow-lg flex items-center justify-between w-[70%] transition-all duration-500 ease-in-out">
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
                className="ml-3 w-10 h-10 md:w-12 md:h-12 px-3 flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700  transition relative md:absolute md:-right-12 md:-bottom-0"
                aria-label="Next slide"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Next Slides (to the right) */}
          <div className="hidden md:flex w-[calc(100%-350px)] gap-2">
            {/* Next (medium) */}
            <div className="overflow-hidden h-[400px] flex-shrink-0 transform scale-95 transition-all duration-700 ease-in-out hover:scale-100  shadow-2xl ">
              <img
                src={styles[next].img}
                alt={styles[next].title}
                loading="lazy"
                className="object-cover w-[260px] h-full"
              />
            </div>
            <div className="relative overflow-hidden w-[120px] h-[400px] flex-shrink-0 transform scale-90 transition-all duration-700 ease-in-out hover:scale-95 shadow-2xl ">
              <img
                src={styles[next2].img}
                alt={styles[next2].title}
                loading="lazy"
                className="object-cover w-full h-full z-10"
              />
              {/* Overlay Next Arrow Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((i) => (i + 1) % styles.length);
                }}
                className="absolute  top-50 right-1 w-10 h-10 bg-white text-gray-600 rounded-full flex items-center justify-center shadow-lg z-20"
                aria-label="Next slide"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="ml-24 mt-4 flex gap-2 z-20">
          {styles.map((_, i) => (
            <div
              className={` px-3 ${
                i === index ? "border border-blue-600 scale-125" : ""
              } py-0 justify-center items-center rounded-full`}
            >
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full mb-2 font-semibold transition-all duration-500 ${
                  i === index
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 scale-100"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
