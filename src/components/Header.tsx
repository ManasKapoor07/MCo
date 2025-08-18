import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { ShoppingCart, Heart, User } from "lucide-react";
import logoMc from "../assets/logoP2.svg";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch or handle searchInput
  };

  const activeCategory = searchParams.get("category");

  const navLinks = [
    { label: "Home", path: "/", key: "home" },
    { label: "About", path: "/about", key: "about" },
    { label: "Categories", key: "categories" },
    { label: "New Arrivals", key: "new" },
    { label: "Contact", path: "/contact", key: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg ">
      <div className="mx-auto px-6 justify-between">
        <div className="flex items-center h-16 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center mt-2">
            <img
              src={logoMc}
              alt="Maheshwari & Co. Logo"
              className="h-7 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center justify-end w-full space-x-8 ">
            {/* Navigation links */}
            <nav className="flex space-x-10 font-medium items-center w-full justify-start ml-32">
              {navLinks.map(({ label, path, key }) => {
                const isActive =
                  location.pathname === path ||
                  activeCategory?.toLowerCase() === key;

                return (
                  <Link
                    key={label}
                    to={path ?? "#"}
                    className={`relative font-['Poppins'] text-[clamp(0.85rem,0.7rem+0.6vw,1rem)] transition
                      ${
                        isActive
                          ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-600 "
                          : "text-gray-700 hover:text-blue-500"
                      }
                    `}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Search form */}
            <form
              onSubmit={handleSearch}
              className="relative hidden lg:block"
            >
              <Input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </form>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/favorites"
                className="p-2 rounded-full hover:bg-blue-50 transition"
              >
                <Heart className="h-5 w-5 text-gray-700 hover:text-blue-600" />
              </Link>
              <Link
                to="/cart"
                className="p-2 rounded-full hover:bg-blue-50 transition relative"
              >
                <ShoppingCart className="h-5 w-5 text-gray-700 hover:text-blue-600" />
                {/* Example badge */}
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-semibold rounded-full px-1.5">
                  2
                </span>
              </Link>
              <Link
                to="/profile"
                className="p-2 rounded-full hover:bg-blue-50 transition"
              >
                <User className="h-5 w-5 text-gray-700 hover:text-blue-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
