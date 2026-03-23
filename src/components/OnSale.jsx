import { useCartStore } from "../managment/useBasket";
import ProductGrid from "./ProductGrid";
import Footer from "./Footer";

const OnSale = () => {
  const products = useCartStore((state) => state.product);
  const saleProducts = products.filter((item) => item.category === "on_sale");

  return (
    <>
      <ProductGrid products={saleProducts} title="Распродажа" />
      <Footer />
    </>
  );
};

export default OnSale;
