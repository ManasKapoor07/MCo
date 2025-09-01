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

const barImages = [BarImage1, BarImage2, BarImage3, BarImage4, BarImage5];

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col ">
      {/* Hero Section */}
      <div className="w-full flex flex-col lg:flex-row px-4 sm:px-6 md:px-10 py-4 gap-6">
        <div className="w-full lg:w-1/3 flex ">
          <img
            src={HeroImage1}
            alt="Left"
            className="w-full lg:h-full h-48 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="w-full lg:w-1/3 flex flex-col ">
          {/* Top Image */}
          <img
            src={HeroImage2}
            alt="Top Middle"
            className="w-full h-1/3 object-cover rounded-lg shadow-md "
          />

          {/* Center Box (Text + CTA) */}
          <div className="w-full h-1/2 sm:p-6 p-4 justify-center items-center text-center flex flex-col gap-4 bg-white/80">
            <p className="font-semibold text-3xl sm:text-4xl md:text-3xl ">
              Where Everyday Living Meets Timeless Luxury.
            </p>
            <p className="text-sm sm:text-base md:text-base font-normal uppercase text-gray-600">
              Experience innovation, style, and quality built to last for
              generations.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/shop")}
              className="bg-blue-600 hover:shadow-md text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 text-sm rounded-md shadow-blue-600 mt-2"
            >
              Browse All Brands
            </Button>
          </div>

          {/* Bottom Image */}
            <img
              src={HeroImage3}
              alt="Bottom Middle"
              className="w-full h-1/3 object-cover rounded-lg shadow-md"
            />
        </div>

        <div className="w-full lg:w-1/3 flex ">
          <img
            src={HeroImage4}
            alt="Right"
            className="w-full h-72 sm:h-96 lg:h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-center items-center gap-8 sm:gap-16 md:gap-24 px-4 sm:px-6 md:px-10 py-10 bg-gray-50 rounded-lg">
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
