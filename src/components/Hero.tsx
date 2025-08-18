import React from "react";
import { Button } from "./ui/button";

import HeroImage1 from "../assets/leftimage.svg";
import HeroImage2 from "../assets/HeroImage2.png";
import HeroImage3 from "../assets/HeroImage3.png";
import HeroImage4 from "../assets/rightImage.svg";

import BarImage1 from "../assets/BarImage1.png";
import BarImage2 from "../assets/BarImage2.png";
import BarImage3 from "../assets/BarImage3.png";
import BarImage4 from "../assets/BarImage4.png";
import BarImage5 from "../assets/BarImage5.png";
import { useNavigate } from "react-router-dom";

const barImages = [BarImage1, BarImage2, BarImage3, BarImage4, BarImage5];

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <div className="w-full min-h-screen flex flex-col lg:flex-row items-center px-4 py-8 gap-7 box-border">
        {/* Left Column */}
        <div className="w-full lg:w-[33%] h-full flex items-center justify-center">
          <img
            src={HeroImage1}
            alt="Left"
            className="h-full w-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Center Column */}
        <div className="w-full lg:w-[34%] h-full flex flex-col justify-between">
          <div className="w-full h-full">
            <img
              src={HeroImage2}
              alt="Top Middle"
              className="w-full h-full rounded-lg shadow-md"
            />
          </div>

          {/* Center Box */}
          <div className="w-full p-6 rounded-lg text-center mb-4 flex flex-col items-center justify-center gap-6">
            <p className="font-[Poppins] font-medium text-5xl  text-gray-700 mb-2">
              Let Your Space Speak Style
            </p>
            <p className="font-[Poppins] text-[18px] font-normal uppercase text-gray-600 mb-3">
              Explore People’s Most Trusted Sanitary Ware Brands In One
              Destination.
            </p>
            <Button
              size="lg"
              onClick={() => {
                navigate("/shop");
              }}
              className="bg-blue-600 hover:shadow-md text-white font-semibold py-6 px-8 text-sm rounded-md mt-4 shadow-blue-600 cursor-pointer"
            >
              Browse All Brands
            </Button>
          </div>

          {/* Bottom Image */}
          <div className="w-full h-[30%] lg:h-[30%]">
            <img
              src={HeroImage3}
              alt="Bottom Middle"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[33%] h-full flex items-center justify-center">
          <img
            src={HeroImage4}
            alt="Right"
            className="h-full w-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Brand Bar Section */}
      <div className="w-full flex flex-wrap justify-center items-center gap-28 px-4 py-16">
        {barImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Bar Image ${i + 1}`}
            className="h-10 object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
