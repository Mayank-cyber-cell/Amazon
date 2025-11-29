import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, MapPin, Menu, Heart, LogOut, User as UserIcon } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useState, useEffect } from 'react';
import amazonLogo from '@/assets/amazon-logo-new.png';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

const Header = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      {/* Top header bar */}
      <div className="bg-[hsl(var(--header-bg))] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-all hover:scale-105 flex-shrink-0">
              <img 
                src={amazonLogo} 
                alt="Amazon" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-white">amazon</span>
            </Link>

            {/* Delivery location */}
            <button className="hidden md:flex items-center gap-1 p-2 rounded border border-transparent hover:border-white transition-all">
              <MapPin className="h-5 w-5" />
              <div className="text-left text-xs">
                <div className="text-gray-300">Deliver to</div>
                <div className="font-bold">New York 10001</div>
              </div>
            </button>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="flex group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-4 py-2 text-gray-900 rounded-l outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] transition-all"
                />
                <button
                  type="submit"
                  className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/80 px-6 py-2 rounded-r transition-all hover:scale-105"
                >
                  <Search className="h-5 w-5 text-gray-900" />
                </button>
              </div>
            </form>

            {/* Right side nav */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {user ? (
                <div className="hidden sm:flex items-center gap-2 p-2 rounded border border-transparent hover:border-white transition-all">
                  <UserIcon className="h-5 w-5 text-[hsl(var(--accent))]" />
                  <div className="text-sm">
                    <div className="text-xs text-gray-300">Hello, {user.email?.split('@')[0]}</div>
                    <div className="font-bold">Account</div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                    title="Sign out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link to="/auth" className="hidden sm:block text-sm p-2 rounded border border-transparent hover:border-white transition-all">
                  <div className="text-xs text-gray-300">Hello, Sign in</div>
                  <div className="font-bold">Account & Lists</div>
                </Link>
              )}

              <Link to="/" className="hidden md:block text-sm p-2 rounded border border-transparent hover:border-white transition-all">
                <div className="text-xs text-gray-300">Returns</div>
                <div className="font-bold">& Orders</div>
              </Link>

              <Link to="/wishlist" className="flex items-center gap-1 p-2 rounded border border-transparent hover:border-white transition-all relative">
                <Heart className="h-7 w-7" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[hsl(var(--accent))] text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                    {wishlistCount}
                  </span>
                )}
                <span className="font-bold hidden sm:inline">Wishlist</span>
              </Link>

              <Link to="/cart" className="flex items-center gap-1 p-2 rounded border border-transparent hover:border-white transition-all relative">
                <ShoppingCart className="h-8 w-8" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[hsl(var(--accent))] text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                    {cartCount}
                  </span>
                )}
                <span className="font-bold hidden sm:inline">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary navigation bar */}
      <div className="bg-[hsl(var(--header-secondary))] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 h-10 text-sm overflow-x-auto scrollbar-hide">
            <button className="flex items-center gap-2 px-3 py-1 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
              <Menu className="h-4 w-4" />
              <span className="font-bold">All</span>
            </button>
            <Link to="/search?category=Electronics" className="px-3 py-1 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
              Electronics
            </Link>
            <Link to="/search?category=Books" className="px-3 py-1 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
              Books
            </Link>
            <Link to="/search?category=Clothing" className="px-3 py-1 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
              Fashion
            </Link>
            <Link to="/search?category=Home" className="px-3 py-1 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
              Home & Kitchen
            </Link>
            <Link to="/search?category=Toys" className="px-3 py-1 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
              Toys & Games
            </Link>
            <span className="px-3 py-1 text-[hsl(var(--accent))] font-semibold whitespace-nowrap">
              Today's Deals
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
