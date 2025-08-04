import { Outlet } from "react-router-dom";
import Header from "./Header"; // Your header component
import Home from "@/pages/Home";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#F2F8FF] flex flex-col h-full w-full px-4">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
