import { Button } from "@/components/ui/button";

export default function PremiumShowcase() {
  return (
    <section className="py-8 bg-white px--10">
      <div className="  ">
        <div className="grid grid-cols-1 lg:grid-cols-2  items-center">
          <div>
            <img
              src="\src\assets\PremiumShowCase.png"
              alt="Opulence Modular Set"
              className="shadow-lg w-full"
            />
          </div>
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">
              New Bathroom Vanity Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Opulence Modular Set
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Opulence Modular Set redefines luxury in your daily routine. Crafted with precision and sophistication, 
              this bathroom vanity set offers seamless storage, premium finishes, and a minimalist yet grand aesthetic.
            </p>
            <div className="mb-8">
              <span className="text-3xl font-bold text-slate-900">₹ 2,50,000*</span>
            </div>
            <Button size="lg" className="bg-primary hover:bg-blue-700">
              Explore More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}