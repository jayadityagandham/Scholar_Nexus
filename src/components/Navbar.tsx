
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Search, 
  Menu, 
  X,
  UserCircle,
  MessageSquare,
  Calendar,
  LogOut,
  Shield,
  GraduationCap
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedIn, SignedOut, useUser, useClerk } from '@clerk/clerk-react';
import { useRoleCheck } from '@/hooks/useRoleCheck';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const { isAdmin, isFaculty } = useRoleCheck();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignOut = () => {
    signOut(() => navigate('/'));
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-academy-600" />
              <span className="ml-2 text-xl font-bold text-academy-900">Scholar Nexus</span>
            </Link>
          </div>

          {/* Search bar (hidden on mobile) */}
          <div className="hidden md:flex md:items-center md:w-1/3 lg:w-1/2">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                type="text" 
                placeholder="Search for resources..." 
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Main navigation (hidden on mobile) */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/browse" className="text-gray-600 hover:text-academy-600 px-3 py-2 rounded-md text-sm font-medium">
              Browse
            </Link>
            
            <SignedIn>
              {/* Role-specific navigation links */}
              {isAdmin() && (
                <Link to="/admin" className="text-gray-600 hover:text-academy-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  Admin
                </Link>
              )}
              
              {isFaculty() && (
                <Link to="/faculty" className="text-gray-600 hover:text-academy-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  Faculty
                </Link>
              )}
              
              <Link to="/forum" className="text-gray-600 hover:text-academy-600 px-3 py-2 rounded-md text-sm font-medium">
                Forums
              </Link>
              <Link to="/request" className="text-gray-600 hover:text-academy-600 px-3 py-2 rounded-md text-sm font-medium">
                Request
              </Link>
            </SignedIn>
            
            {/* Authentication controls */}
            <SignedIn>
              {/* User dropdown - show when signed in */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <UserCircle className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user?.firstName || 'Account'}
                    {user?.emailAddresses && user.emailAddresses.length > 0 && (
                      <div className="text-xs font-normal text-muted-foreground">
                        {user.emailAddresses[0].emailAddress}
                      </div>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* Role-specific dropdown items */}
                  {isAdmin() && (
                    <DropdownMenuItem>
                      <Link to="/admin" className="flex w-full items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  {isFaculty() && (
                    <DropdownMenuItem>
                      <Link to="/faculty" className="flex w-full items-center">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Faculty Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex w-full">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/bookmarks" className="flex w-full">Bookmarks</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleSignOut}>
                    <div className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedIn>
            
            <SignedOut>
              {/* Show sign-in buttons when signed out */}
              <div className="flex items-center space-x-2">
                <Link to="/sign-in">
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <Link to="/sign-up">
                  <Button className="bg-academy-600 hover:bg-academy-700">Sign up</Button>
                </Link>
              </div>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="pt-2 pb-3 space-y-1 px-4">
            {/* Search bar on mobile */}
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                type="text" 
                placeholder="Search for resources..." 
                className="pl-10 w-full"
              />
            </div>
            
            <Link 
              to="/browse" 
              className="flex items-center text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen className="mr-3 h-5 w-5" />
              Browse
            </Link>
            
            <SignedIn>
              {/* Role-specific mobile navigation */}
              {isAdmin() && (
                <Link 
                  to="/admin" 
                  className="flex items-center text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Shield className="mr-3 h-5 w-5" />
                  Admin Dashboard
                </Link>
              )}
              
              {isFaculty() && (
                <Link 
                  to="/faculty" 
                  className="flex items-center text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <GraduationCap className="mr-3 h-5 w-5" />
                  Faculty Dashboard
                </Link>
              )}
              
              <Link 
                to="/forum" 
                className="flex items-center text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                Forums
              </Link>
              
              <Link 
                to="/request" 
                className="flex items-center text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Calendar className="mr-3 h-5 w-5" />
                Request
              </Link>
            </SignedIn>
            
            {/* Mobile authentication menu */}
            <SignedIn>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <UserCircle className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user?.firstName || 'User'} {user?.lastName || ''}
                    </div>
                    {user?.emailAddresses && user.emailAddresses.length > 0 && (
                      <div className="text-sm font-medium text-gray-500">
                        {user.emailAddresses[0].emailAddress}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Link 
                    to="/profile" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/bookmarks" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Bookmarks
                  </Link>
                  <button 
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleSignOut();
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </SignedIn>
            
            <SignedOut>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/sign-in"
                    className="block w-full text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/sign-up"
                    className="block w-full text-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-academy-600 hover:bg-academy-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
