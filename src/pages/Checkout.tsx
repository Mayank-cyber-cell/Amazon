import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Check, CreditCard, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

const shippingSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
  });

  if (cart.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  const taxRate = 0.05;
  const tax = cartTotal * taxRate;
  const shipping = 0;
  const total = cartTotal + tax + shipping;

  const onShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setStep(2);
  };

  const handlePaymentNext = () => {
    setStep(3);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setStep(4);
    toast.success('Order placed successfully!');
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  const steps = [
    { number: 1, title: 'Shipping', icon: MapPin },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Review', icon: Package },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {step < 4 && (
          <>
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {steps.map((s, idx) => (
                  <div key={s.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                          step >= s.number
                            ? 'bg-[hsl(var(--accent))] border-[hsl(var(--accent))] text-gray-900'
                            : 'border-border text-muted-foreground'
                        }`}
                      >
                        {step > s.number ? (
                          <Check className="h-6 w-6" />
                        ) : (
                          <s.icon className="h-6 w-6" />
                        )}
                      </div>
                      <span className="text-xs mt-2 font-semibold">{s.title}</span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 transition-colors ${
                          step > s.number ? 'bg-[hsl(var(--accent))]' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                <form onSubmit={handleSubmit(onShippingSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      {...register('fullName')}
                      className={errors.fullName ? 'border-destructive' : ''}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      {...register('address')}
                      className={errors.address ? 'border-destructive' : ''}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        {...register('city')}
                        className={errors.city ? 'border-destructive' : ''}
                      />
                      {errors.city && (
                        <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        {...register('state')}
                        className={errors.state ? 'border-destructive' : ''}
                      />
                      {errors.state && (
                        <p className="text-sm text-destructive mt-1">{errors.state.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        {...register('zipCode')}
                        className={errors.zipCode ? 'border-destructive' : ''}
                      />
                      {errors.zipCode && (
                        <p className="text-sm text-destructive mt-1">{errors.zipCode.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        {...register('phone')}
                        className={errors.phone ? 'border-destructive' : ''}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Continue to Payment
                  </Button>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <div className="font-semibold">Credit or Debit Card</div>
                            <div className="text-sm text-muted-foreground">
                              Visa, Mastercard, American Express
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        <div className="font-semibold">PayPal</div>
                        <div className="text-sm text-muted-foreground">
                          Pay with your PayPal account
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Cash on Delivery</div>
                        <div className="text-sm text-muted-foreground">
                          Pay when you receive your order
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handlePaymentNext} className="flex-1">
                    Continue to Review
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <div className="space-y-6">
                {/* Shipping Info */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Shipping Address</h2>
                    <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                      Edit
                    </Button>
                  </div>
                  <div className="text-sm space-y-1">
                    <p className="font-semibold">{shippingData?.fullName}</p>
                    <p>{shippingData?.address}</p>
                    <p>
                      {shippingData?.city}, {shippingData?.state} {shippingData?.zipCode}
                    </p>
                    <p>{shippingData?.phone}</p>
                    <p>{shippingData?.email}</p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Payment Method</h2>
                    <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                      Edit
                    </Button>
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold capitalize">{paymentMethod.replace('cod', 'Cash on Delivery')}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Order Items</h2>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-contain bg-white rounded"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{item.title}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={handlePlaceOrder} size="lg" className="w-full">
                  Place Order - ₹{total.toFixed(2)}
                </Button>
              </div>
            )}

            {/* Step 4: Order Confirmation */}
            {step === 4 && (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="w-20 h-20 bg-[hsl(var(--success-green))]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-[hsl(var(--success-green))]" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
                <p className="text-muted-foreground mb-2">
                  Thank you for your order, {shippingData?.fullName}
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  A confirmation email has been sent to {shippingData?.email}
                </p>

                <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
                  <h3 className="font-bold mb-4">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className="text-[hsl(var(--success-green))]">FREE</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                      <span>Total:</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button variant="outline" onClick={() => navigate('/')}>
                    Continue Shopping
                  </Button>
                  <Button onClick={() => navigate('/')}>
                    View Orders
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {step < 4 && (
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

                <div className="flex justify-between text-xl font-bold">
                  <span>Order total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
