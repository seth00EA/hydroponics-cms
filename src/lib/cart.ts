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
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredCartItem[];
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

export function addToCart(item: StoredCartItem) {
  const cart = getStoredCart();
  const existing = cart.find((p) => p.product_id === item.product_id);

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveStoredCart(cart);
}

export function removeFromCart(productId: string) {
  const cart = getStoredCart().filter((item) => item.product_id !== productId);
  saveStoredCart(cart);
}

export function updateCartQuantity(productId: string, quantity: number) {
  const cart = getStoredCart();

  const item = cart.find((p) => p.product_id === productId);
  if (!item) return;

  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  item.quantity = quantity;
  saveStoredCart(cart);
}
export function clearCartAndRedirect(path: string) {
  clearStoredCart();

  if (typeof window !== "undefined") {
    window.location.href = path;
  }
}