import React, { useState } from "react";
import { useCartStore } from "../managment/useBasket";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Card = ({ id, img_src, name, price, colors = [] }) => {
  const addCart = useCartStore((state) => state.addCart);
  const carts = useCartStore((state)=>state.carts)
  const [color, setColor] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const [showNotif, setNotif] = useState(false);
  const HandleClick = () => {
    setOpen(true);
  };
  const addBasket = () => {
    if (!color) {
      alert("Сначала выберите цвет");
      return;
    }
    addCart({ img_src, name, price, id, color });
    showNotification();
    setOpen(false);
  };
  const showNotification = () => {
    setNotif(true);
    setTimeout(() => {
      setNotif(false);
    }, 3000);
  };
  const goToProduct = () => {
    navigate(`/product/${id}`, {
      state: { id, img_src, name, price, colors },
    });
  };
const isInCart = carts.some((item)=>item.id === id)
  return (
    <div className=":">
      <div
        className="relative w-[256px] h-96 mx-auto container hover:-translate-y-5 hover:shadow-xl/20 duration-500 p-6 hover:text-[rgb(174,173,202)] active:shadow-xl/20 active:duration-500 active:text-[rgb(174,173,202)] cursor-pointer"
        onClick={() => goToProduct()}
      >
        <div></div>
        <img src={img_src} alt={name} className="rounded-2xl" />
        <div className="text-[20px] font-bold mt-1.5">{name}</div>
        <div className="mt-2">Цена</div>
        <div className="text-2xl font-bold mt-2.5 items-center flex justify-between ">
          {price}{"C"}
          <button
            className="p-2 bg-black text-white text-[16px] rounded-[10px] hover:-translate-0.5 duration-500"
            onClick={(e) => {
              e.stopPropagation();
              HandleClick();
            }}
          >
            {"В корзину"}
          </button>{" "}
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="absolute inset-0 bg-black opacity-10"></div>

          <div className="relative bg-white p-6 rounded-lg z-50 w-auto h-auto items-center justify-center">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-black"
            >
              <IoCloseSharp className="text-2xl" />
            </button>
            <div className="md:flex p-1.5 justify-center items-center text-center mx-auto container">
              <img
                src={img_src}
                alt={name}
                className="rounded-2xl mb-4 text-center"
              />
              <div>
                {" "}
                <div className="text-xl font-bold mb-2">{name}</div>
                <span>Цена</span>
                <p className="text-lg font-semibold">{price}</p>
                <div className="flex mt-3">
                  <div className="mr-2.5">Цвет:</div>
                  {colors.map((item, index) => (
                    <button
                      onClick={() => setColor(item)}
                      key={index}
                      className={`w-7 h-7 rounded-full border mr-3 transition flex items-center justify-center
      ${color === item ? "ring-2 ring-black scale-110" : "opacity-70"}
    `}
                      style={{ backgroundColor: item }}
                    ></button>
                  ))}
                </div>
                <button
                  onClick={() => addBasket()}
                  className="border-2 duration-500 rounded-2xl w-auto h-auto p-4 bg-black text-white hover:text-black hover:bg-white"
                >
                  Купить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showNotif && (
        <div className="fixed bottom-0 right-0 bg-black text-white px-4 py-2 rounded-xl shadow-lg z-50">
          Товар добавлен в корзину
        </div>
      )}
    </div>
  );
};

export default Card;
