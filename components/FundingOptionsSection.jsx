import React from 'react';

const FundingOptionsSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-2xl xl:text-2xl font-bold flex flex-col md:flex-row justify-center items-center gap-2">
          <span className="text-green-950">Unlock Funding Up To $200k with</span>
          <span className="flex items-center mt-2 md:mt-0">
            <span className="h-12 w-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 mx-2 hidden md:block"></span>
            <span className="text-green-950">1 Step Fortune & Instant Funding</span>
          </span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto">
        <p className="text-center text-gray-800 text-lg md:text-xl leading-relaxed">
        We provide traders with diverse funding opportunities through our Instant Funding and 1-Step Challenge programs. Whether you prefer to prove your skills through a structured evaluation or start trading with capital immediately, our programs are designed to support your growth and success in a competitive trading environment.
        </p>
      </div>
    </section>
  );
};

export default FundingOptionsSection;