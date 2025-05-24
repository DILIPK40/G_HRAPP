import React from 'react';

export default function LandingPage() {
 return (
 <div className="min-h-screen bg-gray-100">
 {/* Header */}
 <header className="bg-white shadow-md">
 <div className="container mx-auto px-4 py-6 flex justify-between items-center">
 <div className="text-2xl font-bold text-gray-800">My Company</div>
 <nav>
 <ul className="flex space-x-4">
 <li><a href="#" className="text-gray-600 hover:text-blue-600">Home</a></li>
 <li><a href="#" className="text-gray-600 hover:text-blue-600">About Us</a></li>
 <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact</a></li>
 <li><a href="/auth/staff/login" className="text-gray-600 hover:text-blue-600">Employee Login</a></li>
 <li><a href="/auth/staff/login" className="text-gray-600 hover:text-blue-600">Employee Login</a></li>
 </ul>
 </nav>
 </div>
 </header>

 {/* Main Content */}
 <main>
 {/* Hero Section */}
 <section className="hero bg-blue-600 text-white py-20 text-center">
 <div className="container mx-auto px-4">
 <h1 className="text-4xl font-bold mb-4">Welcome to My Company</h1>
 <p className="text-xl">Your partner in human resources solutions.</p>
 </div>
 </section>

 {/* About Us Section */}
 <section className="about-us py-16">
 <div className="container mx-auto px-4">
 <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">About Us</h2>
 <p className="text-gray-700 text-lg leading-relaxed">
 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
 </p>
 </div>
 </section>
 </main>
 </div>
 );
}