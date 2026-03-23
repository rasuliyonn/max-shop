import React from "react";
import { useCartStore } from "../managment/useBasket";
import Card from "./Card";

const News = () => {
  const carts = useCartStore((state) => state.product);
  return (
    <div>
      <div className="text-5xl font-bold text-center mt-2 md:mt-16">
        Все товары
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 container mx-auto mt-14 gap-5">
        {carts.map((item, index) => (
          <Card
            key={index}
            id={item.id}
            name={item.title}
            price={item.price}
            img_src={item.img_url}
            colors={item.colors}
          />
        ))}
      </div>
    </div>
  );
};

export default News;
