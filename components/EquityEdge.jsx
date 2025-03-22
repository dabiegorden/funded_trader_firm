import React from 'react';
import Link from 'next/link';
import { featuresData } from '@/constants';

const EquityEdge = () => {


  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {featuresData.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-20">
          {/* Section Title */}
          {sectionIndex !== 2 && (
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-2xl lg:text-2xl font-bold flex flex-col md:flex-row justify-center items-center gap-2">
                {sectionIndex === 0 ? (
                  <>
                    <span className="text-slate-950">Why Should You Join</span>
                    <span className="flex items-center">
                      <span className="h-8 w-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 mx-2 hidden md:block"></span>
                      <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-slate-50 px-3 py-1">Equity Edge</span>
                    </span>
                  </>
                ) : (
                  <span className="text-slate-50">{section.title}</span>
                )}
              </h2>
            </div>
          )}

          {/* Features Grid */}
          <div className={`grid grid-cols-1 ${sectionIndex === 2 ? 'md:grid-cols-1 max-w-md mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
            {section.features.map((feature, featureIndex) => (
              <div 
                key={featureIndex} 
                className="border border-blue-500 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 rounded-3xl p-8 flex flex-col items-center md:items-start text-center md:text-left cursor-pointer"
              >
                <div className={`mb-4 ${sectionIndex === 2 ? 'text-center w-full' : ''}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-50 mb-3">{feature.title}</h3>
                <p className="text-slate-50 mb-4">{feature.description}</p>
                
                {feature.cta && (
                  <div className="mt-auto pt-4 w-full flex justify-center">
                    <Link href="/get-funded" className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-500 transition inline-block">
                      Get Funded
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default EquityEdge;