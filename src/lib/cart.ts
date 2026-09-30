import type { CartItem, Product } from '@/types';

/**
 * Pure cart operations. Every function returns a new array and never mutates
 * the items it was given, so they are safe to use inside React state updaters
 * (which Strict Mode deliberately runs twice in development).
 */

/** A cart line is one product in one colour finish. */
export function getCartLineKey(item: CartItem): string {
  return `${item.product.id}::${item.selectedColor ?? item.product.color}`;
}

export function addCartItem(
  cart: CartItem[],
  product: Product,
  quantity = 1,
  selectedColor?: string
): CartItem[] {
  const newItem: CartItem = {
    product,
    quantity,
    selectedColor: selectedColor || product.color,
  };
  const key = getCartLineKey(newItem);
  const existingIndex = cart.findIndex((item) => getCartLineKey(item) === key);

  if (existingIndex === -1) {
    return [...cart, newItem];
  }

  return cart.map((item, index) =>
    index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
  );
}

export function updateCartItemQuantity(
  cart: CartItem[],
  lineKey: string,
  delta: number
): CartItem[] {
  return cart.flatMap((item) => {
    if (getCartLineKey(item) !== lineKey) return [item];
    const quantity = item.quantity + delta;
    return quantity > 0 ? [{ ...item, quantity }] : [];
  });
}

export function removeCartItem(cart: CartItem[], lineKey: string): CartItem[] {
  return cart.filter((item) => getCartLineKey(item) !== lineKey);
}

export function getCartCount(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
}
