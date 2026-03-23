import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../managment/useBasket";
import Toast from "./Toast";

const ProductPage = () => {
  const [color, setColor] = useState(null);
  const addCart = useCartStore((state) => state.addCart);
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  const [notif, setNotif] = useState(false);

  useEffect(() => {
    if (!notif) return;
    const timer = setTimeout(() => setNotif(false), 3000);
    return () => clearTimeout(timer);
  }, [notif]);

  if (!product)
    return (
      <div className="container mx-auto px-4 mt-20 text-center">
        <div className="text-2xl font-bold mb-4">Товар не найден</div>
        <button className="btn-primary" onClick={() => navigate("/all")}>
          Перейти в каталог
        </button>
      </div>
    );

  const addBasket = () => {
    if (!color) return;
    setNotif(true);
    addCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img_src: product.img_src,
      color,
    });
  };

  const categoryLabel =
    product.category === "new"
      ? "Новинка"
      : product.category === "on_sale"
        ? "Распродажа"
        : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
        <button
          className="hover:text-gray-900 transition-colors"
          onClick={() => navigate("/")}
        >
          Главная
        </button>
        <span>/</span>
        <button
          className="hover:text-gray-900 transition-colors"
          onClick={() => navigate("/all")}
        >
          Каталог
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium line-clamp-1">
          {product.name}
        </span>
      </div>

      <div className="md:flex gap-10 lg:gap-16">
        {/* Image */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="relative">
            {categoryLabel && (
              <span
                className={`absolute top-4 left-4 z-10 text-xs font-semibold px-3 py-1 rounded-full text-white ${
                  product.category === "new" ? "bg-indigo-500" : "bg-red-500"
                }`}
              >
                {categoryLabel}
              </span>
            )}
            <img
              src={product.img_src}
              alt={product.name}
              className="w-full rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-2xl lg:text-3xl font-bold leading-tight">
            {product.name}
          </h1>
          <div className="text-3xl font-bold text-indigo-600 mt-4">
            {product.price} ₽
          </div>

          {/* Color picker */}
          <div className="mt-6">
            <div className="text-sm font-medium text-gray-700 mb-3">
              Цвет:{" "}
              {color ? (
                <span className="text-indigo-600">{color}</span>
              ) : (
                <span className="text-gray-400">не выбран</span>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setColor(item)}
                  className={`w-10 h-10 rounded-xl border-2 transition-all duration-150 ${
                    color === item
                      ? "border-indigo-500 scale-110 shadow-lg"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: item }}
                  title={item}
                />
              ))}
            </div>
            {!color && (
              <p className="text-xs text-amber-600 mt-2">
                Выберите цвет перед добавлением в корзину
              </p>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={addBasket}
            disabled={!color}
            className={`mt-8 w-full py-4 text-lg rounded-2xl font-semibold transition-all duration-200 ${
              color
                ? "bg-gray-900 text-white hover:bg-gray-700 hover:-translate-y-0.5 shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {color ? "Добавить в корзину" : "Выберите цвет"}
          </button>

          <button
            className="btn-outline mt-3 w-full py-4 text-base"
            onClick={() => navigate("/basket")}
          >
            Перейти в корзину
          </button>
        </div>
      </div>

      <Toast message="Товар добавлен в корзину ✓" visible={notif} />
    </div>
  );
};

export default ProductPage;
