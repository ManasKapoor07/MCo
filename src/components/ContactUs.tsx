import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const ContactUs = () => {
  return (
     <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Header with Title & Social Icons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2">
            <p className="text-blue-600 font-semibold uppercase tracking-wide text-sm">
              Contact Us
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
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

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow">
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
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <p className="text-sm font-medium text-gray-500">Contact Info</p>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">
                We are always happy to assist you
              </h3>
            </div>
            <div className="space-y-6 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-800">Email Address</p>
                <p className="mt-1 text-lg text-gray-900">help@info.com</p>
                <p className="text-sm text-gray-500 mt-1">
                  Assistance hours: Monday - Friday 6 am to 8 pm EST
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Number</p>
                <p className="mt-1 text-lg text-gray-900">(808) 998-34256</p>
                <p className="text-sm text-gray-500 mt-1">
                  Assistance hours: Monday - Friday 6 am to 8 pm EST
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Office Location Panel with Map */}
        <div className="bg-white p-8 rounded-lg shadow space-y-6">
          <div className="flex items-center text-gray-700">
            <svg
              className="w-5 h-5 text-blue-600 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
            <p className="text-sm font-medium">Mumbai Office</p>
          </div>
          <address className="not-italic text-gray-900 font-medium">
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