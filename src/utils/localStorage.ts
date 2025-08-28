export class LocalStorageManager<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  get(): T | null {
    try {
      const item = localStorage.getItem(this.key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage key "${this.key}":`, error);
      return null;
    }
  }

  put(value: T): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key "${this.key}":`, error);
    }
  }

  replace(value: T): void {
    this.put(value);
  }

  remove(): void {
    try {
      localStorage.removeItem(this.key);
    } catch (error) {
      console.error(`Error removing localStorage key "${this.key}":`, error);
    }
  }

  exists(): boolean {
    return localStorage.getItem(this.key) !== null;
  }
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: string[];
  image?: string;
}

export interface CartData {
  items: CartItem[];
  restaurantId?: string;
  restaurantName?: string;
}

export interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: 'delivered' | 'cancelled' | 'in-progress' | 'preparing';
  restaurant: string;
  cartItems?: CartItem[];
}

export const storage = {
  cart: new LocalStorageManager<CartData>('breakfast_cart'),
  orders: new LocalStorageManager<Order[]>('breakfast_orders'),
};