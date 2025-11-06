import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  const taxRate = 0.05;
  const tax = cartTotal * taxRate;
  const total = cartTotal + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingCart className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/"
              className="inline-block bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-gray-900 font-bold px-8 py-3 rounded transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-card border border-border rounded-lg divide-y divide-border">
              {cart.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-32 h-32 object-contain bg-white rounded"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-lg font-semibold text-foreground hover:text-[hsl(var(--accent))] transition-colors mb-2 block"
                      >
                        {item.title}
                      </Link>
                      
                      <p className="text-[hsl(var(--success-green))] text-sm font-semibold mb-4">
                        In Stock
                      </p>

                      <div className="flex flex-wrap items-center gap-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2 border border-border rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-2 text-sm text-[hsl(var(--sale-red))] hover:underline"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ₹{item.price.toFixed(2)} each
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span className="font-semibold">₹{cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated tax (5%)</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold text-[hsl(var(--success-green))]">FREE</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Order total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <Link to="/checkout">
                <button className="w-full bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-gray-900 font-bold py-3 px-6 rounded-full transition-colors mb-3">
                  Proceed to Checkout
                </button>
              </Link>

              <div className="text-center">
                <Link
                  to="/"
                  className="text-sm text-[hsl(var(--prime-blue))] hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="bg-[hsl(var(--prime-blue))]/10 border border-[hsl(var(--prime-blue))]/30 rounded p-4">
                  <p className="text-sm font-semibold text-[hsl(var(--prime-blue))] mb-1">
                    FREE Delivery
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your order qualifies for FREE delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
