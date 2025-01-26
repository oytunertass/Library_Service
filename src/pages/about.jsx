import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Library Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering knowledge sharing through modern library services
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="Easy Book Management"
            description="Browse, borrow, and return books with just a few clicks"
            icon="📚"
          />
          <FeatureCard
            title="Digital Catalog"
            description="Access our entire collection online anytime, anywhere"
            icon="💻"
          />
          <FeatureCard
            title="User-Friendly"
            description="Simple and intuitive interface for all users"
            icon="👥"
          />
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to provide a modern, efficient, and user-friendly library management system 
            that makes knowledge accessible to everyone. We strive to create an environment where 
            learning and discovery are seamlessly integrated with technology.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Library Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 9:00 AM - 8:00 PM<br />
                Saturday: 10:00 AM - 6:00 PM<br />
                Sunday: Closed
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
              <p className="text-gray-600">
                Email: library@example.com<br />
                Phone: (555) 123-4567<br />
                Address: 123 Library Street, City, Country
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Feature Card Component
const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);