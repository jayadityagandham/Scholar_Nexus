
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProfileUserInfo from '@/components/ProfileUserInfo';
import ProfileEditForm from '@/components/ProfileEditForm';
import UserSettings from '@/components/UserSettings';
import BookmarksEmptyState from '@/components/BookmarksEmptyState';
import { useToast } from '@/hooks/use-toast';
import { BookMarked, FileText, SendHorizonal } from 'lucide-react';

interface UserProfile {
  fullName: string;
  email: string;
  bio: string;
  institution: string;
  department: string;
  position: string;
  avatar?: string;
  joinDate: string;
}

const ProfilePage: React.FC = () => {
  const { toast } = useToast();
  
  // Mock user profile data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: 'Dr. Jane Smith',
    email: 'jane.smith@university.edu',
    bio: 'Professor of Computer Science with a focus on Machine Learning and Artificial Intelligence.',
    institution: 'University of Technology',
    department: 'Computer Science',
    position: 'Associate Professor',
    avatar: 'https://i.pravatar.cc/300?img=47',
    joinDate: 'March 2023',
  });
  
  // Tabs state
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile view mode state (view/edit/settings)
  const [profileMode, setProfileMode] = useState<'view' | 'edit' | 'settings'>('view');
  
  // Handle profile update
  const handleProfileUpdate = (updatedData: any) => {
    setUserProfile(prev => ({
      ...prev,
      ...updatedData,
    }));
    setProfileMode('view');
  };
  
  // Handle settings update
  const handleSettingsUpdate = (settings: any) => {
    toast({
      title: "Settings updated",
      description: "Your preferences have been saved successfully.",
    });
    setProfileMode('view');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content area with Tabs component wrapping everything */}
          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Sidebar with tab triggers */}
            <div className="md:col-span-1">
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <TabsList className="grid grid-cols-1 mb-4">
                    <TabsTrigger value="profile">My Profile</TabsTrigger>
                    <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
                    <TabsTrigger value="contributions">Contributions</TabsTrigger>
                    <TabsTrigger value="requests">Resource Requests</TabsTrigger>
                  </TabsList>
                  
                  {activeTab === 'profile' && profileMode === 'view' && (
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setProfileMode('edit')}
                      >
                        Edit Profile
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setProfileMode('settings')}
                      >
                        Settings
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Main content area with tab contents */}
            <div className="md:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <TabsContent value="profile" className="mt-0">
                    {profileMode === 'view' && (
                      <ProfileUserInfo user={userProfile} />
                    )}
                    
                    {profileMode === 'edit' && (
                      <>
                        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                        <ProfileEditForm 
                          initialData={userProfile}
                          onSave={handleProfileUpdate}
                        />
                        <div className="mt-4 flex justify-end">
                          <Button 
                            variant="outline" 
                            onClick={() => setProfileMode('view')}
                            className="mr-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    )}
                    
                    {profileMode === 'settings' && (
                      <>
                        <h2 className="text-2xl font-bold mb-4">User Settings</h2>
                        <UserSettings 
                          onSave={handleSettingsUpdate}
                        />
                        <div className="mt-4 flex justify-end">
                          <Button 
                            variant="outline" 
                            onClick={() => setProfileMode('view')}
                            className="mr-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="bookmarks" className="mt-0">
                    <h2 className="text-2xl font-bold mb-4">My Bookmarks</h2>
                    <BookmarksEmptyState />
                  </TabsContent>
                  
                  <TabsContent value="contributions" className="mt-0">
                    <h2 className="text-2xl font-bold mb-4">My Contributions</h2>
                    <div className="text-center py-12">
                      <FileText className="h-16 w-16 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900">No contributions yet</h3>
                      <p className="text-gray-500 mt-1 mb-4">
                        You haven't added any resources or discussions yet.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button className="bg-academy-600 hover:bg-academy-700">
                          <BookMarked className="h-4 w-4 mr-2" />
                          Add Resource
                        </Button>
                        <Button className="bg-academy-600 hover:bg-academy-700">
                          <SendHorizonal className="h-4 w-4 mr-2" />
                          Start Discussion
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="requests" className="mt-0">
                    <h2 className="text-2xl font-bold mb-4">My Resource Requests</h2>
                    <div className="text-center py-12">
                      <SendHorizonal className="h-16 w-16 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900">No requests yet</h3>
                      <p className="text-gray-500 mt-1 mb-4">
                        You haven't submitted any resource requests yet.
                      </p>
                      <Button className="bg-academy-600 hover:bg-academy-700">
                        Request a Resource
                      </Button>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
