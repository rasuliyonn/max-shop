import { create } from "zustand";
import { persist } from "zustand/middleware";
const product = [
  {
    id: 1,
    img_url: "/public/1.png",
    title: "Сумка для ноутбука Lenovo T210, серый",
    rate: 5,
    price: "120",
    colors: ["black", "red"],
    category: "new",
  },
  {
    id: 2,
    img_url:
      "https://storage.alifshop.tj/media/images/alifshop/20890/sumka-dlya-noutbuka-lenovo-t210-seryy-1707367571944-lg.webp",
    title: "Сумка для ноутбука Lenovo T210, серый",
    rate: 5,
    price: "120",
    colors: ["black", "red"],
    category: "on_sale",
  },
  {
    id: 3,
    img_url:
      "https://storage.alifshop.tj/media/images/alifshop/20890/sumka-dlya-noutbuka-lenovo-t210-seryy-1707367571944-lg.webp",
    title: "Сумка для ноутбука Lenovo T210, серый",
    rate: 5,
    price: "120",
    colors: ["black", "red"],
    category: "new",
  },
  {
    id: 6,
    img_url:
      "https://storage.alifshop.tj/media/images/alifshop/20890/sumka-dlya-noutbuka-lenovo-t210-seryy-1707367571944-lg.webp",
    title: "Сумка для ноутбука Lenovo T210, серый",
    rate: 5,
    price: "120",
    colors: ["black", "red"],
    category: "on_sale",
  },
  {
    id: 7,
    img_url:
      "https://storage.alifshop.tj/media/images/alifshop/20890/sumka-dlya-noutbuka-lenovo-t210-seryy-1707367571944-lg.webp",
    title: "Сумка для ноутбука Lenovo T210, серый",
    rate: 5,
    price: "120",
    colors: ["black", "red"],
    category: "new",
  },
  {
    id: 4,
    img_url:
      "https://storage.alifshop.tj/media/images/alifshop/20890/sumka-dlya-noutbuka-lenovo-t210-seryy-1707367571944-lg.webp",
    title: "Сумка для ноутбука Lenovo T210, серый",
    rate: 5,
    price: "120",
    colors: ["black", "red"],
    category: "on_sale",
  },
];
export const useCartStore = create(
  persist(
    (set) => ({
      carts: [],
      cartsCount: 0,
      colors: [],
      product: product,

      addCart: (product) =>
        set((state) => ({
          carts: [...state.carts, product],
          cartsCount: state.cartsCount + 1,
        })),
      deleteCart: (id) =>
        set((state) => ({
          carts: state.carts.filter((item) => item.id !== id),
          cartsCount: state.cartsCount - 1,
        })),
    }),
    {
      name: "cart-storage",
    },
  ),
);
