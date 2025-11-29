import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import { Filter } from 'lucide-react';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState<'all' | 'under50' | '50to200' | 'over200'>('all');
  const [showPrimeOnly, setShowPrimeOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const filteredProducts = productsData
    .filter(product => {
      // Text search
      if (query && !product.title.toLowerCase().includes(query.toLowerCase()) &&
          !product.description.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      
      // Price range filter
      if (priceRange === 'under50' && product.price >= 50) return false;
      if (priceRange === '50to200' && (product.price < 50 || product.price > 200)) return false;
      if (priceRange === 'over200' && product.price <= 200) return false;
      
      // Prime filter
      if (showPrimeOnly && !product.prime) return false;
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const categories = ['Electronics', 'Books', 'Clothing', 'Home', 'Toys'];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {query ? `Search results for "${query}"` : categoryParam ? categoryParam : 'All Products'}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} results
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-card border border-border rounded p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5" />
                <h2 className="font-bold text-lg">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={!selectedCategory}
                      onChange={() => setSelectedCategory('')}
                      className="accent-[hsl(var(--accent))]"
                    />
                    <span className="text-sm">All</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="accent-[hsl(var(--accent))]"
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Price</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === 'all'}
                      onChange={() => setPriceRange('all')}
                      className="accent-[hsl(var(--accent))]"
                    />
                    <span className="text-sm">All Prices</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === 'under50'}
                      onChange={() => setPriceRange('under50')}
                      className="accent-[hsl(var(--accent))]"
                    />
                    <span className="text-sm">Under ₹50</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === '50to200'}
                      onChange={() => setPriceRange('50to200')}
                      className="accent-[hsl(var(--accent))]"
                    />
                    <span className="text-sm">₹50 to ₹200</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === 'over200'}
                      onChange={() => setPriceRange('over200')}
                      className="accent-[hsl(var(--accent))]"
                    />
                    <span className="text-sm">Over ₹200</span>
                  </label>
                </div>
              </div>

              {/* Prime Filter */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPrimeOnly}
                    onChange={(e) => setShowPrimeOnly(e.target.checked)}
                    className="accent-[hsl(var(--accent))]"
                  />
                  <span className="text-sm font-semibold text-[hsl(var(--prime-blue))]">
                    Prime Eligible
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <span className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} results
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'relevance' | 'price-asc' | 'price-desc' | 'rating')}
                className="px-4 py-2 border border-border rounded bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]"
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground mb-4">No products found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
