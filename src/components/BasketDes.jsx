import React from "react";
import { useCartStore } from "../managment/useBasket";
import { FaRegTrashCan } from "react-icons/fa6";

const BasketDes = ({ name, price, img_src, color, id }) => {
  const deleteCart = useCartStore((state) => state.deleteCart);

  return (
    <div className="flex items-center gap-4 py-5">
      <img
        src={img_src}
        alt={name}
        className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm md:text-base leading-tight line-clamp-2">
          {name}
        </div>
        {color && (
          <div className="flex items-center gap-2 mt-1">
            <span
              className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-gray-500 capitalize">{color}</span>
          </div>
        )}
        <div className="text-lg font-bold mt-2">{price} ₽</div>
      </div>
      <button
        onClick={() => deleteCart(id)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 flex-shrink-0"
        title="Удалить из корзины"
      >
        <FaRegTrashCan className="text-xl" />
      </button>
    </div>
  );
};

export default BasketDes;
