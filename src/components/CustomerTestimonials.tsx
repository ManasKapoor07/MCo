import React, { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
}

const testimonials: Testimonial[] = [
  /* same 9 items from before */
  { id: 1, name: "Alice Martin", role: "Interior Designer", avatar: "https://i.pravatar.cc/150?img=11", content: "M&CO transformed my living space—every detail is perfection. I’ve never felt more at home." },
  { id: 2, name: "Brian Lee", role: "Architect", avatar: "https://i.pravatar.cc/150?img=12", content: "The quality and service are unmatched. My clients are thrilled with the final results!" },
  { id: 3, name: "Carmen Diaz", role: "Homeowner", avatar: "https://i.pravatar.cc/150?img=13", content: "I was blown away by how seamlessly everything came together. Truly a five-star experience." },
  { id: 4, name: "David Kim", role: "Contractor", avatar: "https://i.pravatar.cc/150?img=14", content: "Their product range is incredible. We found exactly what we needed and installation was a breeze." },
  { id: 5, name: "Eva Green", role: "Real Estate Agent", avatar: "https://i.pravatar.cc/150?img=15", content: "Staging properties with M&CO pieces has boosted my sales. Buyers can’t get enough!" },
  { id: 6, name: "Frank Zhou", role: "Developer", avatar: "https://i.pravatar.cc/150?img=16", content: "The attention to detail is phenomenal. Everything looks and feels high-end." },
  { id: 7, name: "Grace Owens", role: "Blogger", avatar: "https://i.pravatar.cc/150?img=17", content: "I feature M&CO in all my design roundups. Their innovation never fails to impress." },
  { id: 8, name: "Hector Ruiz", role: "Photographer", avatar: "https://i.pravatar.cc/150?img=18", content: "Shooting their products is a joy—beautiful, photogenic, and built to last." },
  { id: 9, name: "Isabelle Clark", role: "Entrepreneur", avatar: "https://i.pravatar.cc/150?img=19", content: "M&CO helped me launch my showroom. Customers keep coming back for more!" },
];

export default function CustomerTestimonials() {
  const pageCount = Math.ceil(testimonials.length / 3);
  const [page, setPage] = useState(0);

  // Autoplay every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPage((p) => (p + 1) % pageCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [pageCount]);

  // chunk into pages of 3
  const pages = Array.from({ length: pageCount }, (_, i) =>
    testimonials.slice(i * 3, i * 3 + 3)
  );

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Hear It from Our Happy Clients
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We believe every product should speak for itself — but when it
            doesn’t, our customers do. Explore the stories and praise from
            people who chose us for their most personal spaces.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative overflow-hidden">
          {/* Track */}
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ width: `${100 * pageCount}%`, transform: `translateX(-${(100 / pageCount) * page}%)` }}
          >
            {pages.map((group, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-shrink-0" style={{ width: `${100 / pageCount}%` }}>
                {group.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white rounded-xl p-6 shadow-sm flex flex-col"
                  >
                    <p className="text-slate-600 mb-6 italic flex-1">
                      “{t.content}”
                    </p>
                    <div className="flex items-center mt-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <div className="font-semibold text-slate-900">
                          {t.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {pages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx)}
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                idx === page
                  ? "bg-blue-700"
                  : "bg-slate-400 hover:bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
