import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../managment/useBasket";

const ProductPage = () => {
  const [color, setColor] = useState(null);
  const addCart = useCartStore((state) => state.addCart);
  const location = useLocation();
  const product = location.state;
  const [notif, setNotif] = useState(false);

  useEffect(() => {
    if (!notif) return;

    const timer = setTimeout(() => {
      setNotif(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notif]);

  if (!product) return <div>Товар не найден</div>;

  const addBasket = () => {
    if (!color) {
      return;
    }
    setNotif(true);

    addCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img_src: product.img_src,
      color,
    });
  };

  return (
    <div className="container mx-auto p-4 md:mt-25 md:flex">
      <img
        src={product.img_src}
        alt={product.name}
        className="my-4 rounded-xl mr-10"
      />
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl font-semibold mt-5">Цена: {product.price}</p>
        {!color && <div className="mt-2.5">Выберите цвет</div>}
        <div className="flex mt-2">
          {product.colors.map((item, index) => (
            <div
              key={index}
              onClick={() => setColor(item)}
              className={`w-7 h-7 rounded-full border mr-3 transition cursor-pointer flex items-center justify-center
                ${color === item ? "ring-2 ring-black scale-110" : "opacity-70"}
              `}
              style={{ backgroundColor: item }}
            />
          ))}
        </div>

        <button
          onClick={() => addBasket()}
          className="mt-7 p-4 bg-black text-white text-2xl rounded-2xl hover:bg-white hover:text-black duration-500"
        >
          {"Купить"}
        </button>
        {notif && (
          <div>
            <div className="fixed bottom-0 right-0 bg-black text-white px-4 py-2 rounded-xl shadow-lg z-50">
              Товар добавлен в корзину
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
