export interface Product {
  id: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  rating?: number;
  image: string;
  category?: string;
  description?: string;
  books?: [];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubTotal: () => number;
  getItemCount: () => number;
}
