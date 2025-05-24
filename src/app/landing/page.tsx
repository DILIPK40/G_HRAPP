import React from 'react';
import LandingLayout from '@/components/landing/landing-layout';

export default function LandingPage() {
 return (
 <LandingLayout>
      {/* Header */}
      <header className="bg-white shadow-lg py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Company Name/Logo */}
          <div className="text-2xl font-extrabold text-blue-700">My Company</div>
          {/* Navigation */}
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-700 hover:text-blue-700 transition duration-300 ease-in-out">Home</a></li>
              <li><a href="#about" className="text-gray-700 hover:text-blue-700 transition duration-300 ease-in-out">About Us</a></li>
              <li><a href="#contact" className="text-gray-700 hover:text-blue-700 transition duration-300 ease-in-out">Contact</a></li>
              <li><a href="/auth/staff/login" className="text-blue-700 hover:text-blue-900 font-semibold transition duration-300 ease-in-out">Employee Login</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-32 text-center overflow-hidden">
          {/* Placeholder Background Image */}
          {/* <div className="absolute inset-0 z-0">
            <img src="placeholder-hero-bg.jpg" alt="Company Background" className="w-full h-full object-cover opacity-30"/>
          </div> */}
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fadeInDown">
              Welcome to <span className="text-yellow-300">My Company</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 animate-fadeInUp">
              Your trusted partner in modern Human Resources solutions.
            </p>
            {/* Call to Action Button */}
            <a href="#about" className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out animate-bounceIn">
              Learn More About Us
            </a>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* About Text */}
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">About My Company</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            {/* Placeholder About Image */}
            <div className="flex justify-center">
              {/* <img src="placeholder-about-image.jpg" alt="About Company" className="rounded-lg shadow-xl max-h-96 object-cover"/> */}
              <div className="bg-gray-300 rounded-lg shadow-xl w-full h-64 md:h-96 flex items-center justify-center text-gray-600">Placeholder Image</div>
            </div>
          </div>
        </section>

        {/* You can add more sections here: Services, Features, Contact, etc. */}
        {/* Example Services Section */}
        {/* <section id="services" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">Employee Management</h3>
                <p className="text-gray-600">Streamline your employee data and workflows.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">Absence Tracking</h3>
                <p className="text-gray-600">Easily manage and approve employee absences.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">Department Organization</h3>
                <p className="text-gray-600">Organize your company into clear departments.</p>
              </div>
            </div>
          </div>
        </section> */}

         {/* Placeholder Contact Section */}
         <section id="contact" className="py-20 bg-blue-700 text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
                <p className="text-xl mb-8">We'd love to hear from you. Contact us for a demo or more information.</p>
                {/* Replace with a contact form or contact details */}
                <p className="text-lg">Email: info@mycompany.com | Phone: (123) 456-7890</p>
            </div>
         </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
        </div>
      </footer>
 </LandingLayout>
 );
}