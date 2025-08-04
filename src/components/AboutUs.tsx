import TeamGrid from "./TeamGrid";

const stats = [
  { number: "1000+", label: "Vast Premium Products", line: true },
  { number: "800+", label: "Happy Customers", line: true },
  { number: "30+", label: "Years in Business", line: true },
  { number: "15+", label: "Sanitary ware Brands", line: false },
];

const visionItems = [
  {
    imageUrl: "/assets/vision1.png",
    title: "Innovation First",
    desc: "We continually source the latest in global bathroom trends to bring you smart functionality.",
  },
  {
    imageUrl: "/assets/vision2.png",
    title: "Built to Last",
    desc: "We continually source the latest in global bathroom trends to bring you smart functionality.",
  },
  {
    imageUrl: "/assets/vision3.png",
    title: "Personalized Approach",
    desc: "Every child’s journey is unique. Our mission is to provide personalized childcare solutions and consulting.",
  },
  {
    imageUrl: "/assets/vision4.png",
    title: "Advocacy and Awareness",
    desc: "Our mission extends beyond caring for children to building stronger, healthier communities.",
  },
];

const AboutUs = () => {
  return (
    <div>
      <section className="bg-[#F5F8FF] py-20 px-4 md:px-20 text-left">
        <div className="font-[Poppins] text-[16px] leading-[100%] tracking-[1.63px] uppercase text-[#1447E6] font-bold mb-2 uppercase ">
          About Us
        </div>

        <h2 className="font-[Poppins] text-[35px] leading-[110%] tracking-normal font-bold text-gray-900 mb-12">
          From Functional Utility to Refined Design – Our Journey in Shaping
          Sanitaryware Excellence
        </h2>

        <div className="grid md:grid-cols-[1fr_1.4fr] items-start gap-18">
          <img
            src="/assets/BrandPerson.png"
            alt="Founder"
            className="rounded-xl w-full object-cover shadow-md mt-15"
          />

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <img
                src="/assets/BathroomImage.png"
                alt="Bathroom Design"
                className="rounded-xl w-5/9 object-cover shadow-sm"
              />
              <img
                src="/assets/WashBasinImage.png"
                alt="Washbasin"
                className="rounded-xl w-1/3 object-cover shadow-sm mt-6"
              />
            </div>
            <p className="font-[Poppins] text-[14px] leading-[26px] tracking-[-0.2px] text-justify text-gray-700 mb-2">
              Maheshwari & Co. is more than a business — it is the story of
              three generations bound by trust, craftsmanship, and a commitment
              to quality in India's plumbing and sanitary landscape.
            </p>
            <p className="font-[Poppins] text-[14px] leading-[26px] tracking-[-0.2px] text-justify text-gray-700 mb-2">
              Our journey began in the year 1995 when Shri Satyanarayan Birla, a
              visionary with deep-rooted values and a sharp business instinct,
              laid the foundation of a for Maheshwari & Co., a PVC and pipe
              fittings in Bhayandar, Mumbai. What started as a small operation
              with a limited inventory soon earned a strong reputation among
              local plumbers, contractors, and retailers for its reliability and
              fair dealing.
            </p>
            <button className="mt-2 px-6 py-2 rounded-md bg-[#1447E6] text-white font-medium shadow hover:bg-[#0f3ac2] transition">
              Meet Our Team
            </button>
          </div>
        </div>

        <div className="mt-12 ">
          <p className="font-[Poppins] text-[14px] leading-[26px] tracking-[-0.2px] text-justify text-gray-700">
            In the decades that followed, his son Mr. Sanjay Birla took the
            reins and transformed the wholesale legacy into a trusted
            traditional retail outlet, making Maheshwari & Co. a household name
            in the region. Under his leadership, the business diversified into
            sanitary and hardware goods, building a loyal customer base that
            spanned builders, architects, homeowners, and walk-in clients alike.
          </p>
          <p className="font-[Poppins] text-[14px] leading-[26px] tracking-[-0.2px] text-justify text-gray-700 mb-2">
            Today, standing at the intersection of tradition and transformation,
            the third generation is stepping in — with a vision to modernize the
            brand, digitize the business, and make Maheshwari & Co. a pan-India
            name in premium plumbing and sanitary fittings.
          </p>
        </div>
      </section>

      <section className="bg-[rgba(68,68,68,0.1)] py-12  ">
        <div className="w-full px-20 md:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center gap-8 md:divide-x">
            {stats.map((stat, index) => (
              <div
                key={index}
                className=" grid grid-cols-1 md:grid-cols-[1fr] items-center gap-4"
              >
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 font-[Poppins]">
                    {stat.number}
                  </h3>
                  <p className="text-gray-700 mt-2 text-[16px] font-medium leading-[29px] tracking-[-0.2px] font-poppins">
                    {stat.label}
                  </p>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-[1fr_1.3fr] items-start gap-18 py-20 px-4 md:px-20 text-left">
        <div className="max-w-5xl ">
          <p className="text-blue-600 font-bold mb-2">Our Mission</p>
          <h2 className="text-[32px] font-bold mb-4">
            Elevating Everyday Living Through Thoughtfully Designed Sanitaryware
          </h2>
          <p className="font-[Poppins] text-gray-600 max-w-3xl">
            We are committed to redefining modern living by offering
            superior-quality sanitaryware that blends design, durability, and
            innovation. <br />
            <br />
            With a legacy built on trust, we aim to enrich every bathroom
            experience — from households to hospitality spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visionItems.map((item, index) => (
            <div key={index} className="flex flex-col items-start gap-4">
              <div className=" bg-blue-600 w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="p-3 object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="font-[Poppins] text-sm text-gray-600 text-justify">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <TeamGrid />
    </div>
  );
};

export default AboutUs;
