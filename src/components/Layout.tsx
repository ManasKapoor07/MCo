import { Outlet } from "react-router-dom";
import Header from "./Header"; // Your header component
import Home from "@/pages/Home";

const Layout = ({ children }) => {
  return (
    <>
      <main className="">
        <Header />
        {children}
      </main>
    </>
  );
};

export default Layout;
