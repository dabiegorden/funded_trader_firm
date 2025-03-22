import React from 'react';
import Link from 'next/link';

const TradeEliteBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 py-24 px-4 rounded-3xl overflow-hidden">
      {/* Background gradient circles - decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-full opacity-30 translate-x-1/4 translate-y-1/4" />
      
      <div className="relative max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-50 mb-12 capitalize">
        Your skills, Our Capital<br />
        Take the risk, keep the rewards!
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/pricing" className="px-12 py-4 bg-blue-900 font-semibold rounded-full hover:bg-blue-800 transition-colors duration-300 cursor-pointer text-slate-50">
          Get Funded
          </Link>
          
          <Link href="https://t.me/fortuneedgefunding" className="px-12 py-4 bg-transparent text-slate-50 font-semibold rounded-full border-2 border-blue-900 hover:bg-blue-900 hover:text-blue-500 transition-colors duration-300 cursor-pointer">
              Join Our Telegram
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TradeEliteBanner;