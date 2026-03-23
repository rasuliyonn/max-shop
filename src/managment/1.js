import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartC: 0,
  carts: [],
  addC: (product) =>
    set((state) => ({
      carts: [...state.carts, product],
      cartC: state.cartC + 1,
    })),
}));

import { useCartStore } from "./useBasket";

const state = useCartStore((state) => state);
const addCart = useCartStore((state) => state.addC);
