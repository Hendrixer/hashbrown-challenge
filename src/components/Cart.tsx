import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: string[];
}

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  
  const mockCartItems: CartItem[] = [
    { id: '1', name: 'Pancakes', price: 8.99, quantity: 2, customizations: ['Extra syrup'] },
    { id: '2', name: 'Coffee', price: 3.49, quantity: 1 },
    { id: '3', name: 'Bacon & Eggs', price: 12.99, quantity: 1, customizations: ['Over easy', 'Crispy bacon'] }
  ];

  const subtotal = mockCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax + 3.99;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <FaShoppingCart className="text-2xl text-gray-700" />
        {mockCartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {mockCartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Your Cart</h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {mockCartItems.map((item) => (
              <div key={item.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    {item.customizations && (
                      <p className="text-sm text-gray-500 mt-1">
                        {item.customizations.join(', ')}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>$3.99</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}