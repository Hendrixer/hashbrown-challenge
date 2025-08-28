import type { OrderStatus } from '../types/orderStatus';
import { portlandBreakfastRestaurants } from './restaurants';

export interface OrderLocation {
  pointA: number;
  pointB: number;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  orderId: number;
  restaurantName: string;
  restaurantLocation: OrderLocation;
  destinationLocation: OrderLocation;
  userName: string;
  orderItems: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  orderTime: string;
}

// Helper function to get random item from array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to generate random coordinates within Portland area
function generatePortlandCoordinates(): OrderLocation {
  // Portland area bounds (approximate)
  const minLat = 45.45;
  const maxLat = 45.65;
  const minLng = -122.8;
  const maxLng = -122.5;
  
  return {
    pointA: minLat + Math.random() * (maxLat - minLat),
    pointB: minLng + Math.random() * (maxLng - minLng)
  };
}

// Sample user names
const userNames = [
  'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim', 'Jessica Brown',
  'James Wilson', 'Ashley Davis', 'Christopher Lee', 'Amanda Taylor', 'Daniel Martinez',
  'Stephanie Anderson', 'Ryan Thompson', 'Lauren Garcia', 'Kevin White', 'Megan Clark',
  'Brandon Lewis', 'Rachel Walker', 'Justin Hall', 'Samantha Allen', 'Tyler Young',
  'Nicole King', 'Jordan Wright', 'Brittany Hill', 'Zachary Scott', 'Alexis Green',
  'Mason Adams', 'Kayla Baker', 'Logan Nelson', 'Victoria Carter', 'Ethan Mitchell',
  'Olivia Perez', 'Caleb Roberts', 'Hannah Turner', 'Isaac Phillips', 'Grace Campbell',
  'Nathan Parker', 'Chloe Evans', 'Ian Edwards', 'Sophia Collins', 'Gavin Stewart',
  'Ava Sanchez', 'Connor Morris', 'Lily Rogers', 'Hunter Reed', 'Natalie Cook',
  'Blake Morgan', 'Zoe Bailey', 'Carson Rivera', 'Maya Cooper', 'Tristan Richardson'
];

// Order statuses with weights for realistic distribution
const statusPool: OrderStatus[] = [
  'delivered', 'delivered', 'delivered', 'delivered', 'delivered', 'delivered', 'delivered',
  'on-the-way', 'on-the-way', 'on-the-way',
  'preparing', 'preparing', 'preparing',
  'confirmed', 'confirmed',
  'dispatched', 'dispatched',
  'arriving', 'arriving',
  'ready',
  'pending',
  'cancelled',
  'failed',
  'refunded'
];

export const fakeOrders: Order[] = Array.from({ length: 100 }, (_, index) => {
  const restaurant = getRandomItem(portlandBreakfastRestaurants);
  const userName = getRandomItem(userNames);
  
  const numItems = Math.floor(Math.random() * 4) + 1;
  const orderItems: OrderItem[] = [];
  
  for (let i = 0; i < numItems; i++) {
    const menuItem = getRandomItem(restaurant.menuItems);
    const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 quantity
    
    orderItems.push({
      menuItemId: menuItem.id,
      name: menuItem.name,
      quantity,
      price: menuItem.price
    });
  }
  
  // Calculate total amount
  const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Generate order time (within last 30 days)
  const orderTime = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
  
  return {
    orderId: index + 1,
    restaurantName: restaurant.name,
    restaurantLocation: {
      pointA: restaurant.latitude,
      pointB: restaurant.longitude
    },
    destinationLocation: generatePortlandCoordinates(),
    userName,
    orderItems,
    status: getRandomItem(statusPool),
    totalAmount: Math.round(totalAmount * 100) / 100,
    orderTime
  };
});

export default fakeOrders;