import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Heart, Menu, X, User } from "lucide-react";
import { motion } from "framer-motion";
import logoMc from "../assets/logoP2.svg";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    // handle searchInput (dispatch, navigate, etc.)
  };

  const activeCategory = searchParams.get("category");

  const navLinks = [
    { label: "Home", path: "/", key: "home" },
    { label: "Categories", path: "/categories", key: "categories" },
    { label: "About", path: "/about", key: "about" },
    { label: "Shop", path: "/shop", key: "shop" },
    { label: "Contact", path: "/contact", key: "contact" },
  ];

  const isLoggedIn = Boolean(localStorage.getItem("access"));

  return (
    <header className=" font-[IBM_Plex_Sans,sans-serif] sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-gray-200">
      <div className=" sm:px-6 flex items-center justify-between h-16 ">
        {/* Left side: Logo + all Nav Links */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <img
              src={logoMc}
              alt="Maheshwari & Co. Logo"
              className="h-7 w-auto object-contain mr-20"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-9  font-[600px]">
            {navLinks.map(({ label, path, key }) => {
              const isActive =
                location.pathname === path ||
                activeCategory?.toLowerCase() === key;

              return (
                <Link
                  key={label}
                  to={path ?? "#"}
                  className={`relative text-sm transition ${
                    isActive
                      ? "text-blue-600 after:absolute after:left-0 font-semibold after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-600"
                      : "text-[#000000] hover:text-blue-500 font-semibold"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side: Search + Icons */}
        <div className="flex items-center space-x-8">
          <div className="hidden lg:block">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-52 pl-10 py-2 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
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
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/favorites"
                  className="p-2 rounded-full hover:bg-blue-50 transition"
                  aria-label="Wishlist"
                >
                  <Heart className="h-5 w-5 text-gray-700 hover:text-blue-600" />
                </Link>
                <Link
                  to="/cart"
                  className="p-2 rounded-full hover:bg-blue-50 transition relative"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-5 w-5 text-gray-700 hover:text-blue-600" />
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-semibold rounded-full px-1.5">
                    2
                  </span>
                </Link>
                <Link
                  to="/profile"
                  aria-label="User Profile"
                  className="p-2 rounded-full hover:bg-blue-50 transition"
                >
                  <User className="h-6 w-6 text-gray-700 hover:text-blue-600" />
                </Link>
              </>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition"
                  >
                    Sign In
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition"
                  >
                    Create Account
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (slide-down) */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map(({ label, path, key }) => {
              const isActive =
                location.pathname === path ||
                activeCategory?.toLowerCase() === key;

              return (
                <Link
                  key={label}
                  to={path ?? "#"}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 text-sm font-medium transition ${
                    isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-500"
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            {/* Mobile Auth Buttons */}
            <div className="mt-4 flex flex-col gap-2">
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md border border-blue-600 px-4 py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 transition"
                >
                  Profile
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-md border border-blue-600 px-4 py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center p-4 border-t border-gray-100"
          >
            <Input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 pl-10 pr-4 py-2 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
