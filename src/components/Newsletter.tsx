import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="bg-[#F2F8FF] py-12 md:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Newsletter container */}
        <div className="relative bg-[#1447E6] rounded-[20px] px-6 py-10 sm:px-8 sm:py-14 md:px-12 md:py-16">
          {/* Decorative triangle on the left */}
          <div className="absolute left-4 top-4 transform rotate-[30deg] hidden md:block">
            <svg
              width="60"
              height="52"
              viewBox="0 0 60 52"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="30,0 60,50 0,50"
                fill="#F8F8FF"
                stroke="black"
                strokeWidth="0.2"
              />
            </svg>
          </div>

          {/* Decorative semicircle on the right */}
          <div className="absolute right-6 bottom-6 hidden lg:block">
            <div className="w-16 h-8 bg-[#FFFFFF] rounded-t-full"></div>
          </div>

          {/* Content */}
          <div className="text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
              Subscribe our newsletter
            </h2>
            <p className="text-base sm:text-lg md:text-[18px] font-medium text-white/90 mb-8 text-center mx-auto max-w-lg md:max-w-2xl">
              Receive the latest news, updates, and many other things every
              week.
            </p>

            {/* Newsletter form */}
            <div className="max-w-md mx-auto">
              <form
                onSubmit={handleSubmit}
                className="bg-[#F2F8FF] rounded-xl p-2 flex gap-2"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 border-none bg-transparent shadow-none text-gray-800 placeholder:text-[#b3b4b5] focus:ring-0 focus:border-0 focus:outline-none text-sm sm:text-base"
                  required
                />
                <Button
                  type="submit"
                  className="w-10 h-10 sm:w-12 sm:h-12 p-0 rounded-lg bg-[#1447E6] flex items-center justify-center"
                >
                  <img
                    src="/assets/SubscribeImage.png"
                    alt="Subscribe"
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
