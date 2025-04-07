"use client"

import { ContactForm, CustomGetFundedBtn, EquityEdgePayout, Footer, FundingOptionsSection, GetFunded, Navbar, ProveWorthySection, SubHeroSection, TelegramCommunityBenefits, TradeEliteBanner} from '@/constants'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Hero = () => {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    // Show development notice toast when component mounts
    if (showBanner) {
      const toastId = toast.info(
        <div className="flex flex-col">
          <div className="font-medium mb-1">Website Under Development</div>
          <div className="text-sm">This site is currently in progress. Some features may be incomplete.</div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "bg-gradient-to-r from-blue-800 to-blue-600 text-white",
          icon: "🚧",
          onClose: () => setShowBanner(false)
        }
      );
    }
  }, []);

  return (
    <main className="bg relative">
      {/* React-Toastify Container */}
      <ToastContainer 
        position="top-center"
        autoClose={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Spacer div for fixed navbar */}
      <div className="h-16 md:h-24"></div>
      
      <div className="bg pt-12 pb-12 md:pt-16 px-4 md:px-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-7xl bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-transparent bg-clip-text mb-6 md:mb-12 font-extrabold">
            Funding <span className="text-white">For All</span> Traders
          </h1>
          
          <p className="max-w-3xl text-lg md:text-xl mb-8 md:mb-12 text-slate-50 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 py-4 px-6 md:px-8 rounded-lg">
            Take your trading to the next level and unlock up to $200k Whether you specialize in Forex trading or Deriv synthetic indices, trade without financial risk and keep up to 80% of your profits.
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