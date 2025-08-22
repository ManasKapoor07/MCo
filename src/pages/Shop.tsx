import Footer from "@/components/Footer";
import ProductsShop from "@/components/ProductsShop";

const Shop = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
        <ProductsShop />
        <Footer />
    </div>
  );
};

export default Shop;