
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Search, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResourceCard, { ResourceProps } from '@/components/ResourceCard';
import ForumPreview from '@/components/ForumPreview';
import { getFeaturedResources } from '@/services/resourceService';

const Index: React.FC = () => {
  const [featuredResources, setFeaturedResources] = useState<ResourceProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const resources = await getFeaturedResources(3);
        setFeaturedResources(resources);
        setLoading(false);
      } catch (error) {
        console.error('Error loading resources:', error);
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-academy-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Unlock the power of academic knowledge
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Access thousands of research papers, books, and courses from top universities and research institutions worldwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/browse" className="flex-1">
                  <Button className="w-full bg-academy-600 hover:bg-academy-700 text-white py-6">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Explore Resources
                  </Button>
                </Link>
                <Link to="/request" className="flex-1">
                  <Button variant="outline" className="w-full py-6">
                    <Calendar className="mr-2 h-5 w-5" />
                    Request Materials
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input 
                  type="text" 
                  placeholder="Search for resources by title, author, or topic..."
                  className="pl-10 py-6 text-lg"
                />
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-[450px] h-[300px] bg-academy-100 rounded-xl shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                    alt="Academic resources"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-academy-500 rounded-xl transform rotate-12 opacity-20"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-academy-700 rounded-full transform -rotate-12 opacity-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Resources</h2>
              <p className="text-gray-600 mt-2">Discover high-quality academic materials curated by our team</p>
            </div>
            <Link to="/browse">
              <Button variant="outline" className="hidden md:flex">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 border rounded-lg animate-pulse h-64">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredResources.map((resource) => (
                <ResourceCard key={resource.id} {...resource} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/browse">
              <Button variant="outline">
                View All Resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Browse by Category */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={`/browse?category=${encodeURIComponent(category.name)}`}
                className="flex flex-col items-center p-6 border bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-16 h-16 flex items-center justify-center rounded-full ${category.bgColor} mb-4`}>
                  <category.icon className={`h-8 w-8 ${category.iconColor}`} />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500 text-center mt-2">{category.count} resources</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Forum Discussions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Community Discussions</h2>
              <p className="text-gray-600 mt-2">Join conversations with peers and experts in your field</p>
            </div>
          </div>
          
          <ForumPreview />
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-academy-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Request specific academic resources and our team will help you find them.
          </p>
          <Link to="/request">
            <Button variant="outline" className="bg-white text-academy-600 hover:bg-gray-100 hover:text-academy-700 border-white">
              <Calendar className="mr-2 h-5 w-5" />
              Request Resources
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Sample category data
const categories = [
  { 
    name: 'Computer Science', 
    icon: BookOpen, 
    bgColor: 'bg-blue-100', 
    iconColor: 'text-blue-600',
    count: 1245
  },
  { 
    name: 'Medicine & Health', 
    icon: BookOpen, 
    bgColor: 'bg-red-100', 
    iconColor: 'text-red-600',
    count: 983
  },
  { 
    name: 'Engineering', 
    icon: BookOpen, 
    bgColor: 'bg-yellow-100', 
    iconColor: 'text-yellow-600',
    count: 756
  },
  { 
    name: 'Physics', 
    icon: BookOpen, 
    bgColor: 'bg-purple-100', 
    iconColor: 'text-purple-600',
    count: 612
  },
  { 
    name: 'Mathematics', 
    icon: BookOpen, 
    bgColor: 'bg-green-100', 
    iconColor: 'text-green-600',
    count: 547
  },
  { 
    name: 'Social Sciences', 
    icon: BookOpen, 
    bgColor: 'bg-orange-100', 
    iconColor: 'text-orange-600',
    count: 428
  },
  { 
    name: 'Arts & Humanities', 
    icon: BookOpen, 
    bgColor: 'bg-pink-100', 
    iconColor: 'text-pink-600',
    count: 312
  },
  { 
    name: 'Economics', 
    icon: BookOpen, 
    bgColor: 'bg-teal-100', 
    iconColor: 'text-teal-600',
    count: 289
  },
];

export default Index;
