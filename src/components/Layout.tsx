import { Outlet } from "react-router-dom";
import Header from "./Header"; // Your header component
import Home from "@/pages/Home";

import { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-full w-full font-[IBM_Plex_Sans,sans-serif]">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
