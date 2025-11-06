import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star, StarHalf, Minus, Plus, ShoppingCart, Check, Heart } from 'lucide-react';
import productsData from '@/data/products.json';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const product = productsData.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const inWishlist = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <button
              onClick={() => navigate('/')}
              className="text-[hsl(var(--prime-blue))] hover:underline"
            >
              Return to home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-5 w-5 fill-[hsl(var(--rating-gold))] text-[hsl(var(--rating-gold))]" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="h-5 w-5 fill-[hsl(var(--rating-gold))] text-[hsl(var(--rating-gold))]" />
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
      });
    }
    toast.success(`Added ${quantity} item(s) to cart`, {
      description: product.title,
    });
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        rating: product.rating,
        reviews: product.reviews,
      });
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              {/* Main Image */}
              <div className="bg-white rounded-lg p-8 mb-4 border border-border">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-auto object-contain max-h-[500px]"
                />
              </div>
              
              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-1 bg-white rounded p-2 border-2 transition-all ${
                        selectedImage === index
                          ? 'border-[hsl(var(--accent))]'
                          : 'border-border hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-20 object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-4">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold text-foreground flex-1">{product.title}</h1>
              <button
                onClick={handleWishlistToggle}
                className="p-3 hover:bg-muted rounded-full transition-colors flex-shrink-0"
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  className={`h-6 w-6 transition-colors ${
                    inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </button>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-sm text-[hsl(var(--prime-blue))] hover:underline cursor-pointer">
                {product.reviews.toLocaleString()} ratings
              </span>
            </div>

            <div className="border-t border-b border-border py-4 mb-4">
              {/* Price */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-foreground">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              {product.originalPrice && (
                <div className="text-sm text-[hsl(var(--sale-red))] font-semibold">
                  Save ₹{(product.originalPrice - product.price).toFixed(2)} (
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%)
                </div>
              )}

              {/* Prime */}
              {product.prime && (
                <div className="mt-4 flex items-center gap-2">
                  <div className="bg-[hsl(var(--prime-blue))] text-white text-sm font-bold px-3 py-1 rounded">
                    prime
                  </div>
                  <span className="text-sm">FREE delivery</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="font-bold text-lg mb-2">About this item</h2>
              <p className="text-muted-foreground mb-4">{product.description}</p>
              
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[hsl(var(--success-green))] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Purchase Box */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <div className="text-3xl font-bold mb-4">₹{product.price.toFixed(2)}</div>
              
              {product.prime && (
                <div className="mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="bg-[hsl(var(--prime-blue))] text-white text-xs font-bold px-2 py-0.5 rounded">
                      prime
                    </div>
                  </div>
                  <p className="text-sm text-[hsl(var(--success-green))] font-semibold">
                    FREE delivery by tomorrow
                  </p>
                </div>
              )}

              <div className="mb-4">
                <p className="text-[hsl(var(--success-green))] text-lg font-semibold mb-2">
                  In Stock
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Quantity:</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-border rounded hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-border rounded hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-gray-900 font-semibold py-3 px-6 rounded-full transition-colors mb-3 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>

              <button className="w-full bg-[hsl(var(--accent))]/30 hover:bg-[hsl(var(--accent))]/40 text-foreground font-semibold py-3 px-6 rounded-full transition-colors">
                Buy Now
              </button>

              <div className="mt-4 pt-4 border-t border-border text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ships from</span>
                  <span className="font-semibold">Amazon</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sold by</span>
                  <span className="font-semibold">Amazon</span>
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

export default ProductDetail;
