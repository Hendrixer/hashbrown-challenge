import { useTool } from '@hashbrownai/react'
import { s } from '@hashbrownai/core'
import { useAppState } from './context/AppContext'
import type { CartItem, } from './utils/localStorage'
import type { OrderStatus } from './types/orderStatus'
import { portlandBreakfastRestaurants } from './data/restaurants'
import { fakeOrders } from './data/orders'
import OrderDetails from './components/OrderDetails'

export const useChatTools = () => {
  const {
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    addOrder,
    cart,
    getCartTotal,
  } = useAppState()

  const addToCartTool = useTool({
    name: 'addToCart',
    description: 'Add an item to the shopping cart',
    schema: s.object('addToCartInput', {
      id: s.string('Menu item ID from restaurant data'),
      name: s.string('Name of the item'),
      description: s.string('Description of the item'),
      price: s.number('Price of the item'),
      category: s.string('Category of the item'),
      quantity: s.number('Quantity to add'),
      customizations: s.array('customizations', s.string('customization')),
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
        status: 'preparing' as OrderStatus,
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

  // const trackOrderTool = useTool({
  //   name: 'trackOrder',
  //   description: 'Track the status of an order',
  //   schema: s.object('trackOrderInput', {
  //     orderId: s.string('Order ID to track'),
  //   }),
  //   handler: async ({ orderId }) => {
  //     const order = orders.find((o) => o.id === orderId)
  //     if (!order) {
  //       return `Order ${orderId} not found`
  //     }

  //     const statusMessages = {
  //       preparing: 'Your order is being prepared by the restaurant',
  //       'on-the-way': 'Your order is on the way',
  //       delivered: 'Your order has been delivered',
  //       cancelled: 'Your order has been cancelled',
  //     }

  //     return `Order ${orderId} from ${order.restaurant}: ${
  //       statusMessages[order.status]
  //     }. Items: ${order.items.join(', ')}. Total: $${order.total.toFixed(2)}`
  //   },
  //   deps: [orders],
  // })

  const getOrderStatus = useTool({
    name: 'getOrderStatus',
    description:
      'Use this tool if a user asks about the status of their order. Shows OrderDetails component if there is an order.  Shows map component only if order status is dispatched, on-the-way, arriving, or delivered.',
    schema: s.object('orderStatus', {
      orderId: s.anyOf([s.number('the unique ID of the order'), s.nullish()]),
    }),
    handler: async ({ orderId }) => {
      // Find the order from fake orders data
      const order = orderId
        ? fakeOrders.find((o) => o.orderId === orderId)
        : undefined

      if (!order) {
        return `No order found${
          orderId ? ` with ID ${orderId}` : ''
        }. Please place an order first.`
      }

      const showMapStatuses: OrderStatus[] = [
        'dispatched',
        'on-the-way',
        'arriving',
        'delivered',
      ]

      // Check if the order status warrants showing the map
      if (showMapStatuses.includes(order.status)) {
        // Return data that can be used by the map component
        return {
          orderId: order.orderId,
          status: order.status,
          restaurant: order.restaurantName,
          start: [
            order.restaurantLocation.pointA,
            order.restaurantLocation.pointB,
          ], // Restaurant location
          destination: [
            order.destinationLocation.pointA,
            order.destinationLocation.pointB,
          ], // Delivery location
          message: `Order ${order.orderId} from ${order.restaurantName} is ${order.status}. You can track its progress on the map.`,
        }
      } else {
        // For earlier statuses, just return a text message
        const statusMessages: Record<OrderStatus, string> = {
          pending: 'Your order has been received and is being processed',
          confirmed: 'Your order has been confirmed by the restaurant',
          preparing: 'Your order is being prepared by the restaurant',
          ready: 'Your order is ready for pickup',
          dispatched:
            'Your driver has picked up your order and will be on the way soon',
          'on-the-way': 'Your driver is on the way!',
          arriving: 'Your driver is arriving soon!',
          delivered: 'Your order has been delivered',
          cancelled: 'Your order has been cancelled',
          failed: 'Delivery attempt failed - please contact support',
          refunded: 'Your order has been refunded',
        }

        const itemsList = order.orderItems
          .map((item) => `${item.name} x${item.quantity}`)
          .join(', ')
        return `Order ${order.orderId} from ${order.restaurantName}: ${
          statusMessages[order.status]
        }. Items: ${itemsList}. Total: $${order.totalAmount.toFixed(2)}`
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
    description: 'Get a list of restaurants',
    schema: s.object('browseRestaurantsInput', {
      minRating: s.number('Minimum rating (1-5)'),
      maxPriceLevel: s.number(
        'Maximum price level (1-4, where 1=$ and 4=$$$$)'
      ),
      limit: s.number('Maximum number of restaurants to return'),
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
      const restaurants = filteredRestaurants.slice(0, limit || 20)
      return restaurants
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
      maxPrice: s.number('Maximum price filter'),
      category: s.string('Category filter'),
      limit: s.number('Maximum number of items to return'),
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

  const tripDurationTool = useTool({
    name: 'getTripDuration',
    description:
      'Get the driving duration and distance between two points using the OrderDetails component. This component shows the estimated time and distance for a trip by car.',
    schema: s.object('getTripDurationInput', {
      pointA: s.object('pointA', {
        lat: s.number('Latitude of the starting point'),
        long: s.number('Longitude of the starting point'),
      }),
      pointB: s.object('pointB', {
        lat: s.number('Latitude of the destination point'),
        long: s.number('Longitude of the destination point'),
      }),
    }),
    handler: async ({ pointA, pointB }) => {
      return {
        component: OrderDetails,
        props: { pointA, pointB },
      }
    },
    deps: [],
  })

  const trackOrderStatusTool = useTool({
    name: 'trackOrderStatus',
    description:
      'Track order status with delivery location details. Use this when users ask about their order status, delivery tracking, or where their order is.',
    schema: s.object('trackOrderStatusInput', {
      orderId: s.anyOf([s.string('Order ID to track'), s.nullish()]),
    }),
    handler: async ({ orderId }) => {
      // For now, return mock data with Portland restaurant locations
      // In a real app, you would look up the actual order details from a database

      // Sample restaurant location (Rose City Morning from restaurants data)
      const startLocation = {
        lat: 45.5122,
        long: -122.6587,
      }

      // Sample delivery location (somewhere in Portland)
      const destinationLocation = {
        lat: 45.5289,
        long: -122.6984,
      }

      return {
        startLatitude: startLocation.lat,
        startLongitude: startLocation.long,
        destinationLatitude: destinationLocation.lat,
        destinationLongitude: destinationLocation.long,
        status: 'on-the-way' as OrderStatus,
        orderId: orderId || 'ORD-123456',
        message: `Order ${orderId} is currently on-the-way. Your driver is on the way!`,
      }
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
    getCartStatusTool,
    clearCartTool,
    tripDurationTool,
    trackOrderStatusTool,
  ]
}
