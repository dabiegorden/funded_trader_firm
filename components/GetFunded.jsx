import { steps } from '@/constants';
import React from 'react';

const FundingSteps = () => {


  return (
    <section className="pt-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 pb-8">
          <span className="text-green-950">Get Funded In</span>
          <span className="flex items-center">
            <span className="h-8 w-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 mx-2 hidden md:block"></span>
            <span className="text-green-950">3 Easy Steps</span>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col bg-white h-full border border-blue-400 rounded-lg relative">
            <div className="flex justify-center -mt-10">
              <div className={`bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl font-bold`}>
                {step.number}
              </div>
            </div>
            <div className="p-6 pt-4 flex flex-col h-full">
              <h3 className="text-xl md:text-2xl font-bold text-green-950 mb-4">{step.title}</h3>
              <p className="text-gray-700 flex-grow">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FundingSteps;