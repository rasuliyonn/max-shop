import React from "react";
import { useCartStore } from "../managment/useBasket";
import { FaRegTrashCan } from "react-icons/fa6";

const BasketDes = ({ name, price, img_src, color, size, id, quantity }) => {
  const deleteCart = useCartStore((state) => state.deleteCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);

  return (
    <div className="flex items-center gap-4 py-5">
      <img
        src={img_src}
        alt={name}
        className="w-20 h-20 object-cover rounded-xl"
      />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm md:text-base leading-tight line-clamp-2">
          {name}
        </div>
        {color && (
          <div className="flex items-center gap-2 mt-1">
            <span
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-gray-500 capitalize">{color}</span>
          </div>
        )}
        {size && <div className="text-xs text-gray-500 mt-1">Размер: {size}</div>}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => decreaseQty(id, color)}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-lg font-bold"
          >
            −
          </button>
          <span className="text-sm font-semibold w-5 text-center">{quantity || 1}</span>
          <button
            onClick={() => increaseQty(id, color)}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-lg font-bold"
          >
            +
          </button>
          <div className="text-lg font-bold ml-2">{price * (quantity || 1)} с</div>
        </div>
      </div>
      <button
        onClick={() => deleteCart(id, color)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
        title="Удалить из корзины"
      >
        <FaRegTrashCan className="text-xl" />
      </button>
    </div>
  );
};

export default BasketDes;
