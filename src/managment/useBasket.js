import { create } from "zustand";
import { persist } from "zustand/middleware";
import products from "../conts/products";

export const useCartStore = create(
  persist(
    (set) => ({
      carts: [],
      product: products,

      addCart: (product) =>
        set((state) => {
          const existing = state.carts.find(
            (item) => item.id === product.id && item.color === product.color
          );
          if (existing) {
            return {
              carts: state.carts.map((item) =>
                item.id === product.id && item.color === product.color
                  ? { ...item, quantity: (item.quantity || 1) + 1 }
                  : item
              ),
            };
          }
          return { carts: [...state.carts, { ...product, quantity: 1 }] };
        }),
      increaseQty: (id, color) =>
        set((state) => ({
          carts: state.carts.map((item) =>
            item.id === id && item.color === color
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        })),
      decreaseQty: (id, color) =>
        set((state) => {
          const item = state.carts.find(
            (i) => i.id === id && i.color === color
          );
          if (item && (item.quantity || 1) <= 1) {
            return {
              carts: state.carts.filter(
                (i) => !(i.id === id && i.color === color)
              ),
            };
          }
          return {
            carts: state.carts.map((i) =>
              i.id === id && i.color === color
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          };
        }),
      deleteCart: (id, color) =>
        set((state) => ({
          carts: state.carts.filter(
            (item) => !(item.id === id && item.color === color)
          ),
        })),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ carts: state.carts }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState || {}),
        product: products,
      }),
    },
  ),
);
