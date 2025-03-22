"use client";

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    inquiry: '',
    preferredContact: 'email'
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission - could be an API call
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        inquiry: '',
        preferredContact: 'email'
      });
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">Contact Us</h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Have questions? We're here to help you on your journey to becoming a funded trader.
          </p>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-full flex items-center justify-center mb-4">
              <Mail className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">We'll respond within 1 hours</p>
            <a href="mailto:support@fortuneedgefunding.com" className="text-blue-600 hover:underline">
              support@fortuneedgefunding.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-full flex items-center justify-center mb-4">
              <FaWhatsapp className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Mon-Fri, 9am-5pm (GMT)</p>
            <a href="tel:+441234567890" className="text-blue-600 hover:underline">
              +44 123 456 7890
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Available 24/7 for quick questions</p>
            <button className="text-blue-600 hover:underline">
              Start Chat
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-full flex items-center justify-center mb-4">
              <MapPin className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-4">Our office location</p>
            <address className="not-italic text-blue-600">
              Barton Court, 56 High Street, Canterbury,
              Kent, England, CT1 2AZ
            </address>
          </div>
        </div>
      </div>

      {/* Inquiry Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How Can We Help You?</h2>
            <p className="mt-4 text-xl text-gray-600">
              Select the department that best matches your inquiry
            </p>
          </div>

          {/* Department Selection */}
          <div className="max-w-3xl mx-auto mb-8 flex flex-wrap justify-center gap-4">
            <button
              className={`px-6 py-3 rounded-full cursor-pointer ${
                activeTab === 'general'
                  ? 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors duration-300`}
              onClick={() => setActiveTab('general')}
            >
              General Inquiry
            </button>
            <button
              className={`px-6 py-3 rounded-full cursor-pointer ${
                activeTab === 'funding'
                  ? 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors duration-300`}
              onClick={() => setActiveTab('funding')}
            >
              Funding Programs
            </button>
            <button
              className={`px-6 py-3 rounded-full cursor-pointer ${
                activeTab === 'support'
                  ? 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors duration-300`}
              onClick={() => setActiveTab('support')}
            >
              Technical Support
            </button>
            <button
              className={`px-6 py-3 rounded-full cursor-pointer ${
                activeTab === 'billing'
                  ? 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors duration-300`}
              onClick={() => setActiveTab('billing')}
            >
              Billing & Payments
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div className="flex flex-col justify-start">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {activeTab === 'general' && 'Get In Touch'}
                {activeTab === 'funding' && 'Funding Programs Inquiry'}
                {activeTab === 'support' && 'Technical Support'}
                {activeTab === 'billing' && 'Billing & Payments'}
              </h2>
              
              <p className="text-lg text-gray-700 mb-8">
                {activeTab === 'general' && 'Have questions about our programs? Ready to take the next step in your trading journey with Fortune Edge Funding? Our team is here to help. Whether you\'re exploring funding opportunities or need support, we\'re just a message away.'}
                {activeTab === 'funding' && 'Interested in our 1 Step Fortune or Instant Funding programs? Our funding specialists can guide you through the options and help you choose the best account size and type for your trading style.'}
                {activeTab === 'support' && 'Experiencing technical issues with your funded account? Our support team is available to assist with platform questions, trading conditions, and any other technical concerns you may have.'}
                {activeTab === 'billing' && 'Questions about your subscription, payment methods, or billing details? Our billing department is here to assist with any payment-related inquiries you may have.'}
              </p>
              
              <div className="mt-auto space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-md flex items-center justify-center mr-4">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <a href="mailto:support@fortuneedgefunding.com" className="text-lg font-medium hover:text-blue-600 transition-colors">
                      {activeTab === 'general' && 'support@fortuneedgefunding.com'}
                      {activeTab === 'funding' && 'funding@fortuneedgefunding.com'}
                      {activeTab === 'support' && 'techsupport@fortuneedgefunding.com'}
                      {activeTab === 'billing' && 'billing@fortuneedgefunding.com'}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-md flex items-center justify-center mr-4">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500">Response Time</p>
                    <p className="text-lg font-medium">
                      {activeTab === 'general' && 'Within 1 hour'}
                      {activeTab === 'funding' && 'Within 12 hours'}
                      {activeTab === 'support' && 'Within 6 hours'}
                      {activeTab === 'billing' && 'Within 24 hours'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-md flex items-center justify-center mr-4">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500">Address</p>
                    <address className="not-italic text-lg font-medium">
                      Barton Court, 56 High Street, Canterbury,
                      Kent, England, CT1 2AZ
                    </address>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Form */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Let's Start Your Journey</h2>
              
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="text-green-500" size={64} />
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">Thank You!</h3>
                  <p className="text-green-600 text-lg">
                    Your message has been received. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="fullName" className="block text-lg font-medium text-gray-900 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-lg font-medium text-gray-900 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-lg font-medium text-gray-900 mb-2">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-lg font-medium text-gray-900 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter subject"
                        className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="inquiry" className="block text-lg font-medium text-gray-900 mb-2">
                      How Can We Help You?
                    </label>
                    <textarea
                      id="inquiry"
                      name="inquiry"
                      value={formData.inquiry}
                      onChange={handleChange}
                      placeholder="Please provide details about your inquiry..."
                      rows="5"
                      className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-lg font-medium text-gray-900 mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === 'email'}
                          onChange={handleChange}
                          className="form-radio text-blue-500"
                        />
                        <span className="ml-2">Email</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === 'phone'}
                          onChange={handleChange}
                          className="form-radio text-blue-500"
                        />
                        <span className="ml-2">Phone</span>
                      </label>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 hover:opacity-90 text-white font-medium py-4 rounded-lg transition-all duration-300 cursor-pointer"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Trading Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of funded traders who have already taken the first step toward financial freedom with Fortune Edge Funding.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={"/pricing"} className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-300">
              View Funding Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}