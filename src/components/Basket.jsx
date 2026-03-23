import React from "react";
import BasketDes from "./BasketDes";
import { useCartStore } from "../managment/useBasket";

const Basket = () => {
  const carts = useCartStore((state) => state.carts);
  return (
    <div className="mx-auto container mt-11">
      <div className="mx-auto container flex justify-center text-[40px] ">
        Ваши заказы
      </div>
      <div>
        {" "}
        {carts.length == 0 ? (
          <div className="mx-auto container text-[40px] text-center mt-6">
            Корзина пуста
          </div>
        ) : (
          <div className="grid grid-cols-1 mx-auto container grid-rows-1">
            <div className="grid grid-cols-1 md:grid-cols-1">
              {carts.map((item, index) => (
                <BasketDes
                  key={index}
                  id={item.id}
                  img_src={item.img_src}
                  name={item.name}
                  price={item.price}
                  color={item.color}
                />
              ))}
              <div className="mt-20 text-center text-5xl font-bold">
                <div>Сумма вашего заказа</div>
                <div className="mt-6 text-2xl">
                  {carts.length === 0 ? (
                    "Корзина пуста"
                  ) : (
                    <>
                      <div className="mt-6 font-bold">
                        Итого:{" "}
                        {carts.reduce(
                          (acc, item) => acc + parseInt(item.price),
                          0,
                        )}
                        {"c"}
                      </div>
                    </>
                  )}
                  <div>
                    <button className="bg-black text-white p-6 rounded-2xl mt-7 hover:text-black hover:bg-white duration-500">
                      Оформить заказ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
