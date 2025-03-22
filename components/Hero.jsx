"use client"

import { ContactForm, CustomGetFundedBtn, EquityEdgePayout, Footer, FundingOptionsSection, GetFunded, Navbar, ProveWorthySection, SubHeroSection, TelegramCommunityBenefits, TradeEliteBanner, TradingPlanSelector } from '@/constants'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <main className="bg">
        <Navbar />
      <main className="bg pt-28 pb-12 md:pt-40 px-4 md:px-8">
      <div className="flex flex-col items-center justify-center">
  <h1 className="text-3xl md:text-4xl lg:text-7xl bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-transparent bg-clip-text mb-6 md:mb-12 font-extrabold">
  Funding <span className="text-white">For All</span> Traders
  </h1>
  {/* <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-slate-50 mb-6 md:mb-12">
    Join Fortune Edge Funding Today
  </h2> */}
  
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
      {/* Get funded components */}
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
      </main>
    </main>
  )
}

export default Hero