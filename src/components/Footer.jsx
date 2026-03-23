import React from "react";
import { RiVisaFill } from "react-icons/ri";
import { FaCcMastercard, FaCcPaypal, FaGooglePay, FaApplePay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-gray-200 mt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div
              className="text-2xl font-bold mb-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Max.Shop
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Ваш онлайн-магазин техники и аксессуаров
            </p>
          </div>

          {/* Catalog */}
          <div>
            <div className="font-semibold text-sm mb-4">Каталог</div>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <button
                className="text-left hover:text-gray-900 transition-colors"
                onClick={() => navigate("/all")}
              >
                Все товары
              </button>
              <button
                className="text-left hover:text-gray-900 transition-colors"
                onClick={() => navigate("/news")}
              >
                Новинки
              </button>
              <button
                className="text-left hover:text-gray-900 transition-colors"
                onClick={() => navigate("/on_sale")}
              >
                Распродажа
              </button>
            </div>
          </div>

          {/* Help */}
          <div>
            <div className="font-semibold text-sm mb-4">Помощь</div>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <span>Доставка и оплата</span>
              <span>Возврат товара</span>
              <span>Контакты</span>
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="font-semibold text-sm mb-4">О нас</div>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <span>О компании</span>
              <span>Вакансии</span>
              <span>Партнёрам</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            Max.Shop © 2000–2026. Все права защищены.
          </div>
          <div className="flex items-center gap-4 text-4xl text-gray-400">
            <RiVisaFill className="hover:text-gray-700 transition-colors cursor-pointer" />
            <FaCcMastercard className="hover:text-gray-700 transition-colors cursor-pointer" />
            <FaCcPaypal className="hover:text-gray-700 transition-colors cursor-pointer" />
            <FaApplePay className="hover:text-gray-700 transition-colors cursor-pointer" />
            <FaGooglePay className="hover:text-gray-700 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
