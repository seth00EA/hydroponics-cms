export type StoredCartItem = {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
};

export const CART_STORAGE_KEY = "hydroponics_cart";

export function getStoredCart(): StoredCartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!rawCart) return [];
    return JSON.parse(rawCart) as StoredCartItem[];
  } catch {
    return [];
  }
}

export function saveStoredCart(items: StoredCartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function clearStoredCart() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CART_STORAGE_KEY);
}
