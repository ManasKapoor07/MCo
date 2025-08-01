import { Button } from "@/components/ui/button";

export default function PremiumShowcase() {
  return (
    <section className="py-8 bg-white -mx-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 items-center">
          <div>
            <img
              src="\src\assets\PremiumShowCase.png"
              alt="Opulence Modular Set"
              className="shadow-lg w-full"
            />
          </div>
          <div className="text-left mt-2 mt-6">
            <div className=" font-normal text-[16px] leading-[100%] tracking-normal text-gray-500">
              New Bathroom Vanity Collection
            </div>
            <h2 className="font-[Volkhov] font-normal text-[44px] leading-[100%] tracking-[0%] mt-4 mb-6 text-gray-700">
              Opulence Modular Set
            </h2>
            <h3 className="font-[Poppins] font-normal text-base leading-[100%] tracking-[0] underline decoration-solid decoration-[0px] underline-offset-[1px]">Description</h3>
            <p className="text-[16px] leading-[100%] tracking-[0] text-gray-700  mt-2 mb-4 pr-8">
              Opulence Modular Set redefines luxury in your daily routine. Crafted with precision and sophistication, this bathroom vanity set offers seamless storage, premium finishes, and a minimalist yet grand aesthetic.
            </p>
            <div className="mb-6">
              <span className="text-3xl font-bold text-slate-900">₹ 2,50,000*</span>
            </div>
            <Button size="lg" className="bg-blue-600 hover:bg-gray-500 text-white font-semibold py-6 px-11 text-md rounded-md  shadow-[0px_20px_35px_rgba(0,0,0,0.3)] mb-6">
              Explore More
            </Button>
          </div>
      </div>
    </section>
  );
}