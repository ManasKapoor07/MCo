import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

import HeroImage1 from "../assets/leftimage.svg";
import HeroImage2 from "../assets/HeroImage2.png";
import HeroImage3 from "../assets/HeroImage3.png";
import HeroImage4 from "../assets/rightImage.svg";

import BarImage1 from "../assets/BarImage1.png";
import BarImage2 from "../assets/BarImage2.png";
import BarImage3 from "../assets/BarImage3.png";
import BarImage4 from "../assets/BarImage4.png";
import BarImage5 from "../assets/BarImage5.png";

const barImages = [BarImage1, BarImage2, BarImage3, BarImage4, BarImage5];

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <div className="w-full min-h-screen flex flex-col lg:flex-row items-center px-4 sm:px-6 md:px-10 py-8 gap-6">
        
        {/* Left Column */}
        <div className="w-full lg:w-1/3 flex items-center justify-center">
          <img
            src={HeroImage1}
            alt="Left"
            className="w-full h-72 sm:h-96 lg:h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Center Column */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between gap-6">
          {/* Top Image */}
          <div className="w-full">
            <img
              src={HeroImage2}
              alt="Top Middle"
              className="w-full h-full object-cover rounded-lg shadow-md mb-2"
            />
          </div>

          {/* Center Box (Text + CTA) */}
          <div className="w-full p-4 sm:p-6 text-center flex flex-col items-center justify-center gap-4 bg-white/80">
            <p className="font-[Poppins] font-semibold text-3xl sm:text-4xl md:text-5xl text-gray-700">
              Let Your Space Speak Style
            </p>
            <p className="font-[Poppins] text-sm sm:text-base md:text-lg font-normal uppercase text-gray-600">
              Explore People’s Most Trusted Sanitary Ware Brands In One Destination.
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
          <div className="w-full">
            <img
              src={HeroImage3}
              alt="Bottom Middle"
              className="w-full h-48 sm:h-60 md:h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/3 flex items-center justify-center">
          <img
            src={HeroImage4}
            alt="Right"
            className="w-full h-72 sm:h-96 lg:h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Brand Bar Section */}
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
