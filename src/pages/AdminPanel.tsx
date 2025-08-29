
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Book, School, Activity, Users } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { isAdmin } = useRoleCheck();
  
  // Redirect if not an admin
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-academy-50 to-white py-8">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage users, resources, and system settings</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-gray-500">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resources</CardTitle>
                <Book className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,427</div>
                <p className="text-xs text-gray-500">+8% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
                <School className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">64</div>
                <p className="text-xs text-gray-500">+2 new this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
                <Activity className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-gray-500">7 pending approval</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="users" className="space-y-4">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Add, edit, or remove users and manage their roles.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <Button className="bg-academy-600 hover:bg-academy-700">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add New User
                    </Button>
                  </div>
                  
                  <div className="border rounded-md">
                    <div className="p-4 font-medium bg-gray-50 border-b">
                      User data would be loaded and displayed here
                    </div>
                    <div className="p-8 text-center text-gray-500">
                      This is a mockup. In a real implementation, this would fetch and display user data.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Management</CardTitle>
                  <CardDescription>Manage academic resources available in the system.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-8 text-center text-gray-500">
                    Resource management functionality would go here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="requests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Request Management</CardTitle>
                  <CardDescription>Review and respond to resource requests.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-8 text-center text-gray-500">
                    Request management functionality would go here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system-wide settings.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-8 text-center text-gray-500">
                    Settings configuration would go here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
