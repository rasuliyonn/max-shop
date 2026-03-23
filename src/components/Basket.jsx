import React from "react";
import BasketDes from "./BasketDes";
import { useCartStore } from "../managment/useBasket";
import { SlBasket } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const Basket = () => {
  const carts = useCartStore((state) => state.carts);
  const navigate = useNavigate();
  const total = carts.reduce((acc, item) => acc + parseInt(item.price), 0);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Ваша корзина</h1>

      {carts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <SlBasket className="text-7xl text-gray-300 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Корзина пуста
          </h2>
          <p className="text-gray-400 mb-8">
            Добавьте товары, чтобы оформить заказ
          </p>
          <button className="btn-primary" onClick={() => navigate("/all")}>
            Перейти в каталог
          </button>
        </div>
      ) : (
        <div className="md:flex gap-10">
          {/* Cart items */}
          <div className="flex-1 divide-y divide-gray-100">
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
          </div>

          {/* Order summary */}
          <div className="md:w-72 mt-10 md:mt-0 flex-shrink-0">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Итого</h2>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Товары ({carts.length})</span>
                <span>{total} ₽</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>К оплате</span>
                  <span className="text-indigo-600">{total} ₽</span>
                </div>
              </div>
              <button className="btn-primary w-full mt-6 py-4 text-base">
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
