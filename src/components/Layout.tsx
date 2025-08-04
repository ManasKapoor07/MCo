import { Outlet } from "react-router-dom";
import Header from "./Header"; // Your header component
import Home from "@/pages/Home";

const Layout = ({ children }) => {
  return (
    <div className="">
      <div className="bg-[#F2F8FF] ">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
