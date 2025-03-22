"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('1step');
  
  const pricingData = {
    '1step': {
      title: '1 Step Fortune',
      description: 'Get funded in one step with our 1 Step Fortune program',
      synthetic: [
        { account: '$5K', price: '$75' },
        { account: '$10K', price: '$130' },
        { account: '$25K', price: '$240' },
        { account: '$50K', price: '$440' },
        { account: '$100K', price: '$845' },
        { account: '$200K', price: '$1650' },
      ],
      forex: [
        { account: '$5K', price: '$32' },
        { account: '$10K', price: '$60' },
        { account: '$25K', price: '$130' },
        { account: '$50K', price: '$250' },
        { account: '$100K', price: '$495' },
        { account: '$200K', price: '$950' },
      ]
    },
    'instant': {
      title: 'Instant Funding',
      description: 'Get funded instantly with our Instant Funding program',
      synthetic: [
        { account: '$5K', price: '$110' },
        { account: '$10K', price: '$215' },
        { account: '$25K', price: '$325' },
        { account: '$50K', price: '$600' },
        { account: '$100K', price: '$1100' },
        { account: '$200K', price: '$2050' },
      ],
      forex: [
        { account: '$5K', price: '$75' },
        { account: '$10K', price: '$120' },
        { account: '$25K', price: '$270' },
        { account: '$50K', price: '$390' },
        { account: '$100K', price: '$590' },
        { account: '$200K', price: '$990' },
      ]
    }
  };

  const [activeCategory, setActiveCategory] = useState('synthetic');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" id='pricing'>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our Pricing Plans
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Choose the right funding program that fits your trading style and goals
          </p>
        </div>

        {/* Program Type Selector */}
        <div className="mt-12 max-w-lg mx-auto flex rounded-md divide-x overflow-hidden">
          <button
            className={`w-1/2 py-4 px-6 text-lg font-medium cursor-pointer ${
              activeTab === '1step'
                ? 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('1step')}
          >
            1 Step Fortune
          </button>
          <button
            className={`w-1/2 py-4 px-6 text-lg font-medium cursor-pointer ${
              activeTab === 'instant'
                ? 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('instant')}
          >
            Instant Funding
          </button>
        </div>

        {/* Category Selection */}
        <div className="mt-6 max-w-lg mx-auto flex rounded-md divide-x overflow-hidden shadow-sm">
          <button
            className={`w-1/2 py-3 px-6 text-base font-medium cursor-pointer ${
              activeCategory === 'synthetic'
                ? 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveCategory('synthetic')}
          >
            Synthetic Indices
          </button>
          <button
            className={`w-1/2 py-3 px-6 text-base font-medium cursor-pointer ${
              activeCategory === 'forex'
                ? 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveCategory('forex')}
          >
            Forex
          </button>
        </div>

        {/* Program Details */}
        <div className="mt-10 max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {pricingData[activeTab].title}
            </h2>
            <p className="mt-2 text-lg text-gray-500">
              {pricingData[activeTab].description}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
            {pricingData[activeTab][activeCategory].map((plan, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 px-4 py-6 text-center">
                  <p className="text-white text-xl font-bold">{plan.account}</p>
                </div>
                <div className="p-6 text-center">
                  <p className="text-3xl font-bold text-gray-900 mb-4">{plan.price}</p>
                  <Link href={"#"} className="mt-8 w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white px-4 py-2 rounded-md shadow hover:opacity-90 transition-opacity duration-300 cursor-pointer">
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Our Programs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-full flex items-center justify-center text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Funding</h3>
              <p className="text-gray-600">Get funded quickly and start trading with our streamlined application process.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-full flex items-center justify-center text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Multiple Options</h3>
              <p className="text-gray-600">Choose from various account sizes and instrument types to match your trading preferences.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-full flex items-center justify-center text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Competitive Pricing</h3>
              <p className="text-gray-600">Our transparent pricing structure ensures you get the best value for your investment.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button className="w-full text-left p-4 focus:outline-none cursor-pointer">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">What's the difference between the programs?</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="mt-2 text-gray-600">
                  1 Step Fortune offers a simplified evaluation process, while Instant Funding provides immediate access to trading funds without evaluation.
                </div>
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button className="w-full text-left p-4 focus:outline-none cursor-pointer">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">What are Synthetic Indices?</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="mt-2 text-gray-600">
                  Synthetic Indices are simulated markets that mimic real-world financial markets but operate 24/7 and are driven by a transparent random number generator.
                </div>
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button className="w-full text-left p-4 focus:outline-none cursor-pointer">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">How do I get started?</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="mt-2 text-gray-600">
                  Simply select your preferred program, account size, and instrument type, then click the "Get Started" button to begin the application process.
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-lg shadow-xl">
          <div className="max-w-4xl mx-auto px-6 py-12 text-center">
            <h2 className="text-3xl font-bold text-white">Ready to Start Trading?</h2>
            <p className="mt-4 text-xl text-white opacity-90">
              Get funded today and take your trading career to the next level
            </p>
            <div className="mt-8">
              <Link href={"#pricing"} className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium text-lg shadow-md hover:bg-gray-100 transition-colors duration-300">
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}