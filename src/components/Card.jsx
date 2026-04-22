import React, { useState } from "react";
import { useCartStore } from "../managment/useBasket";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";
import product from "../conts/products";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Card = ({
  id,
  img_src,
  name,
  price,
  colors = [],
  category,
  brand,
  description,
  characteristics,
  sizes,
  loading,
}) => {
  const addCart = useCartStore((state) => state.addCart);
  const carts = useCartStore((state) => state.carts);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const [showNotif, setNotif] = useState(false);
  const [warn, setWarn] = useState("");
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const addBasket = () => {
    if (!color || !size) {
      setWarn(!color ? "Выберите цвет товара" : "Выберите размер товара");
      return;
    }
    addCart({
      img_src,
      name,
      price,
      id,
      color,
      size,
      category,
      brand,
      description,
      characteristics,
      sizes,
    });
    setNotif(true);
    setTimeout(() => setNotif(false), 3000);
    setOpen(false);
    setWarn("");
  };

  const goToProduct = () => {
    navigate(`/product/${id}`, {
      state: {
        id,
        img_src,
        name,
        price,
        colors,
        category,
        brand,
        description,
        characteristics,
        sizes,
      },
    });
  };

  return (
    <div className="relative">
      <div
        className="relative w-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-lg duration-300 cursor-pointer"
        onClick={() => goToProduct()}
      >
        {category && (
          <span
            className={`absolute top-3 left-3 z-10 text-xs font-semibold px-2.5 py-1 rounded-full text-white ${
              category.includes(category) ? "bg-red-500" : "bg-indigo-500"
            }`}
          >
            {category === "new" ? "Новинка" : "Скидка"}
          </span>
        )}
        <div className="p-4">
          {loading ? (
            <Skeleton />
          ) : (
            <img
              src={img_src}
              alt={name}
              className="w-full h-48 object-cover rounded-xl"
            />
          )}
          <div className="mt-3 font-semibold text-sm leading-tight line-clamp-2">
            {name}
          </div>
          <div className="mt-1 text-xs text-gray-500">Цена</div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xl font-bold">{price} с</span>
            {carts.some((item) => item.id === id) ? (
              <div className="flex">
                {" "}
                <button
                  onClick={(e) => {
                    (e.stopPropagation(),
                      increaseQty(product.filter((item) => item.id === id)));
                  }}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-lg font-bold"
                >
                  −
                </button>{" "}
                <span className="text-sm font-semibold w-5 text-center"></span>
                <button
                  onClick={(e) => {
                    (e.stopPropagation(),
                      increaseQty(product.filter((item) => item.id === id)));
                  }}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-lg font-bold"
                >
                  +
                </button>
              </div>
            ) : (
              <div>
                {" "}
                <button
                  className="btn-primary text-sm px-4 py-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setColor(null);
                    setSize(null);
                    setWarn("");
                    setOpen(true);
                  }}
                >
                  В корзину{" "}
                </button>
              </div>
            )}
             {}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-white p-6 rounded-2xl z-50 w-full max-w-md shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <IoCloseSharp className="text-2xl" />
            </button>

            {warn && (
              <div className="mb-4 px-4 py-3 mt-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium">
                ⚠ {warn}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <img
                src={img_src}
                alt={name}
                className="w-full sm:w-40 h-40 object-cover rounded-xl"
              />
              <div className="flex-1">
                <div className="text-lg font-bold leading-tight">{name}</div>
                <div className="text-xl font-bold text-indigo-600 mt-2">
                  {price} с
                </div>

                <div className="mt-4">
                  <div className="text-sm text-gray-500 mb-2">
                    Выберите цвет:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((item, index) => (
                      <button
                        onClick={() => {
                          setColor(item);
                          setWarn("");
                        }}
                        key={index}
                        className={`w-8 h-8 rounded-lg border-2 transition-all duration-150 ${
                          color === item
                            ? "border-indigo-500 scale-110 shadow-md"
                            : "border-gray-200 opacity-80 hover:opacity-100 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: item }}
                        title={item}
                      />
                    ))}
                  </div>
                </div>

                {sizes && sizes.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm text-gray-500 mb-2">
                      Выберите размер:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSize(item);
                            setWarn("");
                          }}
                          className={`min-w-10 px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-150 ${
                            size === item
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                              : "border-gray-200 text-gray-700 bg-gray-50 hover:border-gray-400"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button onClick={addBasket} className="btn-primary w-full mt-4">
                  Добавить в корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toast message="Товар добавлен в корзину ✓" visible={showNotif} />
    </div>
  );
};

export default Card;
