import { CreditCard, DollarSign, TrendingUp } from 'lucide-react';

export default function EquityEdgePayout() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex justify-center items-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800">Fortune Edge Funding</h1>
        <div className="h-8 w-1 bg-blue-500 mx-4"></div>
        <h1 className="text-4xl font-bold text-gray-800">Payouts</h1>
      </div>

      {/* Main Content */}
      <div className="rounded-2xl border-2 border-blue-500 overflow-hidden">
        <div className="grid md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x divide-blue-500">
          {/* Left Card */}
          <div className="p-8 md:p-12 flex flex-col">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center">
                <TrendingUp className="w-12 h-12 text-blue-500" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Generous Profit Split</h2>
            
            <p className="text-gray-700 leading-relaxed">
            Start at a 50% profit split and scale up to 80% as you show consistency in your trading, empowering you to keep more of your hard earned gains.
            </p>
          </div>

          {/* Right Card */}
          <div className="p-8 md:p-12 flex flex-col">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center">
                <CreditCard className="w-12 h-12 text-blue-500" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Seamless Withdrawals</h2>
            
            <p className="text-gray-700 leading-relaxed">
            We offer seamless withdrawals via cryptocurrencies, ensuring fast, secure, and borderless transactions. Enjoy the flexibility of receiving your profits in digital assets, providing you with greater control and accessibility to your 
            </p>
          </div>
        </div>
      </div>

      {/* Optional: Gradient Background Variant */}
      <div className="mt-16 rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Maximize Your Trading Profits?</h2>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}