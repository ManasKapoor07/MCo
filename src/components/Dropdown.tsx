import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { DropdownProps } from "../types";

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="my-4">
      {/* Header */}
      <div
        className="flex items-center justify-between mb-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h4 className="font-[Poppins] font-bold text-xl">{title}</h4>

        {/* One chevron that rotates smoothly */}
        <ChevronDown
          className={`w-6 h-6 transform transition-transform duration-300 ease-in-out ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Dropdown body */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Dropdown;
