import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logoMc from "../assets/logoP2.svg";

export default function Footer() {
  return (
    <footer className="bg-[#F2F8FF] pt-16 pb-8 px-4">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-6 md:space-y-0">
          {/* Company Brand */}
          <div className="flex justify-center md:justify-start">
            <img
              src={logoMc}
              alt="Maheshwari & Co. Logo"
              className="h-7 w-auto object-contain"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center space-x-6 sm:space-x-8">
              <a
                href="#"
                className="font-medium text-[15px] sm:text-[16px] leading-[30px] font-inter text-gray-800 hover:text-[#1447E6] transition"
              >
                About
              </a>
              <a
                href="#"
                className="font-medium text-[15px] sm:text-[16px] leading-[30px] font-inter text-gray-800 hover:text-[#1447E6] transition"
              >
                Categories
              </a>
              <a
                href="#"
                className="font-medium text-[15px] sm:text-[16px] leading-[30px] font-inter text-gray-800 hover:text-[#1447E6] transition"
              >
                New Arrivals
              </a>
              <a
                href="#"
                className="font-medium text-[15px] sm:text-[16px] leading-[30px] font-inter text-gray-800 hover:text-[#1447E6] transition"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="flex justify-center md:justify-end space-x-4">
            <a
              href="#"
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-[#1447E6] hover:text-white transition-colors shadow-sm"
              aria-label="Twitter"
            >
              <FaTwitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-[#1447E6] hover:text-white transition-colors shadow-sm"
              aria-label="Facebook"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-[#1447E6] hover:text-white transition-colors shadow-sm"
              aria-label="Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Divider line */}
        <div className="border-t border-slate-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-900 text-sm text-center md:text-left">
              © 2024 M&CO. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-6">
              <a
                href="#"
                className="text-slate-900 hover:text-[#1447E6] text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-900 hover:text-[#1447E6] text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-slate-900 hover:text-[#1447E6] text-sm transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
