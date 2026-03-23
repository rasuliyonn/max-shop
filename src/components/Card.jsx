import React, { useState } from "react";
import { useCartStore } from "../managment/useBasket";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

const Card = ({ id, img_src, name, price, colors = [], category }) => {
  const addCart = useCartStore((state) => state.addCart);
  const [color, setColor] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const [showNotif, setNotif] = useState(false);

  const addBasket = () => {
    if (!color) {
      alert("Сначала выберите цвет");
      return;
    }
    addCart({ img_src, name, price, id, color });
    setNotif(true);
    setTimeout(() => setNotif(false), 3000);
    setOpen(false);
  };

  const goToProduct = () => {
    navigate(`/product/${id}`, {
      state: { id, img_src, name, price, colors, category },
    });
  };

  return (
    <div className="relative">
      <div
        className="relative w-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-lg duration-300 cursor-pointer"
        onClick={goToProduct}
      >
        {/* Category badge */}
        {category && (
          <span
            className={`absolute top-3 left-3 z-10 text-xs font-semibold px-2.5 py-1 rounded-full text-white ${
              category === "new" ? "bg-indigo-500" : "bg-red-500"
            }`}
          >
            {category === "new" ? "Новинка" : "Скидка"}
          </span>
        )}
        <div className="p-4">
          <img
            src={img_src}
            alt={name}
            className="w-full h-48 object-cover rounded-xl"
          />
          <div className="mt-3 font-semibold text-sm leading-tight line-clamp-2">
            {name}
          </div>
          <div className="mt-1 text-xs text-gray-500">Цена</div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xl font-bold">{price} ₽</span>
            <button
              className="btn-primary text-sm px-4 py-2"
              onClick={(e) => {
                e.stopPropagation();
                setColor(null);
                setOpen(true);
              }}
            >
              В корзину
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
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
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <img
                src={img_src}
                alt={name}
                className="w-full sm:w-40 h-40 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1">
                <div className="text-lg font-bold leading-tight">{name}</div>
                <div className="text-xl font-bold text-indigo-600 mt-2">
                  {price} ₽
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-500 mb-2">
                    Выберите цвет:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((item, index) => (
                      <button
                        onClick={() => setColor(item)}
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
                  {!color && (
                    <p className="text-xs text-gray-400 mt-1.5">
                      Выберите цвет для добавления
                    </p>
                  )}
                </div>
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
