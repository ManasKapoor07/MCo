import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
// import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
  },
  {
    path: "/shop",
    element: (
      <Layout>
        <Shop />
      </Layout>
    ),
  }
  // children: [
  //   { path: "", element: <Home /> },
  //   { path: "about", element: <About /> },
  //   { path: "contact", element: <Contact /> },
  // ],
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
