import { useCartStore } from "../managment/useBasket";
import ProductGrid from "./ProductGrid";
import Footer from "./Footer";

const News = () => {
  const products = useCartStore((state) => state.product);
  const popular = products.filter((item) => item.category === "popular");

  return (
    <>
      <ProductGrid products={popular} title="Популярные товары" />
      <Footer />
    </>
  );
};

export default News;
