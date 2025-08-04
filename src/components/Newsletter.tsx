import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="bg-[#F2F8FF] py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto ">
        {/* Newsletter container matching the SVG design */}
        <div className="relative bg-[#1447E6] rounded-[20px] px-8 py-12 md:px-8 md:py-16">
          {/* Decorative triangle on the left */}
         <div className="absolute left-30 top-[2%] transform -translate-y-1/2 rotate-[30deg] hidden md:block">
  <svg width="60" height="52" viewBox="0 0 60 52" xmlns="http://www.w3.org/2000/svg">
    <polygon 
      points="30,0 60,50 0,50" 
      fill="#F8F8FF" 
      stroke="black" 
      strokeWidth="0.2" />
  </svg>
</div>


          {/* Decorative semicircle on the right */}
          <div className="absolute right-30 bottom-26 hidden lg:block">
            <div className="w-16 h-8 bg-[#FFFFFF] rounded-t-full"></div>
          </div>

          <div className="text-center relative z-10">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Subscribe our newsletter
            </h2>
            <p className="text-[18px] font-semibold text-white/90 mb-8 text-center mx-auto w-[35%]">
              Recieve latest news, update, and many other things every week.
            </p>

            {/* Newsletter form with design matching the SVG */}
            <div className="max-w-md mx-auto">
              <form
                onSubmit={handleSubmit}
                className="bg-[#F2F8FF] rounded-xl p-2 flex gap-2"
              >
                <Input
                  type="email"
                  placeholder="Enter your email-address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 border-none bg-transparent shadow-none text-gray-800 placeholder:text-[#b3b4b5] focus:ring-0 focus:border-0 focus:outline-none  "
                  required
                />
                <Button
                  type="submit"
                  className="w-9 h-9 p-0 rounded-lg bg-[#1447E6]"
                >
                  <img
                    src="/assets/SubscribeImage.png"
                    alt="Subscribe"
                    className="mt-2 object cover"
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
