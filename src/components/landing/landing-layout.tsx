import React, { ReactNode } from 'react';

interface LandingLayoutProps {
  children: ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        {/* Placeholder for header content, like company name and navigation */}
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-xl font-bold">My Company</span>
          <nav>
            {/* Placeholder for navigation links */}
            <a href="#" className="text-white hover:text-gray-300 ml-4">Home</a>
            <a href="#" className="text-white hover:text-gray-300 ml-4">About</a>
            <a href="#" className="text-white hover:text-gray-300 ml-4">Contact</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        {/* Placeholder for footer content */}
        <div className="container mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} My Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;