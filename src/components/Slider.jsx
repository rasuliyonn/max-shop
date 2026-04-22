import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import products from "../conts/products";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const categoryLabel = {
  on_sale: { text: "Скидка", color: "bg-red-500" },
  new: { text: "Новинка", color: "bg-indigo-500" },
  popular: { text: "Хит продаж", color: "bg-amber-500" },
};

const slides = [
  ...products.filter((p) => p.category === "on_sale").slice(0, 3),
  ...products.filter((p) => p.category === "new").slice(0, 2),
  ...products.filter((p) => p.category === "popular").slice(0, 1),
];

export default function Slider({ loading }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  const goTo = (i) => {
    setFade(false);
    setTimeout(() => {
      setIndex(i);
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((index + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [index]);

  const slide = slides[index];
  const label = categoryLabel[slide.category];

  return loading ? (
    <Skeleton />
  ) : (
    <div className="w-full relative overflow-hidden mx-auto container rounded-3xl mt-5 mb-6">
      <div
        className={`relative w-full h-48 sm:h-64 md:h-80 lg:h-96 transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src={slide.img_url}
          alt={slide.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0  from-black/60 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-14 max-w-lg">
          <span
            className={`self-start text-xs font-bold px-3 py-1 rounded-full text-white mb-3 ${label.color}`}
          >
            {label.text}
          </span>
          <div className="text-xs text-white/70 mb-1 font-medium tracking-wide uppercase">
            {slide.brand}
          </div>
          <h2 className="text-white font-bold text-lg sm:text-2xl md:text-3xl leading-tight mb-2 line-clamp-2">
            {slide.title}
          </h2>
          <div className="text-white text-xl sm:text-2xl font-bold mb-4">
            {slide.price.toLocaleString()} с
          </div>
          <button
            onClick={() =>
              navigate(`/product/${slide.id}`, {
                state: {
                  id: slide.id,
                  img_src: slide.img_url,
                  name: slide.title,
                  price: slide.price,
                  colors: slide.colors,
                  category: slide.category,
                  brand: slide.brand,
                  description: slide.description,
                  characteristics: slide.characteristics,
                  sizes: slide.sizes,
                },
              })
            }
            className="self-start bg-white text-gray-900 font-semibold text-sm px-5 py-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Смотреть →
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Слайд ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === index
                ? "w-6 h-2.5 bg-white"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
