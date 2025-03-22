import Link from 'next/link';
import React from 'react';

const ProveWorthySection = () => {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-[#f0f0f0]">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-200 to-gray-100 opacity-70"></div>
      
      <div className="relative container mx-auto px-4 md:px-8 max-w-6xl z-10">
        {/* Heading with green accent */}
        <div className="flex items-center justify-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">Prove Your Trading</h2>
          <div className="h-12 w-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 mx-4"></div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-50 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-500 px-4">Edge</h2>
        </div>
        
        {/* Description text */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Show us your trading skills and discipline by taking on our 1 Step Fortune or Instant Funding challenges. Compete against fellow traders, hit your profit targets, and unlock funding up to $200k. Are you ready to prove you have what it takes to succeed?
          </p>
        </div>
        
        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href={"/register"} 
            className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-full hover:bg-blue-600 transition-colors shadow-lg"
            onClick={() => console.log('Register button clicked')}
          >
            Start Your Challenge
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProveWorthySection;