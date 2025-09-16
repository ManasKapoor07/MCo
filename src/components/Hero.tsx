import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

import HeroImage1 from "../assets/newLeft.svg";
import HeroImage2 from "../assets/newTop.svg";
import HeroImage3 from "../assets/newBottom.svg";
import HeroImage4 from "../assets/newRight.svg";

import BarImage1 from "../assets/BarImage1.png";
import BarImage2 from "../assets/BarImage2.png";
import BarImage3 from "../assets/BarImage3.png";
import BarImage4 from "../assets/BarImage4.png";
import BarImage5 from "../assets/BarImage5.png";
import BarImage6 from "../assets/BarImage6.png";

const barImages = [
  BarImage1,
  BarImage2,
  BarImage3,
  BarImage4,
  BarImage5,
  BarImage6,
];

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <div className="w-full flex flex-col lg:flex-row px-2 sm:px-6 md:px-12 py-4 gap-4 md:gap-8">
        <div className="w-full lg:w-1/3 flex">
          <img
            src={HeroImage1}
            alt="Left"
            loading="lazy"
            className="w-full h-36 sm:h-56 md:h-72 lg:h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full lg:w-1/3 flex flex-col">
          {/* Top Image */}
          <img
            src={HeroImage2}
            alt="Top Middle"
            loading="lazy"

            className="w-full h-24 sm:h-28 md:h-32 lg:h-[30%] object-cover rounded-lg shadow-md"
          />
          {/* Center Box (Text + CTA) */}
          <div className="w-full flex-1 justify-center items-center text-center flex flex-col gap-4 p-3 sm:p-6 bg-white/80">
            <p className="font-semibold tracking-wide text-2xl sm:text-3xl md:text-4xl lg:text-[42px]">
              Where Everyday Living Meets Timeless Luxury.
            </p>
            <p className="text-xs sm:text-base md:text-lg font-medium text-gray-600">
              Experience Innovation, Style, And Quality Built To Last For
              Generations.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/shop")}
              className="bg-blue-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-8 rounded-md shadow-blue-600 mt-2 hover:shadow-md"
            >
              Browse All Brands
            </Button>
          </div>
          {/* Bottom Image */}
          <img
            src={HeroImage3}
            alt="Bottom Middle"
            loading="lazy"

            className="w-full h-16 sm:h-24 md:h-28 lg:h-[30%] object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="w-full lg:w-1/3 flex">
          <img
            src={HeroImage4}
            alt="Right"
            loading="lazy"

            className="w-full h-36 sm:h-56 md:h-72 lg:h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-center items-center gap-5 sm:gap-8 md:gap-12 lg:gap-16 px-2 sm:px-6 md:px-12 py-6 rounded-lg">
        {barImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Bar Image ${i + 1}`}
            className="h-6 sm:h-8 md:h-10 object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
