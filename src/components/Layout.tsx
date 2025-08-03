import { Outlet } from "react-router-dom";
import Header from "./Header"; // Your header component

const Layout = () => {
  return (
    <>
      <Header />
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
