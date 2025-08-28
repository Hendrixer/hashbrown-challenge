import { useTool } from '@hashbrownai/react'
import { s } from '@hashbrownai/core'
import { useAppState } from './context/AppContext'
import type { CartItem } from './utils/localStorage'
import { portlandBreakfastRestaurants } from './data/restaurants'

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
      id: s.string('Menu item ID from restaurant data'),
      name: s.string('Name of the item'),
      description: s.anyOf([s.string('Description of the item'), s.nullish()]),
      price: s.number('Price of the item'),
      category: s.anyOf([s.string('Category of the item'), s.nullish()]),
      quantity: s.anyOf([s.number('Quantity to add'), s.nullish()]),
      customizations: s.anyOf([
        s.array('customizations', s.string('customization')),
        s.nullish(),
      ]),
    }),
    handler: async ({
      id,
      name,
      description,
      price,
      category,
      quantity,
      customizations,
    }) => {
      const item: CartItem = {
        id: `cart-${id}-${Date.now()}`,
        menuItemId: id,
        name,
        description,
        price,
        category,
        quantity: quantity || 1,
        customizations: customizations || [],
      }
      addToCart(item)
      return `Added ${quantity || 1} x ${name} to cart`
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

      // Try to determine restaurant from cart items
      let orderRestaurant =
        restaurantName || cart.restaurantName || 'Quick Breakfast'

      if (!restaurantName && cart.items[0]?.menuItemId) {
        const menuItemId = cart.items[0].menuItemId
        const restaurant = portlandBreakfastRestaurants.find((r) =>
          r.menuItems.some((item) => item.id === menuItemId)
        )
        if (restaurant) {
          orderRestaurant = restaurant.name
        }
      }

      const { total } = getCartTotal()
      const order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        items: cart.items.map((item) => `${item.name} x${item.quantity}`),
        total,
        status: 'preparing' as const,
        restaurant: orderRestaurant,
        cartItems: cart.items,
        deliveryAddress,
      }

      addOrder(order)
      clearCart()
      return `Order ${order.id} placed successfully! Total: $${total.toFixed(
        2
      )}. Delivery to: ${deliveryAddress}. Restaurant: ${orderRestaurant}`
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

  const getOrderStatus = useTool({
    name: 'getOrderStatus',
    description: 'Use this tool if a user asks about the status of their order',
    schema: s.object('orderStatus', {
      orderId: s.string('the unique ID of the order'),
    }),
    handler: async () => {
      return {
        start: [45.5122, -122.6587],
        destination: [45.5289, -122.6984],
        status: 'in-progress',
      }
    },
    deps: [],
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

  const browseRestaurantsTool = useTool({
    name: 'browseRestaurants',
    description:
      'Browse available restaurants with optional filtering by rating, price level, or location',
    schema: s.object('browseRestaurantsInput', {
      minRating: s.anyOf([s.number('Minimum rating (1-5)'), s.nullish()]),
      maxPriceLevel: s.anyOf([
        s.number('Maximum price level (1-4, where 1=$ and 4=$$$$)'),
        s.nullish(),
      ]),
      limit: s.anyOf([
        s.number('Maximum number of restaurants to return'),
        s.nullish(),
      ]),
    }),
    handler: async ({ minRating, maxPriceLevel, limit }) => {
      let filteredRestaurants = portlandBreakfastRestaurants

      if (minRating) {
        filteredRestaurants = filteredRestaurants.filter(
          (r) => r.rating >= minRating
        )
      }

      if (maxPriceLevel) {
        filteredRestaurants = filteredRestaurants.filter(
          (r) => r.priceLevel <= maxPriceLevel
        )
      }

      const restaurants = filteredRestaurants
        .slice(0, limit || 10)
        .map((r) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          rating: r.rating,
          priceLevel: '$'.repeat(r.priceLevel),
          address: r.address,
          phone: r.phone,
        }))

      return `Found ${restaurants.length} restaurants:\n\n${restaurants
        .map(
          (r) =>
            `${r.id}. **${r.name}** (${r.rating}⭐, ${r.priceLevel})\n   ${r.description}\n   📍 ${r.address}\n   📞 ${r.phone}`
        )
        .join('\n\n')}`
    },
    deps: [],
  })

  const getRestaurantMenuTool = useTool({
    name: 'getRestaurantMenu',
    description: 'Get the full menu for a specific restaurant by ID',
    schema: s.object('getRestaurantMenuInput', {
      restaurantId: s.number('The restaurant ID'),
      category: s.anyOf([
        s.string(
          'Optional category filter: Pancakes & Waffles, Eggs & Benedicts, Pastries & Baked Goods, Sandwiches & Wraps, Beverages, Sides'
        ),
        s.nullish(),
      ]),
    }),
    handler: async ({ restaurantId, category }) => {
      const restaurant = portlandBreakfastRestaurants.find(
        (r) => r.id === restaurantId
      )

      if (!restaurant) {
        return `Restaurant with ID ${restaurantId} not found`
      }

      let menuItems = restaurant.menuItems
      if (category) {
        menuItems = menuItems.filter((item) => item.category === category)
      }

      const menu = menuItems
        .map(
          (item) =>
            `**${item.name}** - $${item.price.toFixed(2)}\n   ID: ${
              item.id
            } | Category: ${item.category}\n   ${item.description}`
        )
        .join('\n\n')

      return `**${restaurant.name}** Menu${
        category ? ` - ${category}` : ''
      }:\n\n${menu}`
    },
    deps: [],
  })

  const searchMenuItemsTool = useTool({
    name: 'searchMenuItems',
    description:
      'Search for menu items across all restaurants by name or description',
    schema: s.object('searchMenuItemsInput', {
      query: s.string('Search query for menu item name or description'),
      maxPrice: s.anyOf([s.number('Maximum price filter'), s.nullish()]),
      category: s.anyOf([s.string('Category filter'), s.nullish()]),
      limit: s.anyOf([
        s.number('Maximum number of items to return'),
        s.nullish(),
      ]),
    }),
    handler: async ({ query, maxPrice, category, limit }) => {
      const allItems = portlandBreakfastRestaurants.flatMap((restaurant) =>
        restaurant.menuItems.map((item) => ({
          ...item,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          restaurantRating: restaurant.rating,
          restaurantPriceLevel: restaurant.priceLevel,
        }))
      )

      let filteredItems = allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )

      if (maxPrice) {
        filteredItems = filteredItems.filter((item) => item.price <= maxPrice)
      }

      if (category) {
        filteredItems = filteredItems.filter(
          (item) => item.category === category
        )
      }

      const results = filteredItems
        .slice(0, limit || 10)
        .map(
          (item) =>
            `**${item.name}** - $${item.price.toFixed(2)}\n   ID: ${
              item.id
            } | From: ${item.restaurantName} (${
              item.restaurantRating
            }⭐)\n   Category: ${item.category}\n   ${item.description}`
        )
        .join('\n\n')

      return filteredItems.length > 0
        ? `Found ${filteredItems.length} items matching "${query}":\n\n${results}`
        : `No menu items found matching "${query}"`
    },
    deps: [],
  })

  return [
    getOrderStatus,
    browseRestaurantsTool,
    getRestaurantMenuTool,
    searchMenuItemsTool,
    addToCartTool,
    removeFromCartTool,
    updateQuantityTool,
    placeOrderTool,
    trackOrderTool,
    getCartStatusTool,
    clearCartTool,
  ]
}
