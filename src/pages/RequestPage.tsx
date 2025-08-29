
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResourceRequestForm from '@/components/ResourceRequestForm';
import { Calendar, CheckCircle, HelpCircle, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const RequestPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-b from-academy-50 to-white py-8">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Request Academic Resources</h1>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Submit a request for specific academic materials.
            </p>
          </div>
        </div>
        
        {/* Main content */}
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <ResourceRequestForm />
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-white border rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="text-xl font-semibold mb-4">How It Works</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-academy-50 p-2 rounded-full mt-1">
                      <Calendar className="h-5 w-5 text-academy-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Submit a Request</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Fill out the form with details about the academic resource you need.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-academy-50 p-2 rounded-full mt-1">
                      <Clock className="h-5 w-5 text-academy-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Review Process</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Our team reviews your request and searches for the resource across our networks.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-academy-50 p-2 rounded-full mt-1">
                      <CheckCircle className="h-5 w-5 text-academy-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Resource Delivery</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        If found, the resource will be added to our library and you'll be notified.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="bg-academy-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-academy-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Need Help?</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        If you have any questions about the request process, check our FAQ or contact our support team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RequestPage;
