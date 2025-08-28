import { useTool } from '@hashbrownai/react'
import React from 'react'
import MapComponent from './components/Map/MapComponent'
import { s } from '@hashbrownai/core'
import { useAppState } from './context/AppContext'
import type { CartItem } from './utils/localStorage'

export const useChatTools = () => {
  const {
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    addOrder,
    orders,
    cart,
    getCartTotal,
  } = useAppState()

  const addToCartTool = useTool({
    name: 'addToCart',
    description: 'Add an item to the shopping cart',
    schema: s.object('addToCartInput', {
      name: s.string('Name of the item'),
      price: s.number('Price of the item'),
      quantity: s.anyOf([s.number('Quantity to add'), s.nullish()]),
      customizations: s.anyOf([
        s.array('customizations', s.string('customization')),
        s.nullish(),
      ]),
    }),
    handler: async ({ name, price, quantity, customizations }) => {
      const item: CartItem = {
        id: `item-${Date.now()}-${Math.random()}`,
        name,
        price,
        quantity: quantity || 1,
        customizations: customizations || [],
      }
      addToCart(item)
      return `Added ${quantity} x ${name} to cart`
    },
    deps: [addToCart],
  })

  const removeFromCartTool = useTool({
    name: 'removeFromCart',
    description: 'Remove an item from the cart',
    schema: s.object('removeFromCartInput', {
      itemId: s.string('ID of the item to remove'),
    }),
    handler: async ({ itemId }) => {
      const item = cart.items.find((i) => i.id === itemId)
      if (!item) return 'Item not found in cart'
      removeFromCart(itemId)
      return `Removed ${item.name} from cart`
    },
    deps: [removeFromCart, cart],
  })

  const updateQuantityTool = useTool({
    name: 'updateQuantity',
    description: 'Update the quantity of an item in the cart',
    schema: s.object('updateQuantityInput', {
      itemId: s.string('ID of the item'),
      newQuantity: s.number('New quantity'),
    }),
    handler: async ({ itemId, newQuantity }) => {
      const item = cart.items.find((i) => i.id === itemId)
      if (!item) return 'Item not found in cart'
      if (newQuantity <= 0) {
        removeFromCart(itemId)
        return `Removed ${item.name} from cart`
      }
      updateCartItemQuantity(itemId, newQuantity)
      return `Updated ${item.name} quantity to ${newQuantity}`
    },
    deps: [updateCartItemQuantity, removeFromCart, cart],
  })

  const placeOrderTool = useTool({
    name: 'placeOrder',
    description: 'Place an order with the current cart items',
    schema: s.object('placeOrderInput', {
      deliveryAddress: s.string('Delivery address'),
      restaurantName: s.anyOf([s.string('Restaurant name'), s.nullish()]),
    }),
    handler: async ({ deliveryAddress, restaurantName }) => {
      if (cart.items.length === 0) {
        return 'Cannot place order - cart is empty'
      }

      const { total } = getCartTotal()
      const order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        items: cart.items.map((item) => `${item.name} x${item.quantity}`),
        total,
        status: 'preparing' as const,
        restaurant: restaurantName || 'Quick Breakfast',
        cartItems: cart.items,
        deliveryAddress,
      }

      addOrder(order)
      clearCart()
      return `Order ${order.id} placed successfully! Total: $${total.toFixed(
        2
      )}. Delivery to: ${deliveryAddress}`
    },
    deps: [cart, addOrder, clearCart, getCartTotal],
  })

  const trackOrderTool = useTool({
    name: 'trackOrder',
    description: 'Track the status of an order',
    schema: s.object('trackOrderInput', {
      orderId: s.string('Order ID to track'),
    }),
    handler: async ({ orderId }) => {
      const order = orders.find((o) => o.id === orderId)
      if (!order) {
        return `Order ${orderId} not found`
      }

      const statusMessages = {
        preparing: 'Your order is being prepared by the restaurant',
        'in-progress': 'Your order is on the way',
        delivered: 'Your order has been delivered',
        cancelled: 'Your order has been cancelled',
      }

      return `Order ${orderId} from ${order.restaurant}: ${
        statusMessages[order.status]
      }. Items: ${order.items.join(', ')}. Total: $${order.total.toFixed(2)}`
    },
    deps: [orders],
  })

  const getCartStatusTool = useTool({
    name: 'getCartStatus',
    description: 'Get the current status of the shopping cart',
    schema: s.object('getCartStatusInput', {}),
    handler: async () => {
      if (cart.items.length === 0) {
        return 'Your cart is empty'
      }

      const { subtotal, tax, delivery, total } = getCartTotal()
      const itemsList = cart.items
        .map(
          (item) =>
            `${item.name} x${item.quantity} - $${(
              item.price * item.quantity
            ).toFixed(2)}`
        )
        .join('\n')

      return `Cart contents:\n${itemsList}\n\nSubtotal: $${subtotal.toFixed(
        2
      )}\nTax: $${tax.toFixed(2)}\nDelivery: $${delivery.toFixed(
        2
      )}\nTotal: $${total.toFixed(2)}`
    },
    deps: [cart, getCartTotal],
  })

  const clearCartTool = useTool({
    name: 'clearCart',
    description: 'Clear all items from the cart',
    schema: s.object('clearCartInput', {}),
    handler: async () => {
      const itemCount = cart.items.length
      if (itemCount === 0) {
        return 'Cart is already empty'
      }
      clearCart()
      return `Cleared ${itemCount} items from cart`
    },
    deps: [cart, clearCart],
  })

  const showOrderStatus = useTool({
    name: 'showOrderStatus',
    description: 'Show the users order status with delivery route map when they ask about their order status or delivery tracking',
    handler: async () => {
      return React.createElement(MapComponent)
    },
    deps: [],
  })

  return [
    addToCartTool,
    removeFromCartTool,
    updateQuantityTool,
    placeOrderTool,
    trackOrderTool,
    getCartStatusTool,
    clearCartTool,
    showOrderStatus,
  ]
}
