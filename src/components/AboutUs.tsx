import TeamGrid from "./TeamGrid";

const AboutUs = () => {
    return(
        <div>
            <section className="bg-[#F5F8FF] py-20 px-4 md:px-20">
                  <div className="text-sm text-[#1447E6] font-semibold tracking-wide mb-2 uppercase">
            About Us
                  </div>
            
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 max-w-4xl leading-tight mb-12">
            From Functional Utility to Refined Design – Our Journey in Shaping Sanitaryware Excellence
                  </h2>
            
                  <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="w-full">
              <img
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12"
                alt="Founder"
                className="rounded-xl w-full object-cover shadow-md"
              />
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <img
                  src="https://images.unsplash.com/photo-1600585153709-00c4fc0212a8"
                  alt="Bathroom Design"
                  className="rounded-xl w-1/2 object-cover shadow-sm"
                />
                <img
                  src="https://images.unsplash.com/photo-1616627452594-40e3b14c0c71"
                  alt="Washbasin"
                  className="rounded-xl w-1/2 object-cover shadow-sm"
                />
              </div>
              <p className="text-gray-700 text-[16px] font-medium leading-[30px]">
                Maheshwari & Co. is more than a business — it is the story of three generations bound by trust, craftsmanship, and a commitment to quality in India's plumbing and sanitary landscape.
              </p>
              <p className="text-gray-700 text-[16px] font-medium leading-[30px]">
                Our journey began in the year 1995 when Shri Satyanarayan Birla, a visionary with deep-rooted values and a sharp business instinct, laid the foundation of a for Maheshwari & Co., a PVC and pipe fittings in Bhayandar, Mumbai. What started as a small operation with a limited inventory soon earned a strong reputation among local plumbers, contractors, and retailers for its reliability and fair dealing.
              </p>
              <button className="mt-4 px-6 py-2 rounded-md bg-[#1447E6] text-white font-medium shadow hover:bg-[#0f3ac2] transition">
                Meet Our Team
              </button>
            </div>
                  </div>
            
                  <div className="border-t border-slate-400 mt-16 pt-8">
            <p className="text-gray-800 text-[16px] font-medium leading-[30px]">
              In the decades that followed, his son Mr. Sanjay Birla took the reins and transformed the wholesale legacy into a trusted traditional retail outlet, making Maheshwari & Co. a household name in the region. Under his leadership, the business diversified into sanitary and hardware goods, building a loyal customer base that spanned builders, architects, homeowners, and walk-in clients alike.
            </p>
            <p className="text-gray-800 text-[16px] font-medium leading-[30px] mt-4">
              Today, standing at the intersection of tradition and transformation, the third generation is stepping in — with a vision to modernize the brand, digitize the business, and make Maheshwari & Co. a pan-India name in premium plumbing and sanitary fittings.
            </p>
                  </div>
                </section>
                <section className="bg-slate-100 text-gray-800 py-16 px-6 md:px-16">
              <div className="max-w-7xl mx-auto">
                <p className="text-blue-600 font-semibold mb-2">Our Mission</p>
                <h2 className="text-3xl font-bold mb-4">
                  Elevating Everyday Living Through Thoughtfully Designed Sanitaryware
                </h2>
                <p className="text-gray-600 mb-8 max-w-3xl">
                  We are committed to redefining modern living by offering superior-quality sanitaryware that blends design, durability, and innovation. <br />
                  With a legacy built on trust, we aim to enrich every bathroom experience — from households to hospitality spaces.
                </p>
            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
            {
              icon: "💡",
              title: "Innovation First",
              desc: "We continually source the latest in global bathroom trends to bring you smart functionality."
            },
            {
              icon: "🛡️",
              title: "Built to Last",
              desc: "We continually source the latest in global bathroom trends to bring you smart functionality."
            },
            {
              icon: "🧩",
              title: "Personalized Approach",
              desc: "Every child’s journey is unique. Our mission is to provide personalized childcare solutions and consulting."
            },
            {
              icon: "📢",
              title: "Advocacy and Awareness",
              desc: "Our mission extends beyond caring for children to building stronger, healthier communities."
            }
                  ].map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-blue-600 text-white rounded-full p-3 text-xl">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
                  ))}
                </div>
              </div>
            </section>
            <TeamGrid />
        </div>

    )
}

export default AboutUs;