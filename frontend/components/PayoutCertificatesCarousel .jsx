// components/PayoutCertificatesCarousel.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const PayoutCertificatesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 3;
  const slideRef = useRef(null);

  const certificates = [
    {
      id: 1,
      name: 'Jasmin A',
      amount: '$28,295',
      date: '15/04/2024',
    },
    {
      id: 2,
      name: 'Andile M',
      amount: '$3,692',
      date: '11/12/2024',
    },
    {
      id: 3,
      name: 'Michael M',
      amount: '$19,500',
      date: '13/05/2024',
    },
  ];

  useEffect(() => {
    if (slideRef.current) {
      const scrollAmount = slideRef.current.offsetWidth * (currentSlide - 1);
      slideRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides ? 1 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? totalSlides : prev - 1));
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pt-24 pb-24">
      {/* Header */}
      <div className="flex items-center justify-center mb-8 border-b border-green-400">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 py-4 px-6">Payout</h2>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 py-4 px-6 bg-green-200">Certificates</h2>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div 
          ref={slideRef}
          className="flex overflow-x-hidden snap-x snap-mandatory"
        >
          {certificates.map((cert) => (
            <div 
              key={cert.id}
              className="min-w-full w-full flex justify-center snap-center"
            >
              <div className="relative w-80 md:w-96 h-[500px] bg-white rounded-3xl overflow-hidden shadow-lg">
                {/* Top corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16">
                  <div className="absolute transform rotate-45 bg-green-500 w-24 h-24 -right-12 -top-12"></div>
                </div>
                
                {/* Bottom corner accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16">
                  <div className="absolute transform rotate-45 bg-green-500 w-24 h-24 -right-12 -bottom-12"></div>
                </div>
                
                {/* Bottom left corner accent */}
                <div className="absolute bottom-0 left-0 w-16 h-16">
                  <div className="absolute transform rotate-45 bg-green-500 w-24 h-24 -left-12 -bottom-12"></div>
                </div>
                
                {/* Certificate content */}
                <div className="p-8 flex flex-col items-center h-full">
                  {/* Company logo */}
                  <div className="mb-4 text-sm text-gray-500">@EQUITYEDGE</div>
                  
                  {/* Title */}
                  <h2 className="text-2xl font-bold mb-2 text-center">PAYOUT CERTIFICATE</h2>
                  
                  <p className="text-xs text-gray-500 mb-6 text-center">PROUDLY PRESENTED TO</p>
                  
                  {/* Name */}
                  <h3 className="text-2xl font-bold text-green-500 mb-1">{cert.name}</h3>
                  
                  <p className="text-xs text-gray-500 mb-10 text-center">YOUR PERFORMANCE FEE</p>
                  
                  {/* Amount */}
                  <div className="text-5xl font-bold text-green-500 mb-10">{cert.amount}</div>
                  
                  {/* Signatures */}
                  <div className="flex justify-between w-full mt-auto mb-10">
                    <div className="flex flex-col items-center">
                      <div className="text-gray-700 italic mb-1">Tris</div>
                      <div className="text-xs text-gray-500">Co-Founder</div>
                      <div className="text-xs text-gray-500">@EQUITYEDGE</div>
                    </div>
                    
                    {/* Seal */}
                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center border-4 border-green-200">
                      <div className="w-10 h-10 rounded-md border-2 border-white"></div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="text-gray-700 italic mb-1">Berkay</div>
                      <div className="text-xs text-gray-500">Co-Founder</div>
                      <div className="text-xs text-gray-500">@EQUITYEDGE</div>
                    </div>
                  </div>
                  
                  {/* Date */}
                  <div className="text-xs text-gray-500 text-center">
                    <div>{cert.date}</div>
                    <div>Date</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 mb-6">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center text-white text-2xl shadow-md hover:bg-green-500 transition-colors"
          >
            ←
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center text-white text-2xl shadow-md hover:bg-green-500 transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayoutCertificatesCarousel;