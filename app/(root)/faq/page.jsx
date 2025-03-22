'use client';

import React, { useState } from 'react';


export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'Who is a Funded Trader?',
      answer: 'A funded trader is an individual who trades financial instruments using capital provided by a brokerage firm like TenTrade, sharing profits with the firm while adhering to its risk management rules.'
    },
    {
      question: 'What are the Trading Program Phases?',
      answer: (
        <div>
          <p className="mb-2"><strong>1 Step Evaluation:</strong> Pass our 1-stage evaluation and start trading your live account.</p>
          <p><strong>Instant Funding:</strong> Skip our evaluation program and get instant access to real funds.</p>
        </div>
      )
    },
    {
      question: 'How does the Profit Split work?',
      answer: (
        <div>
          <p className="mb-1"><strong>Payout days:</strong> 21 | 21 | 21 | 15</p>
          <p><strong>Payout %:</strong> 50% | 60% | 70% | 80%</p>
        </div>
      )
    },
    {
      question: 'What Payment Methods are available?',
      answer: 'Deposits and Withdrawals via Cryptocurrency.'
    },
    {
      question: 'How long does Payment Processing take?',
      answer: 'It takes 1-72 hours to process a payout, but we try to process them as fast as possible.'
    },
    {
      question: 'What are the Evaluation Phase Rules?',
      answer: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Profit Target: 10%</li>
          <li>Maximum Daily Drawdown limit: 5%</li>
          <li>Account Drawdown limit: 10%</li>
          <li>Minimum Trading Days: 5</li>
          <li>Maximum Trading Days: Unlimited</li>
        </ul>
      )
    },
    {
      question: 'What are the Funded Phase Rules?',
      answer: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Maximum Daily Drawdown limit: 5%</li>
          <li>Account Drawdown limit: 10%</li>
          <li>Minimum Trading Days: 5</li>
          <li>Maximum Trading Days: Unlimited</li>
          <li>Account will be ineligible for payout after inactivity for 2 weeks</li>
        </ul>
      )
    },
    {
      question: 'What are the Consistency Rules?',
      answer: (
        <div>
          <p className="mb-3">The Consistency Rule in the Funded Trader program ensures traders maintain steady and sustainable profits while managing risk and adhering to a trading plan.</p>
          
          <div className="mb-4">
            <p className="font-medium mb-2">Profit Consistency Rule:</p>
            <p className="mb-2">No single trade should contribute more than 30% of the total profit at time of withdrawal. This ensures traders maintain steady performance rather than relying on one lucky trade.</p>
            
            <div className="bg-blue-50 p-3 rounded mb-2">
              <p className="font-medium">Example (Allowed):</p>
              <p>Total profit before withdrawal: $10,000</p>
              <p>Largest single trade profit: $2,500 (25%) - within the limit.</p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded mb-2">
              <p className="font-medium">Example (Violation):</p>
              <p>Total profit before withdrawal: $10,000</p>
              <p>Largest single trade profit: $6000 (60%) - Exceeds the 30% limit.</p>
            </div>
            
            <p className="text-red-600">Consequence: If violated once, the trader account will be reset to start up balance. Violating the second time will result in account disqualification.</p>
          </div>
          
          <div>
            <p className="font-medium mb-2">Lot Size Consistency Rule:</p>
            <p className="mb-2">The maximum lot size per trade should not exceed 2x the trader's starting lot size. This ensures traders do not suddenly increase risk in an attempt to pass or hit big payouts.</p>
            
            <div className="bg-blue-50 p-3 rounded mb-2">
              <p className="font-medium">Example (Allowed):</p>
              <p>Starting lot size: 1.0 lot</p>
              <p>Largest lot size: 2.0 lots - within the limit.</p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded mb-2">
              <p className="font-medium">Example (Violation):</p>
              <p>Starting lot size: 1.0 lot</p>
              <p>Largest lot size: 3.0 lots - exceeds the 2x limit</p>
            </div>
            
            <p className="text-red-600">Consequence: If violated once, the trader account will be reset to start up balance. Violating the second time will result in account disqualification.</p>
          </div>
        </div>
      )
    },
    {
      question: 'Is News Trading allowed?',
      answer: 'Trading during or after news is not restricted.'
    },
    {
      question: 'Is Weekend Trading allowed?',
      answer: 'There are no restrictions on weekend trading or holding trades over the weekends.'
    },
    {
      question: 'What Trading Strategies are Prohibited?',
      answer: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Latency Arbitrage</li>
          <li>Use of deferred data to obtain risk-free benefits</li>
          <li>Tick, HFT, EAs and BOTs</li>
          <li>Arbitrage systems such as WP7 or similar</li>
          <li>Executing stop orders on index assets without being affected by slippage of Spikes or Gaps</li>
          <li>Executing orders in synthetic index assets with tick type SL</li>
        </ul>
      )
    },
    {
      question: 'Is Account Merging allowed?',
      answer: 'Merging of accounts is not allowed.'
    },
    {
      question: 'What is the Maximum Funding Limit?',
      answer: 'The maximum scaling limit is $200,000, we do not merge accounts.'
    },
    {
      question: 'What Can I Trade?',
      answer: 'You can trade forex, crypto and synthetic indices.'
    },
    {
      question: 'What Trading Platform do you offer?',
      answer: 'We offer Metatrader 5 accounts.'
    },
    {
      question: 'Do you have any Broker Affiliation?',
      answer: 'No, we\'re not affiliated with any trading broker.'
    },
    {
      question: 'How Do I Get In Touch?',
      answer: (
        <div>
          <p className="mb-2"><strong>Customer service:</strong> We have a Live Chat available Sunday to Monday 7:00 am to 5:00pm GMT.</p>
          <p>Through this medium we handle all enquiries and provide information to guide and support every user according to their needs.</p>
        </div>
      )
    },
    {
      question: 'How Does The Referral Program Work?',
      answer: (
        <div>
          <p className="mb-2">After registration, every user has access to their unique referral link.</p>
          <p className="mb-2">For every account purchased by your referrals, you earn up to 15%.</p>
          <p className="mb-2">This commission can be withdrawn anytime.</p>
          <p><strong>Minimum withdrawal:</strong> $100</p>
        </div>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-blue-50">
      <div className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">FortuneEdge</h1>
          <p className="text-blue-100 text-center mt-2">Your Path to Funded Trading Success</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-blue-200 rounded-lg overflow-hidden shadow-sm">
              <button
                className={`flex justify-between items-center w-full p-4 text-left transition-colors ${
                  activeIndex === index 
                    ? "bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white" 
                    : "bg-white hover:bg-blue-50 text-blue-800"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-lg font-medium">{item.question}</span>
                <span>
                  {activeIndex === index ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </span>
              </button>
              
              {activeIndex === index && (
                <div className="p-4 bg-white border-t border-blue-200">
                  <div className="prose max-w-none">{item.answer}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}