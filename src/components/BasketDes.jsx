import React from "react";
import { useCartStore } from "../managment/useBasket";
import { FaRegTrashCan } from "react-icons/fa6";

const BasketDes = ({ name, price, img_src, color, id }) => {
  const delet = useCartStore((state) => state.deleteCart);

  return (
    <div className="flex mt-11 items-center">
      <div className="p-5">
        <img src={img_src} alt="" className="h-32 w-32 mr-5" />
      </div>
      <div className="hover:text-[rgb(174,173,202)] duration-500">
        {" "}
        <div className="text-[14px] md:text-[20px] font-bold">{name}</div>
        <div>{color}</div>
        <div className="text-2xl mt-5">{price}</div>
      </div>
      <FaRegTrashCan
        onClick={() => delet(id)}
        className="mt-25 text-4xl hover:bg-red-600 hover:text-white duration-500 p-1 md:text-4xl rounded-3xl"
      />
    </div>
  );
};

export default BasketDes;
