import { useCartStore } from "../managment/useBasket";
import ProductGrid from "./ProductGrid";
import Footer from "./Footer";

const News = () => {
  const products = useCartStore((state) => state.product);
  const newProducts = products.filter((item) => item.category === "new");

  return (
    <>
      <ProductGrid products={newProducts} title="Новые товары" />
      <Footer />
    </>
  );
};

export default News;
