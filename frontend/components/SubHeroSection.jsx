"use client"

import React, { useState } from 'react';

const StatsBar = () => {
  const [activeTab, setActiveTab] = useState('highlights');

  // Organize stats into categories
  const highlights = [
    {
      title: "80%",
      description: "Receive up to 80% of your simulated profits"
    },
    {
      title: "180+",
      description: "Countries"
    },
    {
      title: "72 h",
      description: "Avg payout processing time"
    }
  ];

  const pricingData = {
    "1 Step Fortune": {
      "SYNTHETIC": [
        { accountSize: "$5K", price: "$75" },
        { accountSize: "$10K", price: "$130" }
      ],
      "FOREX": [
        { accountSize: "$5K", price: "$32" },
        { accountSize: "$10K", price: "$60" }
      ]
    },
    "Instant Funding": {
      "SYNTHETIC": [
        { accountSize: "$5K", price: "$110" },
        { accountSize: "$10K", price: "$215" }
      ],
      "FOREX": [
        { accountSize: "$5K", price: "$75" },
        { accountSize: "$10K", price: "$120" }
      ]
    }
  };

  // Tab options
  const tabs = [
    { id: 'highlights', label: 'Highlights' },
    { id: '1stepfortune', label: '1 Step Fortune' },
    { id: 'instantfunding', label: 'Instant Funding' }
  ];

  return (
    <div className="w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 py-6 px-4 mt-8 rounded-lg shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-slate-50 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-slate-50 text-blue-700' 
                    : 'text-slate-50 hover:bg-blue-600'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {/* Highlights Tab */}
          {activeTab === 'highlights' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {highlights.map((stat, index) => (
                <div key={index} className="flex flex-col items-center text-center bg-blue-600 bg-opacity-30 p-6 rounded-lg hover:bg-opacity-40 transition">
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-50 mb-3">
                    {stat.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-50">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 1 Step Fortune Tab */}
          {activeTab === '1stepfortune' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* FOREX Column */}
              <div className="bg-blue-600 bg-opacity-30 p-5 rounded-lg">
                <h3 className="text-xl font-bold text-slate-50 mb-4 text-center border-b border-blue-400 pb-2">FOREX</h3>
                <div className="grid grid-cols-2 gap-4">
                  {pricingData["1 Step Fortune"]["FOREX"].map((item, index) => (
                    <div key={index} className="bg-blue-700 bg-opacity-40 p-4 rounded-lg text-center">
                      <h4 className="text-2xl font-bold text-slate-50">{item.accountSize}</h4>
                      <p className="text-lg text-slate-50">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* SYNTHETIC Column */}
              <div className="bg-blue-600 bg-opacity-30 p-5 rounded-lg">
                <h3 className="text-xl font-bold text-slate-50 mb-4 text-center border-b border-blue-400 pb-2">SYNTHETIC</h3>
                <div className="grid grid-cols-2 gap-4">
                  {pricingData["1 Step Fortune"]["SYNTHETIC"].map((item, index) => (
                    <div key={index} className="bg-blue-700 bg-opacity-40 p-4 rounded-lg text-center">
                      <h4 className="text-2xl font-bold text-slate-50">{item.accountSize}</h4>
                      <p className="text-lg text-slate-50">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Instant Funding Tab */}
          {activeTab === 'instantfunding' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* FOREX Column */}
              <div className="bg-blue-600 bg-opacity-30 p-5 rounded-lg">
                <h3 className="text-xl font-bold text-slate-50 mb-4 text-center border-b border-blue-400 pb-2">FOREX</h3>
                <div className="grid grid-cols-2 gap-4">
                  {pricingData["Instant Funding"]["FOREX"].map((item, index) => (
                    <div key={index} className="bg-blue-700 bg-opacity-40 p-4 rounded-lg text-center">
                      <h4 className="text-2xl font-bold text-slate-50">{item.accountSize}</h4>
                      <p className="text-lg text-slate-50">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* SYNTHETIC Column */}
              <div className="bg-blue-600 bg-opacity-30 p-5 rounded-lg">
                <h3 className="text-xl font-bold text-slate-50 mb-4 text-center border-b border-blue-400 pb-2">SYNTHETIC</h3>
                <div className="grid grid-cols-2 gap-4">
                  {pricingData["Instant Funding"]["SYNTHETIC"].map((item, index) => (
                    <div key={index} className="bg-blue-700 bg-opacity-40 p-4 rounded-lg text-center">
                      <h4 className="text-2xl font-bold text-slate-50">{item.accountSize}</h4>
                      <p className="text-lg text-slate-50">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;