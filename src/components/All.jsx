import { useCartStore } from "../managment/useBasket";
import { useSearchParams } from "react-router-dom";
import Card from "./Card";
import Footer from "./Footer";

const All = () => {
  const allProducts = useCartStore((state) => state.product);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "default";

  const setSort = (value) => {
    setSearchParams(value === "default" ? {} : { sort: value });
  };

  const sorted = [...allProducts].sort((a, b) => {
    if (sort === "price-asc") return parseInt(a.price) - parseInt(b.price);
    if (sort === "price-desc") return parseInt(b.price) - parseInt(a.price);
    if (sort === "name") return a.title.localeCompare(b.title, "tj");
    return 0;
  });

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8 md:mt-16 mb-8 gap-4">
          <h1 className="text-3xl md:text-5xl font-bold">Все товары</h1>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 bg-white cursor-pointer"
          >
            <option value="default">По умолчанию</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
            <option value="name">По названию</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sorted.map((item, index) => (
            <Card
              key={index}
              id={item.id}
              img_src={item.img_url}
              name={item.title}
              price={item.price}
              colors={item.colors}
              category={item.category}
              sizes={item.sizes}
              description={item.description}
              brand={item.brand}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default All;
