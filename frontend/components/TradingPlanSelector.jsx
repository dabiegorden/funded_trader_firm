"use client"

import React, { useState } from 'react';

const TradingPlanSelector = () => {
  const [activePlan, setActivePlan] = useState("1 Step Fortune");
  const [activeAmount, setActiveAmount] = useState("5K");
  const [activeMarket, setActiveMarket] = useState("FOREX");
  
  const planTypes = ["1 Step Fortune", "Instant Funding"];
  const accountSizes = ["5K", "10K", "25K", "50K", "100K", "200K"];
  const marketTypes = ["FOREX", "SYNTHETIC"];
  
  // Updated data for each plan type
  const planData = {
    "1 Step Fortune": {
      phase1: {
        tradingPeriod: "Unlimited",
        minTradingDays: "5 Days",
        maxDailyLoss: "5%",
        maxTrailingLoss: "10%",
        profitTarget: "10%",
        leverageFX: "1:100",
        leverageCrypto: "1:100"
      },
      funded: {
        tradingPeriod: "Unlimited",
        minTradingDays: "5 Days",
        maxDailyLoss: "5%",
        maxTrailingLoss: "10%",
        profitTarget: "-",
        leverageFX: "1:100",
        leverageCrypto: "1:100"
      }
    },
    "Instant Funding": {
      funded: {
        tradingPeriod: "Unlimited",
        minTradingDays: "5 Days",
        maxDailyLoss: "5%",
        maxTrailingLoss: "10%",
        profitTarget: "-",
        leverageFX: "1:100",
        leverageCrypto: "1:100"
      }
    }
  };

  // Pricing data
  const pricingData = {
    "1 Step Fortune": {
      "FOREX": {
        "5K": "$32",
        "10K": "$60",
        "25K": "$130",
        "50K": "$250",
        "100K": "$495",
        "200K": "$950"
      },
      "SYNTHETIC": {
        "5K": "$75",
        "10K": "$130",
        "25K": "$240",
        "50K": "$440",
        "100K": "$845",
        "200K": "$1650"
      }
    },
    "Instant Funding": {
      "FOREX": {
        "5K": "$75",
        "10K": "$120",
        "25K": "$270",
        "50K": "$390",
        "100K": "$590",
        "200K": "$990"
      },
      "SYNTHETIC": {
        "5K": "$110",
        "10K": "$215",
        "25K": "$325",
        "50K": "$600",
        "100K": "$1100",
        "200K": "$2050"
      }
    }
  };

  // Get current price based on selections
  const getCurrentPrice = () => {
    try {
      return pricingData[activePlan][activeMarket][activeAmount] || "Contact for pricing";
    } catch (error) {
      return "Contact for pricing";
    }
  };

  // Render column headers based on selected plan
  const renderHeaders = () => {
    if (activePlan === "1 Step Fortune") {
      return (
        <>
          <div className="text-center bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 py-4 w-1/2 text-xl font-bold cursor-pointer">Phase 1</div>
          <div className="text-center bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 py-4 w-1/2 text-xl font-bold cursor-pointer">Funded</div>
        </>
      );
    } else if (activePlan === "Instant Funding") {
      return (
        <div className="text-center bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 py-4 w-full text-xl font-bold cursor-pointer">Funded</div>
      );
    }
  };

  // Render table rows based on selected plan
  const renderRows = () => {
    const rows = [
      { label: "Trading Period", key: "tradingPeriod" },
      { label: "Minimum Trading Days", key: "minTradingDays" },
      { label: "Maximum Daily Loss", key: "maxDailyLoss" },
      { label: "Maximum Loss (Trailing)", key: "maxTrailingLoss" },
      { label: "Profit Target", key: "profitTarget" },
      { label: "Leverage", key: "leverageFX" }
    ];

    return rows.map((row, index) => (
      <div key={index} className="flex border-b border-blue-400">
        <div className="w-1/3 md:w-1/4 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white p-4 md:p-6 cursor-pointer">
          {row.label}
        </div>
        <div className="flex flex-grow bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 overflow-x-auto md:overflow-visible text-slate-50">
          {activePlan === "1 Step Fortune" && (
            <>
              <div className="w-1/2 p-4 md:p-6 cursor-pointer text-center min-w-[120px]">{planData[activePlan].phase1[row.key]}</div>
              <div className="w-1/2 p-4 md:p-6 cursor-pointer text-center min-w-[120px]">{planData[activePlan].funded[row.key]}</div>
            </>
          )}
          {activePlan === "Instant Funding" && (
            <div className="w-full p-4 md:p-6 cursor-pointer text-center min-w-[120px]">{planData[activePlan].funded[row.key]}</div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        {/* Plan Type Selection */}
        <div className="rounded-full bg-blue-900 p-1 flex mb-4 md:mb-0 md:mr-4 cursor-pointer overflow-hidden">
          {planTypes.map((plan) => (
            <button
              key={plan}
              className={`rounded-full px-4 py-2 text-sm md:text-base flex-1 transition-colors cursor-pointer
                ${activePlan === plan ? 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-slate-50' : 'text-slate-50'}`}
              onClick={() => setActivePlan(plan)}
            >
              {plan}
            </button>
          ))}
        </div>

        {/* Market Type Selection */}
        <div className="rounded-full bg-blue-900 p-1 flex mb-4 md:mb-0 md:mr-4 cursor-pointer overflow-hidden">
          {marketTypes.map((market) => (
            <button
              key={market}
              className={`rounded-full px-4 py-2 text-sm md:text-base flex-1 transition-colors cursor-pointer
                ${activeMarket === market ? 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-slate-50' : 'text-slate-50'}`}
              onClick={() => setActiveMarket(market)}
            >
              {market}
            </button>
          ))}
        </div>

        {/* Account Size Selection */}
        <div className="rounded-full bg-blue-900 p-1 flex space-x-2 overflow-x-auto md:overflow-visible cursor-pointer scrollbar-hide">
          {accountSizes.map((size) => (
            <button
              key={size}
              className={`rounded-full px-3 py-2 text-sm md:text-base whitespace-nowrap transition-colors cursor-pointer
                ${activeAmount === size ? 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-green-50' : 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300'}`}
              onClick={() => setActiveAmount(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price Display */}
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-lg text-white text-center">
        <h3 className="text-xl font-bold">Current Price: {getCurrentPrice()}</h3>
      </div>

      {/* Pricing Table Visualization */}
      <div className="mt-8 rounded-lg overflow-hidden border-2 border-blue-500">
        <div className="p-4 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white text-center">
          <h2 className="text-2xl font-bold">Pricing Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-900 text-white">
          {/* FOREX Pricing */}
          <div className="rounded-lg overflow-hidden border-2 border-blue-500">
            <div className="p-3 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-center font-bold">
              FOREX
            </div>
            <div className="grid grid-cols-2 gap-2 p-3">
              {Object.entries(pricingData[activePlan]["FOREX"]).map(([size, price]) => (
                <div 
                  key={size} 
                  className="p-2 bg-blue-800 rounded text-center"
                  onClick={() => {
                    setActiveAmount(size);
                    setActiveMarket("FOREX");
                  }}
                >
                  <div className="font-bold">{size}</div>
                  <div>{price}</div>
                </div>
              ))}
            </div>
          </div>
          {/* SYNTHETIC Pricing */}
          <div className="rounded-lg overflow-hidden border-2 border-blue-500">
            <div className="p-3 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-center font-bold">
              SYNTHETIC
            </div>
            <div className="grid grid-cols-2 gap-2 p-3">
              {Object.entries(pricingData[activePlan]["SYNTHETIC"]).map(([size, price]) => (
                <div 
                  key={size} 
                  className="p-2 bg-blue-800 rounded text-center"
                  onClick={() => {
                    setActiveAmount(size);
                    setActiveMarket("SYNTHETIC");
                  }}
                >
                  <div className="font-bold">{size}</div>
                  <div>{price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trading Plan Table */}
      <div className="mt-8 rounded-lg overflow-hidden border-2 border-blue-500 overflow-x-auto">
        {/* Header Row */}
        <div className="flex bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white min-w-[650px] md:min-w-0">
          <div className="w-1/3 md:w-1/4 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 p-4 md:p-6 font-bold cursor-pointer">
            {activeAmount} {activeMarket} Trading Plan
          </div>
          <div className="flex-grow flex">
            {renderHeaders()}
          </div>
        </div>

        {/* Data Rows */}
        <div className="min-w-[650px] md:min-w-0">
          {renderRows()}
        </div>
      </div>
    </div>
  );
};

export default TradingPlanSelector;