import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--header-secondary))] text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Get to Know Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:underline">About Us</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Careers</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Press Releases</Link>
              </li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:underline">Sell on Amazon</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Become an Affiliate</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Advertise Your Products</Link>
              </li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div>
            <h3 className="font-bold text-lg mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:underline">Your Account</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Returns Center</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Help</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:underline">Facebook</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Twitter</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Instagram</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Amazon. For educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
