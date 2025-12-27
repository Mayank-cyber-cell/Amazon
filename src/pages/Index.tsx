import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import heroElectronics from '@/assets/hero-electronics.jpg';
import heroHome from '@/assets/hero-home.jpg';
import { ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const heroSlides = [
    {
      image: heroElectronics,
      title: 'Latest Electronics',
      description: 'Shop the newest tech gadgets',
      link: '/search?category=Electronics',
    },
    {
      image: heroHome,
      title: 'Home Essentials',
      description: 'Everything for your perfect home',
      link: '/search?category=Home',
    },
  ];

  const categories = [
    { title: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80', category: 'Electronics' },
    { title: 'Books', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80', category: 'Books' },
    { title: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80', category: 'Clothing' },
    { title: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80', category: 'Home' },
    { title: 'Toys & Games', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&q=80', category: 'Toys' },
  ];

  const featuredProducts = productsData.slice(0, 8);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Carousel */}
        <div 
          className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-b from-gray-100 to-background"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 translate-x-0' 
                  : index < currentSlide 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="container mx-auto px-4 pb-12">
                  <h2 className={`text-4xl md:text-6xl font-bold text-white mb-4 transition-all duration-500 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    {slide.title}
                  </h2>
                  <p className={`text-xl text-white mb-6 transition-all duration-500 delay-100 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    {slide.description}
                  </p>
                  <a
                    href={slide.link}
                    className={`inline-block bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-gray-900 font-bold px-8 py-3 rounded transition-all duration-500 delay-200 hover:scale-105 ${
                      index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          ))}
          
          {/* Carousel controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-gray-900" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-gray-900" />
          </button>

          {/* Carousel indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-[hsl(var(--accent))] w-8' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="container mx-auto px-4 -mt-20 relative z-10 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <div 
                key={category.category} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CategoryCard
                  title={category.title}
                  image={category.image}
                  category={category.category}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white py-16 my-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Join Prime Today</h2>
            <p className="text-xl mb-6">Get FREE delivery, exclusive deals, and more!</p>
            <button className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-gray-900 font-bold px-8 py-3 rounded transition-all hover:scale-105">
              Start 30-day free trial
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${
          showBackToTop 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Index;
