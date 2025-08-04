// Header.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch or handle searchInput
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Categories", path: "/categories" },
    { label: "New Arrivals", path: "/new-arrivals" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div className="-mt-4 ">
      <div className=" mx-auto ">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex">
            <h1 className="font-[Volkhov] text-xl leading-tight tracking-tight font-normal ">
              M&CO.
            </h1>
          </div>

          <div className="flex items-center space-x-10">
            {/* Navigation links */}
            <nav className="flex space-x-6">
              {navLinks.map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  className="font-['Poppins'] text-[clamp(0.8rem,0.6rem+1vw,1rem)] leading-[1.75] tracking-[0] hover:text-gray-800 transition"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Search form */}
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <Input
                type="text"
                placeholder="Search for..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-64 pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

