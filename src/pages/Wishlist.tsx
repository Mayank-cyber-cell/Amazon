import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Star, StarHalf } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    });
    toast.success('Added to cart', {
      description: item.title,
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-[hsl(var(--rating-gold))] text-[hsl(var(--rating-gold))]" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="h-4 w-4 fill-[hsl(var(--rating-gold))] text-[hsl(var(--rating-gold))]" />
      );
    }
    return stars;
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Heart className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-8">
              Save items you love by clicking the heart icon on product cards.
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
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground mb-8">{wishlist.length} items</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              {/* Image */}
              <Link to={`/product/${item.id}`} className="relative">
                <div className="aspect-square overflow-hidden rounded-t bg-white p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                {/* Title */}
                <Link to={`/product/${item.id}`}>
                  <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2 hover:text-[hsl(var(--accent))] transition-colors">
                    {item.title}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">{renderStars(item.rating)}</div>
                  <span className="text-xs text-muted-foreground">
                    ({item.reviews.toLocaleString()})
                  </span>
                </div>

                {/* Price */}
                <div className="mt-auto">
                  <span className="text-2xl font-bold text-foreground">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-4 space-y-2">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="w-full"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => {
                      removeFromWishlist(item.id);
                      toast.success('Removed from wishlist');
                    }}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
