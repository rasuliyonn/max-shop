import { useParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../managment/useBasket";
import Card from "./Card";

export default function BrandPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const product = useCartStore((state) => state.product);

  const brandProducts = product.filter(
    (item) =>
      item.brand.replace(/,/g, " ").toLowerCase().trim() === name
  );

  const displayName = brandProducts.length > 0
    ? brandProducts[0].brand
    : name;

  return (
    <div className="container mx-auto px-4 mt-16 md:mt-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-4xl font-bold">{displayName}</h2>
        <button
          className="btn-outline text-sm"
          onClick={() => navigate("/all")}
        >
          Все товары
        </button>
      </div>

      {brandProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-2xl font-semibold text-gray-400 mb-4">
            Товары бренда не найдены
          </p>
          <button className="btn-primary" onClick={() => navigate("/all")}>
            Перейти в каталог
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brandProducts.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              img_src={item.img_url}
              name={item.title}
              price={item.price}
              colors={item.colors}
              category={item.category}
              sizes={item.sizes}
              description={item.description}
              brand={item.brand}
              characteristics={item.characteristics}
            />
          ))}
        </div>
      )}
    </div>
  );
}
