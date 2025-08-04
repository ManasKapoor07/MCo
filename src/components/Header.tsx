import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
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
    <div className="p-2 px-6">
      <div className="mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="font-[Volkhov] text-3xl leading-tight tracking-tight font-normal">
            M&CO.
          </h1>

          <div className="flex items-center space-x-10">
            {/* Navigation links */}
            <nav className="flex space-x-6">
              {navLinks.map(({ label, path, key }) => {
                const isActive =
                  location.pathname === path ||
                  activeCategory?.toLowerCase() === key;

                return (
                  <Link
                    key={label}
                    to={path}
                    className={`font-['Poppins'] text-[clamp(0.8rem,0.6rem+1vw,1rem)]  transition relative
                      ${
                        isActive
                          ? "underline underline-offset-[10px] text-blue-600 "
                          : "hover:text-blue-500"
                      }
                    `}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Search form */}
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <Input
                type="text"
                placeholder="Search for..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 rounded-md border-0 bg-white focus:outline-none focus:ring-2 focus:border-0"
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
        </div>
      </div>
    </div>
  );
};

export default Header;
