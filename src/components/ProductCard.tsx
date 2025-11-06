import { Link } from 'react-router-dom';
import { Star, StarHalf, Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  prime?: boolean;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-card border border-border rounded hover:shadow-lg transition-all duration-200 h-full flex flex-col group">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-t bg-white p-4">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-[hsl(var(--sale-red))] text-white text-xs font-bold px-2 py-1 rounded">
              SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2 group-hover:text-[hsl(var(--accent))] transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-foreground">
                ₹{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Prime badge */}
            {product.prime && (
              <div className="flex items-center gap-1 mt-2">
                <div className="bg-[hsl(var(--prime-blue))] text-white text-xs font-bold px-2 py-0.5 rounded">
                  prime
                </div>
                <span className="text-xs text-muted-foreground">Free delivery</span>
              </div>
            )}

            {/* Stock status */}
            {product.inStock ? (
              <p className="text-xs text-[hsl(var(--success-green))] mt-1">In Stock</p>
            ) : (
              <p className="text-xs text-[hsl(var(--sale-red))] mt-1">Out of Stock</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
