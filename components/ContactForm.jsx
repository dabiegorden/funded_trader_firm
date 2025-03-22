'use client';

import React, { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    inquiry: ''
  });

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
    // Reset form after submission
    setFormData({ fullName: '', email: '', inquiry: '' });
    // Show success message or redirect
  };

  return (
    <section className="py-16 px-4 border-t border-gray-100 bg-white mb-16 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div className="flex flex-col justify-start">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            
            <p className="text-lg text-gray-700 mb-8">
              Have questions about our funding programs?<br />
              Ready to take the next step in your trading journey with Fortune Edge Funding?<br /> 
              Our team is here to help. Whether you're exploring funding opportunities or need 
              support, we're just a message away. Reach out to us, and we'll get back to you promptly. 
              Your success is our priority.
            </p>
            
            <div className="mt-auto space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-md flex items-center justify-center mr-4">
                  <Mail className="text-white" size={24} />
                </div>
                <a href="mailto:support@fortuneedgefunding.com" className="text-lg font-medium hover:text-blue-600 transition-colors">
                  support@fortuneedgefunding.com
                </a>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-md flex items-center justify-center mr-4">
                  <MapPin className="text-white" size={24} />
                </div>
                <address className="not-italic text-lg font-medium">
                Barton Court, 56 High Street, Canterbury, Kent, UK, CT1 2AZ
                </address>
              </div>
            </div>
          </div>
          
          {/* Right Column - Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Let's Start Your Journey</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="fullName" className="block text-lg font-medium text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full px-4 py-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-lg font-medium text-gray-900 mb-2">
                  E-Mail ID
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter E-Mail ID"
                  className="w-full px-4 py-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-8">
                <label htmlFor="inquiry" className="block text-lg font-medium text-gray-900 mb-2">
                  What is your Inquiry about?
                </label>
                <textarea
                  id="inquiry"
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleChange}
                  placeholder="Enter your message here"
                  rows="4"
                  className="w-full px-4 py-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 hover:bg-blue-500 text-white font-medium py-4 rounded-lg transition-colors duration-300 cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;