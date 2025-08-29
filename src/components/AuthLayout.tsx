
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="py-4 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center">
            <BookOpen className="h-8 w-8 text-academy-600" />
            <span className="ml-2 text-xl font-bold text-academy-900">Scholar Nexus</span>
          </Link>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      <div className="py-4 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Scholar Nexus. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
