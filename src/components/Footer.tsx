import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logoMc from "../assets/logoP2.svg";

export default function Footer() {
  return (
    <footer className=" w-full pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
          {/* Company Brand */}
          <div className="flex justify-center md:justify-start">
            <img
              src={logoMc}
              alt="Maheshwari & Co. Logo"
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {["About", "Categories", "New Arrivals", "Contact"].map(
                (link, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="font-medium text-sm sm:text-base leading-[28px] font-inter text-gray-800 hover:text-[#1447E6] transition"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end gap-3 sm:gap-4">
            <a
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center hover:bg-[#1447E6] hover:text-white transition-colors shadow-sm"
              aria-label="Twitter"
            >
              <FaTwitter className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center hover:bg-[#1447E6] hover:text-white transition-colors shadow-sm"
              aria-label="Facebook"
            >
              <FaFacebookF className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center hover:bg-[#1447E6] hover:text-white transition-colors shadow-sm"
              aria-label="Instagram"
            >
              <FaInstagram className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>
        </div>

        {/* Divider line */}
        <div className="border-t border-slate-300 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-900 text-xs sm:text-sm text-center md:text-left">
              © 2024 M&CO. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="text-slate-900 hover:text-[#1447E6] text-xs sm:text-sm transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
