"use client"

import { ContactForm, CustomGetFundedBtn, EquityEdgePayout, Footer, FundingOptionsSection, GetFunded, Navbar, ProveWorthySection, SubHeroSection, TelegramCommunityBenefits, TradeEliteBanner, TradingPlanSelector } from '@/constants'
import Link from 'next/link'
import React, { useState } from 'react'

const Hero = () => {
  const [showBanner, setShowBanner] = useState(true);
  // Calculate banner height for spacer (adjust value based on actual banner height)
  const bannerHeight = showBanner ? "h-8" : "h-0"; // Typical banner height

  return (
    <main className="bg relative">
      {/* Development Banner */}
      {showBanner && (
        <div 
          id="dev-banner"
          className="w-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 text-white py-2 px-3 shadow-md fixed top-0 left-0 right-0 z-30"
          style={{ paddingTop: "env(safe-area-inset-top, 0)" }}
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex-1 text-center">
              <p className="font-medium text-xs sm:text-sm md:text-base">
                🚧 Website under development. Feel free to explore! 🚧
              </p>
            </div>
            <button 
              onClick={() => setShowBanner(false)} 
              className="ml-2 bg-white bg-opacity-20 rounded-full p-1 hover:bg-opacity-30 transition-all flex-shrink-0"
              aria-label="Close banner"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Navbar with adjusted top position */}
      <div className={`${showBanner ? "top-8" : "top-0"} fixed left-0 right-0 z-20 transition-all duration-300`}>
        <Navbar />
      </div>
      
      {/* Spacer div to account for fixed elements */}
      <div className={`${bannerHeight} h-16 md:h-24`}></div>
      
      <div className="bg pt-12 pb-12 md:pt-16 px-4 md:px-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-7xl bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-transparent bg-clip-text mb-6 md:mb-12 font-extrabold">
            Funding <span className="text-white">For All</span> Traders
          </h1>
          
          <p className="max-w-3xl text-lg md:text-xl mb-8 md:mb-12 text-slate-50 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 py-4 px-6 md:px-8 rounded-lg">
            Take your trading to the next level with funding of up to $200,000. Whether you specialize in Forex trading or Deriv synthetic indices, trade without financial risk and keep up to 80% of your profits.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
            <Link 
              href={"/pricing"} 
              className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-slate-50 px-6 md:px-8 py-3 rounded-full font-medium transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto text-center btn"
            >
              Start Trading
            </Link>
            <Link 
              href={"https://t.me/fortuneedgefunding"} 
              className="bg-transparent border-[2px] border-blue-400 text-slate-50 px-6 md:px-8 py-3 rounded-full font-medium transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto text-center btn"
            >
              Join Our Community
            </Link>
          </div>
        </div>
        <SubHeroSection />
        <GetFunded />
        <CustomGetFundedBtn />
        <FundingOptionsSection />
        <TradingPlanSelector />
        <EquityEdgePayout />
        <ProveWorthySection />
        <TelegramCommunityBenefits />
        <ContactForm />
        <TradeEliteBanner />
        <Footer />
      </div>
    </main>
  )
}

export default Hero;