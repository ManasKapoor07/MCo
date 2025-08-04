import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const ContactUs = () => {
  return (
     <section className="bg-gray-50 relative z-10">
      <div className="bg-[#F5F8FF] py-20 px-4 md:px-20 text-left">

        {/* Header with Title & Social Icons */}
       <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr] items-start">
  <div className="lg:col-span-2">
    <p className="font-[Poppins] text-[16px] leading-[100%] tracking-[1.63px] uppercase text-[#1447E6] font-bold mb-2">
      Contact Us
    </p>
    <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight w-full">
      We’re ready to assist you with queries, feedback, or collaboration ideas.
    </h2>
  </div>
  <div className="flex flex-col items-start lg:items-end space-y-4 mt-6 lg:mt-0">
    <a href="#" className="p-2 rounded-full border border-gray-300 hover:bg-white">
      <FaFacebookF className="text-gray-600 hover:text-blue-600" />
    </a>
    <a href="#" className="p-2 rounded-full border border-gray-300 hover:bg-white">
      <FaInstagram className="text-gray-600 hover:text-pink-500" />
    </a>
    <a href="#" className="p-2 rounded-full border border-gray-300 hover:bg-white">
      <FaTwitter className="text-gray-600 hover:text-blue-400" />
    </a>
  </div>
</div>
 <img
        src="/src/assets/Spiral1.png"
        alt="Decoration"
        className="absolute top-120 right-0 h-1/6 object-cover pointer-events-none z-30 -mx-4"
      />


        {/* Contact Form */}
        <div className="bg-white p-8 px-4 rounded-lg ">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">
            {/* Three fields in first row */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Subject spans full width */}
            <div className="md:col-span-3">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject (Optional)
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Message spans full width */}
            <div className="md:col-span-3">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>

            {/* Button spans full width left-aligned */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="mt-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition"
              >
                Leave Us a Message →
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info Panel */}
        <div className="bg-[rgba(68,68,68,0.075)] px-8 py-16 mt-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr] gap-12">
            <div className="md:col-span-1">
              <p className="mt-2 text-[16px] leading-[24px] font-[400] font-[Poppins] text-gray-900 text-justify max-w-2xl">Contact Info</p>
              <h3 className="mt-2 font-[Poppins] font-semibold text-[28px] leading-[130%] text-gray-900 ">
                We are always happy to assist you
              </h3>
            </div>
            <div className="space-y-6 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="font-[Poppins] font-semibold text-[16px] leading-[100%] text-justify">Email Address</p>
                <div className="mt-6 w-[21px] h-[2.5px] bg-black opacity-100 rotate-0"></div>
                <p className="mt-6 font-[Poppins] font-semibold text-[16px] leading-[100%] text-justify">help@info.com</p>
                <p className="font-[Poppins] font-normal text-[14px] leading-[24px] tracking-[0] mt-6 text-[#1c1c1c] w-2/3">
                  Assistance hours: Monday - Friday 6 am to 8 pm EST
                </p>
              </div>
              <div>
                <p className="font-[Poppins] font-semibold text-[16px] leading-[100%] text-justify">Number</p>
                <div className="mt-6 w-[21px] h-[2.5px] bg-black opacity-100 rotate-0"></div>
                <p className="mt-6 font-[Poppins] font-semibold text-[16px] leading-[100%] text-justify">(808) 998-34256</p>
                <p className="font-[Poppins] font-normal text-[14px] leading-[24px] tracking-[0] mt-6 text-[#1c1c1c] w-2/3">
                  Assistance hours: Monday - Friday 6 am to 8 pm EST
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Office Location Panel with Map */}
        <div className="bg-[rgba(68,68,68,0.075)] p-8 rounded-lg space-y-6 mt-8">
          <div className="flex items-center text-gray-700 mb-2">
            <svg
              className="w-8 h-8 text-blue-600 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
            <p className="font-[Poppins] font-normal text-[18px] leading-[24px] tracking-[0]">Mumbai Office</p>
          </div>
          <address className="not-italic text-gray-900 font-medium ml-10">
            Shop No. 9, Waghani Vihar,
            <br /> Narayan Nagar Road,
            <br /> Bhayandar West, Thane - 401101
          </address>
          <div className="w-full h-64 overflow-hidden rounded-md">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.1234567890123!2d72.846354315!3d19.25012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b79abcdef123%3A0xabcdefabcdef!2sWaghani%20Vihar!5e0!3m2!1sen!2sin!4v1610000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;