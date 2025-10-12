"use client";

import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-rose-50 to-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 lg:px-0 py-12">
        {/* --- Top Section --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-extrabold text-rose-600 mb-3">
              বুনন রঙ
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              বুনন রঙ — বাংলার ঐতিহ্য ও আধুনিকতার রঙে রাঙানো একটি ই-কমার্স
              প্ল্যাটফর্ম। আমাদের হাতে তৈরি পোশাক ও শিল্পকর্মে খুঁজে পাবেন
              সংস্কৃতির স্পর্শ।
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-4">
              <Link
                href="#"
                className="text-gray-500 hover:text-rose-600 transition"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-rose-600 transition"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-rose-600 transition"
              >
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <Link href="#" className="hover:text-rose-600 transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-rose-600 transition">
                  Women
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-rose-600 transition">
                  Men
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-rose-600 transition">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-rose-600 transition">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <Link href="#" className="hover:text-rose-600 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-rose-600 transition">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-rose-600 transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-rose-600 transition">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-rose-600 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-rose-500" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 text-rose-500" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 text-rose-500" />
                <span>support@bunanrong.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} বুনন রঙ — All rights reserved.</p>
          <p>
            Crafted with <span className="text-rose-500">♥</span> in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
