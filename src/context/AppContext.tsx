import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import {
  storage,
  type CartData,
  type CartItem,
  type Order,
} from '../utils/localStorage'

interface AppState {
  cart: CartData
  orders: Order[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateCartItemQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  getCartTotal: () => {
    subtotal: number
    tax: number
    delivery: number
    total: number
  }
  getCartItemCount: () => number
}

const AppContext = createContext<AppState | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartData>(() => {
    const savedCart = storage.cart.get()
    return savedCart || { items: [] }
  })

  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = storage.orders.get()
    return savedOrders || []
  })

  useEffect(() => {
    storage.cart.put(cart)
  }, [cart])

  useEffect(() => {
    storage.orders.put(orders)
  }, [orders])

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((i) => i.id === item.id)

      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        }
      }

      return {
        ...prevCart,
        items: [...prevCart.items, item],
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.id !== itemId),
    }))
  }

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }))
  }

  const clearCart = () => {
    setCart({ items: [] })
  }

  const addOrder = (order: Order) => {
    setOrders((prevOrders) => [order, ...prevOrders])
  }

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    )
  }

  const getCartTotal = () => {
    const subtotal = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
    const tax = subtotal * 0.08
    const delivery = cart.items.length > 0 ? 3.99 : 0
    const total = subtotal + tax + delivery

    return { subtotal, tax, delivery, total }
  }

  const getCartItemCount = () => {
    return cart.items.reduce((acc, item) => acc + item.quantity, 0)
  }

  const value: AppState = {
    cart,
    orders,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    addOrder,
    updateOrderStatus,
    getCartTotal,
    getCartItemCount,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppState() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppState must be used within AppProvider')
  }
  return context
}
