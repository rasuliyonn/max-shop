import { create } from "zustand";
import { persist } from "zustand/middleware";

const product = [
  {
    id: 1,
    img_url: "https://picsum.photos/seed/lenovo-bag-t210/400/300",
    title: "Сумка для ноутбука Lenovo T210, серый",
    rate: 5,
    price: "1490",
    colors: ["#808080", "#000000", "#1a3a5c"],
    category: "new",
  },
  {
    id: 2,
    img_url: "https://picsum.photos/seed/logitech-mx-master/400/300",
    title: "Беспроводная мышь Logitech MX Master 3",
    rate: 5,
    price: "7990",
    colors: ["#1a1a1a", "#f0f0f0"],
    category: "on_sale",
  },
  {
    id: 3,
    img_url: "https://picsum.photos/seed/keychron-keyboard-k2/400/300",
    title: "Механическая клавиатура Keychron K2",
    rate: 4,
    price: "11500",
    colors: ["#1a1a1a", "#f5f5f0"],
    category: "new",
  },
  {
    id: 4,
    img_url: "https://picsum.photos/seed/ugreen-usbc-hub/400/300",
    title: "USB-C хаб 7-в-1 Ugreen",
    rate: 4,
    price: "3200",
    colors: ["#c0c0c0", "#2c2c2c"],
    category: "on_sale",
  },
  {
    id: 5,
    img_url: "https://picsum.photos/seed/aluminum-laptop-stand/400/300",
    title: "Подставка для ноутбука алюминиевая",
    rate: 5,
    price: "2800",
    colors: ["#c0c0c0", "#2c2c2c", "#d4a76a"],
    category: "new",
  },
  {
    id: 6,
    img_url: "https://picsum.photos/seed/sony-wh1000xm5-headphones/400/300",
    title: "Наушники Sony WH-1000XM5",
    rate: 5,
    price: "23990",
    colors: ["#1a1a1a", "#e8e0d0"],
    category: "on_sale",
  },
  {
    id: 7,
    img_url: "https://picsum.photos/seed/xiaomi-urban-backpack/400/300",
    title: "Городской рюкзак Xiaomi 25L",
    rate: 4,
    price: "4500",
    colors: ["#1a1a1a", "#1e3a5f", "#2d4a1e"],
    category: "new",
  },
  {
    id: 8,
    img_url: "https://picsum.photos/seed/anker-powerbank-20000/400/300",
    title: "Портативная зарядка Anker 20000 mAh",
    rate: 4,
    price: "3900",
    colors: ["#1a1a1a", "#f0f0f0"],
    category: "on_sale",
  },
];

export const useCartStore = create(
  persist(
    (set) => ({
      carts: [],
      product: product,

      addCart: (product) =>
        set((state) => ({
          carts: [...state.carts, product],
        })),
      deleteCart: (id) =>
        set((state) => ({
          carts: state.carts.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "cart-storage",
      partialState: (state) => ({ carts: state.carts }),
    },
  ),
);
