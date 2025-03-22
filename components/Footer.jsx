'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FaTelegram } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribing email:', email);
    setEmail('');
    // Show success message or notification
  };

  return (
    <footer className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-500 text-white py-16 px-4 mt-16 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Logo and top section */}
        <div className="mb-16">
          <Link href="/" className="inline-block">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 w-12 h-12 flex items-center justify-center rounded-md mr-2">
                <span className="font-bold text-slate-50 text-2xl">F</span>
              </div>
              <span className="text-slate-50 font-bold text-2xl tracking-tight">FORTUNE EDGE FUNDING</span>
            </div>
          </Link>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Quicklinks */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-6">Quicklinks</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Link href="/" className="block hover:text-blue-500 transition-colors">
                  Home
                </Link>
                <Link href="/pricing" className="block hover:text-blue-500 transition-colors">
                  Pricing
                </Link>
                <Link href="/affiliate" className="block hover:text-blue-500 transition-colors">
                  Affiliate
                </Link>
              </div>
              <div className="space-y-4">
                <Link href="/faq" className="block hover:text-blue-500 transition-colors">
                  FAQ
                </Link>
                <Link href="/about" className="block hover:text-blue-500 transition-colors">
                  About
                </Link>
              </div>
            </div>
          </div>

          {/* Middle column - empty on larger screens, used for spacing */}
          <div className="hidden lg:block"></div>

          {/* Newsletter and socials */}
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Subscribe to our newsletter</h3>
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="flex-grow bg-white text-gray-900 px-4 py-3 rounded-l-lg focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition-colors"
                >
                  <ArrowRight size={24} />
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Follow us on:</h3>
              <div className="flex space-x-4">
                <Link
                  href="https://t.me/fortuneedgefunding"
                  className="hover:text-blue-500 transition-colors"
                >
                  <FaTelegram size={24} />
                </Link>
                <Link
                  href="https://www.instagram.com/fortuneedgefunding?igsh=MWxuN2NuN2o4a2hsYw%3D%3D&utm_source=qr"
                  className="hover:text-blue-500 transition-colors"
                >
                  <FiInstagram size={24} />
                </Link>
                <Link
                  href="https://www.instagram.com/fortuneedgefunding?igsh=MWxuN2NuN2o4a2hsYw%3D%3D&utm_source=qr"
                  className="hover:text-blue-500 transition-colors"
                >
                  <FaWhatsapp size={24}/>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-300 my-12"></div>

        {/* Copyright and legal information */}
        <div className="text-gray-300 text-sm space-y-4">
          <p>© 2025 Fortune Edge Funding Limited. All rights reserved.</p>
          <p>Fortune Edge Funding Ltd is registered in the UK, Company Number 15263705.</p>
          <p>Registered Office: Barton Court, 56 High Street, Canterbury, Kent, UK, CT1 2AZ</p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/terms" className="hover:text-blue-500 transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="/cookies" className="hover:text-blue-500 transition-colors">
              Cookie Policy
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="/privacy" className="hover:text-blue-500 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="/refunds" className="hover:text-blue-500 transition-colors">
              Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;