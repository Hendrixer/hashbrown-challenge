export type OrderStatus =
  | 'pending' // Order received, waiting to be processed
  | 'confirmed' // Order confirmed by restaurant
  | 'preparing' // Food is being prepared
  | 'ready' // Food is ready for pickup
  | 'dispatched' // Driver has picked up the order
  | 'on-the-way' // Order is on the way to customer
  | 'arriving' // Driver is very close to destination
  | 'delivered' // Order has been delivered
  | 'cancelled' // Order was cancelled
  | 'failed' // Delivery attempt failed
  | 'refunded' // Order was refunded

export const ORDER_STATUS_MESSAGES: Record<OrderStatus, string> = {
  pending: 'Your order has been received and is being processed',
  confirmed: 'Your order has been confirmed by the restaurant',
  preparing: 'Your order is being prepared by the restaurant',
  ready: 'Your order is ready for pickup',
  dispatched: 'Your driver has picked up your order',
  'on-the-way': 'Your driver is on the way!',
  arriving: 'Your driver is arriving soon!',
  delivered: 'Your order has been delivered',
  cancelled: 'Your order has been cancelled',
  failed: 'Delivery attempt failed - please contact support',
  refunded: 'Your order has been refunded',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'text-orange-700 bg-orange-50 border-orange-200',
  confirmed: 'text-blue-700 bg-blue-50 border-blue-200',
  preparing: 'text-yellow-700 bg-yellow-50 border-yellow-200',
  ready: 'text-purple-700 bg-purple-50 border-purple-200',
  dispatched: 'text-indigo-700 bg-indigo-50 border-indigo-200',
  'on-the-way': 'text-blue-700 bg-blue-50 border-blue-200',
  arriving: 'text-green-700 bg-green-50 border-green-200',
  delivered: 'text-green-700 bg-green-50 border-green-200',
  cancelled: 'text-red-700 bg-red-50 border-red-200',
  failed: 'text-red-700 bg-red-50 border-red-200',
  refunded: 'text-gray-700 bg-gray-50 border-gray-200',
}

export const ORDER_STATUS_ICONS: Record<OrderStatus, string> = {
  pending: '⏳',
  confirmed: '✅',
  preparing: '👨‍🍳',
  ready: '🔔',
  dispatched: '📦',
  'on-the-way': '🚗',
  arriving: '🏃‍♂️',
  delivered: '✅',
  cancelled: '❌',
  failed: '⚠️',
  refunded: '💰',
}
