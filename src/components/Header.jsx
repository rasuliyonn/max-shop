import { useState, useEffect } from "react";
import { BiArrowToBottom } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useCartStore } from "../managment/useBasket";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [clear, setClear] = useState("");
  const clearInput = () => {
    setClear("");
  };
  const carts = useCartStore((state) => state.carts);
  const cartsCount = carts.length;
  const navigate = useNavigate();

  return (
    <header>
      <nav>
        <div className="flex items-center container mx-auto justify-around cursor-pointer">
          <div
            className="text-[25px] font-bold sm:text-[20px] md:text-[30px] lg:text-[32px] mr-2 cursor-pointer"
            onClick={() => navigate(`/`)}
          >
            Max.Shop
          </div>
          <div className=" hidden md:items-center gap-6 sm:flex md:flex text-[12px] lg:text-[16px]">
            <div>
              <button
                className="flex items-center hover:text-[rgb(174,173,202)] duration-300 "
                onClick={() => navigate("/all")}
              >
                Все товары
                <BiArrowToBottom className="animate-bounce" />
              </button>
            </div>

            <div
              className="hover:text-[rgb(174,173,202)]  duration-300 "
              onClick={() => navigate(`/on_sale`)}
            >
              Распродажа
            </div>
            <div
              className="hover:text-[rgb(174,173,202)]  duration-300 "
              onClick={() => navigate(`/news`)}
            >
              Новые товары
            </div>
            <div className="bg-[#F0F0F0] rounded-2xl p-1 w-auto ">
              <div className="items-center text-center flex">
                <CiSearch className="text-2xl mr-1.5" />
                <input
                  value={clear}
                  onChange={(e) => setClear(e.target.value)}
                  state:setActiveS
                  type="text"
                  className="p-1.5 max-w-2xl sm:w-25 md:w-50 lg:w-75"
                  placeholder="Искать товар"
                />
                <button onClick={clearInput}>
                  <IoClose />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-5 text-2xl">
            <div className="flex relative" onClick={() => navigate(`/basket/`)}>
              <SlBasket />
              <span className="text-[12px] absolute left-[20.5px] top-[11.1px] bg-red-400 rounded-3xl font-normal animate-bounce text-white p-1">
                {cartsCount}
              </span>
            </div>
            <FaRegUserCircle onClick={() => navigate(`/login`)} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
