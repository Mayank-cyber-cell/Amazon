import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--header-secondary))] text-white mt-16">
      {/* Back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-[hsl(var(--header-bg))] hover:bg-[hsl(var(--header-bg))]/80 py-4 text-sm font-medium transition-colors"
      >
        Back to top
      </button>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Get to Know Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">Press Releases</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">Amazon Science</Link>
              </li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">Sell on Amazon</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">Become an Affiliate</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">Advertise Your Products</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">Sell on Amazon Business</Link>
              </li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div>
            <h3 className="font-bold text-lg mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">Your Account</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">Returns Center</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">Help</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">Shipping & Delivery</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect with Us</h3>
            <div className="flex gap-4 mb-6">
              <a 
                href="#" 
                className="p-2 bg-white/10 rounded-full hover:bg-[hsl(var(--accent))] hover:text-gray-900 transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-white/10 rounded-full hover:bg-[hsl(var(--accent))] hover:text-gray-900 transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-white/10 rounded-full hover:bg-[hsl(var(--accent))] hover:text-gray-900 transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-white/10 rounded-full hover:bg-[hsl(var(--accent))] hover:text-gray-900 transition-all hover:scale-110"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@amazon.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>1-800-AMAZON</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Amazon Clone. For educational purposes only. Not affiliated with Amazon.com, Inc.
          </p>
          <div className="flex justify-center gap-6 mt-4 text-xs text-gray-500">
            <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">Terms of Use</Link>
            <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">Cookie Preferences</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
