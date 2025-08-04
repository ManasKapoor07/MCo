import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="w-full flex flex-col">
        <div className="w-full min-h-screen flex items-center px-4 py-8 gap-7 box-border">
          {/* Left Column */}
          <div className="w-[33%] h-full flex items-center justify-center">
            <img
              src="src/assets/HeroImage1.png"
              alt="Left"
              className="h-full w-full object-cover rounded-lg shadow-lg"
            />
          </div>
          {/* Middle Column */}
          <div className="w-[34%] h-full flex flex-col justify-between">
            {/* Top Image */}
            <div className="w-full h-[30%] mb-4">
              <img
                src="src/assets/HeroImage2.png"
                alt="Top Middle"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
            {/* Center Box */}
            <div className="w-full bg-white px-6 py-6 rounded-lg text-center mb-4 flex flex-col items-center justify-center gap-6">
              <p className="font-[Poppins] font-medium text-[42px] leading-tight tracking-[-0.04em] text-gray-700 mb-4">
                Let Your Space Speak Style
              </p>
              <p className="font-[Poppins] text-[16px] leading-[150%] tracking-[0.05em] uppercase text-gray-600 mb-6">
                Explore People’s Most Trusted Sanitary Ware Brands In One Destination.
              </p>
              <Button
                size="lg"
                  className="bg-blue-600 hover:bg-gray-500 text-white font-semibold py-6 px-8 text-sm rounded-md mt-4 shadow-[0px_20px_35px_rgba(0,0,0,0.3)]"
              >
                Browse All Brands
              </Button>
            </div>
            {/* Bottom Image */}
            <div className="w-full h-[30%] lg:h-[30%]">
              <img
                src="src/assets/HeroImage3.png"
                alt="Bottom Middle"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
          {/* Right Column */}
          <div className="w-[33%] h-full flex items-center justify-center">
            <img
              src="src/assets/HeroImage4.png"
              alt="Right"
              className="h-full w-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-4 mt-6">
           {[...Array(5)].map((_, i) => (
            <img
             key={i}
             src={`/src/assets/BarImage${i + 1}.png`}
             alt={`Bar Image ${i + 1}`}
             className="w-1/10 object-contain h-auto"
            />
            ))}
        </div>

    </div>
  );
};

export default Hero;
