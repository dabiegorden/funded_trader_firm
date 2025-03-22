import React from 'react';
import Link from 'next/link';
import { benefits } from '@/constants';

const BenefitCard = ({ Icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center">
      <div className="w-16 h-16 mb-4 flex items-center justify-center">
        <Icon size={48} className="text-blue-500" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-950">{description}</p>
    </div>
  );
};

const TelegramCommunityBenefits = () => {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-600 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <div className="relative">
            <h2 className="text-4xl font-bold text-center mb-8">Telegram Community Benefits</h2>
          </div>
          <p className="text-xl text-center max-w-4xl mt-8">
            Join our Telegram community and connect with like-minded traders. Be the first to hear about exciting promotions, giveaways, and exclusive updates that you won&apos;t want to miss out on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pla">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              Icon={benefit.Icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href={"https://t.me/fortuneedgefunding"} className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors duration-300">
            Join Our Telegram
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TelegramCommunityBenefits;

