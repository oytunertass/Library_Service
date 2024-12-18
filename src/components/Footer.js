import { Facebook, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              We are dedicated to providing a vast collection of books and fostering a love for reading in our community.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><Link href="/books"><p className="text-gray-400 hover:text-white">Books</p></Link></li>
              <li><Link href="/about"><p className="text-gray-400 hover:text-white">About</p></Link></li>
              <li><Link href="/contact"><p className="text-gray-400 hover:text-white">Contact</p></Link></li>
              <li><Link href="/faq"><p className="text-gray-400 hover:text-white">FAQ</p></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <p href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </p>
              <p href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </p>
              <p href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">&copy; 2024 Library System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}