
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-academy-600" />
              <span className="ml-2 text-xl font-bold text-academy-900">Scholar Nexus</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Democratizing access to academic resources for students, researchers, and educators worldwide.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Email</span>
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Resources column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/browse" className="text-base text-gray-600 hover:text-academy-600">
                  Browse All
                </Link>
              </li>
              <li>
                <Link to="/browse?type=paper" className="text-base text-gray-600 hover:text-academy-600">
                  Research Papers
                </Link>
              </li>
              <li>
                <Link to="/browse?type=book" className="text-base text-gray-600 hover:text-academy-600">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/browse?type=course" className="text-base text-gray-600 hover:text-academy-600">
                  Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Community column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Community</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/forum" className="text-base text-gray-600 hover:text-academy-600">
                  Forums
                </Link>
              </li>
              <li>
                <Link to="/request" className="text-base text-gray-600 hover:text-academy-600">
                  Request Resources
                </Link>
              </li>
              <li>
                <Link to="/contributors" className="text-base text-gray-600 hover:text-academy-600">
                  Contributors
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-base text-gray-600 hover:text-academy-600">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-base text-gray-600 hover:text-academy-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-base text-gray-600 hover:text-academy-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-600 hover:text-academy-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/copyright" className="text-base text-gray-600 hover:text-academy-600">
                  Copyright
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Scholar Nexus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
