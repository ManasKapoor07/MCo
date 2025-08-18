import { Button } from "@/components/ui/button";
import premiumImage from "../assets/ord.svg";

export default function PremiumShowcase() {
  return (
    <section className="py-8 bg-white px-4 sm:px-6 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 items-center">
        {/* Left: Image */}
        <div className="flex justify-center">
          <img
            src={premiumImage}
            alt="Opulence Modular Set"
            className="w-full max-w-md sm:max-w-lg lg:max-w-full object-contain"
          />
        </div>

        {/* Right: Text */}
        <div className="text-left mt-2">
          <div className="font-normal text-sm sm:text-base text-gray-500">
            New Bathroom Vanity Collection
          </div>

          <h2 className="font-[Volkhov] font-normal text-3xl sm:text-4xl lg:text-[46px] mt-3 sm:mt-4 mb-4 sm:mb-6 text-gray-700 leading-snug">
            Opulence Modular Set
          </h2>

          <h3 className="font-[Poppins] text-sm sm:text-base font-medium underline underline-offset-[2px]">
            Description
          </h3>

          <p className="text-sm sm:text-base text-gray-700 mt-2 mb-4 sm:mb-6 pr-0 lg:pr-8">
            Opulence Modular Set redefines luxury in your daily routine. Crafted
            with precision and sophistication, this bathroom vanity set offers
            seamless storage, premium finishes, and a minimalist yet grand
            aesthetic.
          </p>

          <div className="mb-6">
            <span className="text-2xl sm:text-3xl font-semibold text-slate-900">
              ₹ 2,50,000*
            </span>
          </div>

          <Button
            size="lg"
            className="bg-blue-600 hover:shadow-md text-white font-semibold py-4 sm:py-6 px-6 sm:px-8 text-sm sm:text-base rounded-md mt-2 sm:mt-4 shadow-blue-600 cursor-pointer"
          >
            Explore More
          </Button>
        </div>
      </div>
    </section>
  );
}
