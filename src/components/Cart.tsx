import { useState } from 'react';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useAppState } from '../context/AppContext';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, updateCartItemQuantity, getCartTotal, getCartItemCount, clearCart, addOrder } = useAppState();
  
  const { subtotal, tax, delivery, total } = getCartTotal();
  const itemCount = getCartItemCount();

  const handleCheckout = () => {
    if (cart.items.length === 0) return;
    
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      items: cart.items.map(item => `${item.name} x${item.quantity}`),
      total,
      status: 'preparing' as const,
      restaurant: cart.restaurantName || 'Quick Breakfast',
      cartItems: cart.items
    };
    
    addOrder(order);
    clearCart();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <FaShoppingCart className="text-2xl text-gray-700" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Your Cart</h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {cart.items.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Your cart is empty
              </div>
            ) : (
              cart.items.map((item) => (
                <div key={item.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      {item.customizations && (
                        <p className="text-sm text-gray-500 mt-1">
                          {item.customizations.join(', ')}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="text-sm font-medium px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto p-1 hover:bg-red-100 rounded text-red-500"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </div>
                    <p className="font-medium ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))
            )}
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
                <span>${delivery.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={cart.items.length === 0}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}