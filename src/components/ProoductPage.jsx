import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../managment/useBasket";
import Toast from "./Toast";
import Footer from "./Footer";
const ProductPage = () => {
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const addCart = useCartStore((state) => state.addCart);
  const products = useCartStore((state) => state.product);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const productFromState = location.state;
  const [notif, setNotif] = useState(false);
  const productFromStore = products.find((item) => item.id === Number(id));
  const product = productFromStore ?? productFromState;

  const productData = product
    ? {
        id: product.id,
        name: product.name ?? product.title,
        price: product.price,
        img_src: product.img_src ?? product.img_url,
        colors: product.colors ?? [],
        category: product.category,
        brand: product.brand,
        description: product.description,
        characteristics: product.characteristics ?? [],
        sizes: product.sizes ?? [],
      }
    : null;

  useEffect(() => {
    if (!notif) return;
    const timer = setTimeout(() => setNotif(false), 3000);
    return () => clearTimeout(timer);
  }, [notif]);

  if (!productData)
    return (
      <div className="container mx-auto px-4 mt-20 text-center">
        <div className="text-2xl font-bold mb-4">Товар не найден</div>
        <button className="btn-primary" onClick={() => navigate("/all")}>
          Перейти в каталог
        </button>
      </div>
    );

  const addBasket = () => {
    if (!color || !size) return;
    setNotif(true);
    addCart({
      id: productData.id,
      name: productData.name,
      price: productData.price,
      img_src: productData.img_src,
      color,
      size,
      brand: productData.brand,
      description: productData.description,
      sizes: productData.sizes,
    });
  };

  const categoryLabel =
    productData.category === "new"
      ? "Новинка"
      : productData.category === "on_sale"
        ? "Распродажа"
        : null;

  return (
    <div>
      <div className="container mx-auto px-4 py-8 md:py-10">
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
            {productData.name}
          </span>
        </div>
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-start">
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-[28px] p-4 md:p-6 shadow-sm">
            <div className="relative overflow-hidden rounded-3xl bg-white">
              {categoryLabel && (
                <span
                  className={`absolute top-4 left-4 z-10 text-xs font-semibold px-3 py-1.5 rounded-full text-white shadow-md ${
                    productData.category === "new"
                      ? "bg-indigo-500"
                      : "bg-red-500"
                  }`}
                >
                  {categoryLabel}
                </span>
              )}
              <img
                src={productData.img_src}
                alt={productData.name}
                className="w-full h-[320px] sm:h-[420px] lg:h-[560px] object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-white border border-gray-100 rounded-[28px] p-6 md:p-8 shadow-sm">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  {productData.brand && (
                    <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 mb-3">
                      {productData.brand}
                    </div>
                  )}
                  <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-950 max-w-xl">
                    {productData.name}
                  </h1>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 whitespace-nowrap">
                  {productData.price} с
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-gray-600">
                {productData.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Бренд
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {productData.brand || "Не указан"}
                  </div>
                </div>
                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Категория
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {categoryLabel || "Товар"}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-[28px] p-6 md:p-8 shadow-sm">
              <div className="text-lg font-bold text-gray-900">
                Доступные размеры
              </div>
              <div className="text-sm font-medium text-gray-700 mt-3 mb-3">
                {size ? (
                  <span>
                    Выбран размер:{" "}
                    <span className="text-indigo-600">{size}</span>
                  </span>
                ) : (
                  <span className="text-gray-400">Сначала выберите размер</span>
                )}
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                {productData.sizes.length > 0 ? (
                  productData.sizes.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSize(item)}
                      className={`min-w-14 px-4 py-3 rounded-2xl border text-center font-medium transition-all duration-150 ${
                        size === item
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm"
                          : "border-gray-200 text-gray-700 bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      {item}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    Размеры пока не добавлены
                  </p>
                )}
              </div>
              {!size && (
                <p className="text-xs text-amber-600 mt-3">
                  Выберите размер перед добавлением в корзину
                </p>
              )}
            </div>

            <div className="bg-white border border-gray-100 rounded-[28px] p-6 md:p-8 shadow-sm">
              <div className="text-lg font-bold text-gray-900">
                Выберите цвет
              </div>
              <div className="text-sm font-medium text-gray-700 mt-3 mb-3">
                {color ? (
                  <span>
                    Выбран цвет:{" "}
                    <span className="text-indigo-600">{color}</span>
                  </span>
                ) : (
                  <span className="text-gray-400">
                    Сначала выберите цвет товара
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {productData.colors.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setColor(item)}
                    className={`w-11 h-11 rounded-2xl border-2 transition-all duration-150 ${
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
                <p className="text-xs text-amber-600 mt-3">
                  Выберите цвет перед добавлением в корзину
                </p>
              )}

              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                <button
                  onClick={addBasket}
                  disabled={!color || !size}
                  className={`w-full py-4 text-base rounded-2xl font-semibold transition-all duration-200 ${
                    color && size
                      ? "bg-gray-900 text-white hover:bg-gray-700 hover:-translate-y-0.5 shadow-md"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {color && size
                    ? "Добавить в корзину"
                    : "Выберите цвет и размер"}
                </button>

                <button
                  className="btn-outline w-full py-4 text-base"
                  onClick={() => navigate("/basket")}
                >
                  Перейти в корзину
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-[28px] p-6 md:p-8 shadow-sm">
              <div className="text-lg font-bold text-gray-900">
                Характеристики
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-5">
                {productData.characteristics.length > 0 ? (
                  productData.characteristics.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700"
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    Характеристики пока не указаны
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <Toast message="Товар добавлен в корзину ✓" visible={notif} />

        {(() => {
          const recommended = products
            .filter(
              (p) =>
                p.id !== productData.id &&
                (p.brand === productData.brand ||
                  p.category === productData.category),
            )
            .slice(0, 4);
          if (recommended.length === 0) return null;
          return (
            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Похожие товары
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recommended.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg duration-300 cursor-pointer"
                    onClick={() =>
                      navigate(`/product/${item.id}`, {
                        state: {
                          id: item.id,
                          img_src: item.img_url,
                          name: item.title,
                          price: item.price,
                          colors: item.colors,
                          category: item.category,
                          brand: item.brand,
                          description: item.description,
                          characteristics: item.characteristics,
                          sizes: item.sizes,
                        },
                      })
                    }
                  >
                    <div className="relative">
                      {item.category && (
                        <span
                          className={`absolute top-3 left-3 z-10 text-xs font-semibold px-2.5 py-1 rounded-full text-white ${
                            item.category === "on_sale"
                              ? "bg-red-500"
                              : item.category === "new"
                                ? "bg-indigo-500"
                                : "bg-amber-500"
                          }`}
                        >
                          {item.category === "new"
                            ? "Новинка"
                            : item.category === "on_sale"
                              ? "Скидка"
                              : "Хит"}
                        </span>
                      )}
                      <img
                        src={item.img_url}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
                        {item.brand}
                      </div>
                      <div className="font-semibold text-sm leading-tight line-clamp-2">
                        {item.title}
                      </div>
                      <div className="text-lg font-bold mt-2 text-indigo-600">
                        {item.price.toLocaleString()} с
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
