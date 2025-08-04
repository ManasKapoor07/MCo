import { FaFacebookF,FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#F2F8FF] pt-16 pb-8 px-4">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
       <div className="flex items-center justify-between flex-wrap mb-8">
  {/* Company Brand */}
  <div className="md:col-span-1">
    <h2 className="text-3xl font-semi-bold text-black font-[Volkhov]">M&CO.</h2>
  </div>

  {/* Navigation Links */}
  <div className="flex-1 flex justify-center order-last md:order-none w-full md:w-auto mt-4 md:mt-0 ml-20">
    <div className="flex space-x-12">
      <a href="#" className="font-medium text-[16px] leading-[30px] tracking-[0px] font-inter">About</a>
      <a href="#" className="font-medium text-[16px] leading-[30px] tracking-[0px] font-inter">Categories</a>
      <a href="#" className="font-medium text-[16px] leading-[30px] tracking-[0px] font-inter">New Arrivals</a>
      <a href="#" className="font-medium text-[16px] leading-[30px] tracking-[0px] font-inter">Contact</a>
    </div>
  </div>

  {/* Contact & Social */}
  <div className="flex space-x-4">
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
        <div className="border-t-1 border-slate-400 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-900 text-sm">
              © 2024 M&CO. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-900 hover:text-[#1447E6] text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-900 hover:text-[#1447E6] text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-900 hover:text-[#1447E6] text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}