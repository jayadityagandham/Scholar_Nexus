import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Users, 
  Search, 
  Flame, 
  Clock, 
  Bookmark, 
  MessageCircle, 
  Plus 
} from 'lucide-react';

interface ForumTopicProps {
  id: string;
  title: string;
  category: string;
  lastPost: {
    author: string;
    date: string;
    avatarUrl?: string;
  };
  replies: number;
  views: number;
  isPinned?: boolean;
  isNew?: boolean;
}

const Forum: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState('all');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search for:', searchValue);
  };

  const topics: ForumTopicProps[] = [
    {
      id: '1',
      title: 'Resources for Machine Learning fundamentals?',
      category: 'Computer Science',
      lastPost: {
        author: 'Alex Johnson',
        date: '2 hours ago',
        avatarUrl: '',
      },
      replies: 12,
      views: 143,
      isNew: true,
    },
    {
      id: '2',
      title: 'Looking for recent papers on climate change impact on marine ecosystems',
      category: 'Biology',
      lastPost: {
        author: 'Maria Chen',
        date: '1 day ago',
        avatarUrl: '',
      },
      replies: 5,
      views: 87,
    },
    {
      id: '3',
      title: 'Recommendations for quantum physics textbooks for beginners?',
      category: 'Physics',
      lastPost: {
        author: 'David Kim',
        date: '3 days ago',
        avatarUrl: '',
      },
      replies: 18,
      views: 220,
    },
    {
      id: '4',
      title: 'Tips for writing a strong research methodology section?',
      category: 'Academic Writing',
      lastPost: {
        author: 'Sarah Williams',
        date: '5 days ago',
        avatarUrl: '',
      },
      replies: 24,
      views: 312,
      isPinned: true,
    },
    {
      id: '5',
      title: 'Seeking collaboration on cognitive psychology research project',
      category: 'Psychology',
      lastPost: {
        author: 'James Peterson',
        date: '1 week ago',
        avatarUrl: '',
      },
      replies: 7,
      views: 156,
    },
  ];

  const categories = [
    'All Categories',
    'General Discussion',
    'Research Help',
    'Study Resources',
    'Academic Writing',
    'Career Advice',
    'Computer Science',
    'Mathematics',
    'Physics',
    'Biology',
    'Chemistry',
    'Social Sciences',
    'Arts & Humanities',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-academy-50 to-white py-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <MessageCircle className="h-8 w-8" />
                  Forum Discussions
                </h1>
                <p className="text-gray-600">
                  Connect with other scholars to ask questions and share insights
                </p>
              </div>
              
              <Button 
                onClick={() => navigate('/forum/new')}
                className="bg-academy-600 hover:bg-academy-700 md:self-start"
              >
                <Plus className="h-4 w-4 mr-2" />
                Start New Discussion
              </Button>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </form>
              
              <div className="w-full sm:w-48">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-8">
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                All Discussions
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex-1">
                <Flame className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex-1">
                <Clock className="h-4 w-4 mr-2" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="bookmarked" className="flex-1">
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmarked
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">All Discussions</CardTitle>
                  <CardDescription>
                    Browse all forum topics across different academic fields
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {topics.map((topic) => (
                      <div 
                        key={topic.id} 
                        className={`py-4 px-6 hover:bg-gray-50 ${topic.isPinned ? 'bg-amber-50' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center">
                              {topic.isPinned && (
                                <Badge variant="outline" className="mr-2 border-amber-500 text-amber-600">
                                  Pinned
                                </Badge>
                              )}
                              <Link 
                                to={`/forum/topic/${topic.id}`} 
                                className="text-base font-medium text-gray-900 hover:text-academy-600 flex items-center"
                              >
                                {topic.title}
                                {topic.isNew && (
                                  <Badge className="ml-2 bg-green-500 text-white text-xs">New</Badge>
                                )}
                              </Link>
                            </div>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <Badge variant="outline" className="mr-2 font-normal">
                                {topic.category}
                              </Badge>
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                <span className="mr-3">{topic.replies} replies</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                <span>{topic.views} views</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <div className="flex items-center justify-end">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={topic.lastPost.avatarUrl} />
                                <AvatarFallback>{topic.lastPost.author.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-gray-600">{topic.lastPost.author}</span>
                            </div>
                            <div className="text-gray-500 text-xs mt-1">
                              {topic.lastPost.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trending" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Trending Discussions</CardTitle>
                  <CardDescription>
                    Popular discussions with high engagement in the last week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-gray-500">
                    Trending discussions will appear here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Recent Discussions</CardTitle>
                  <CardDescription>
                    The newest discussions started in the forum
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-gray-500">
                    Recent discussions will appear here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bookmarked" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Bookmarked Discussions</CardTitle>
                  <CardDescription>
                    Discussions you've saved for future reference
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bookmark className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-center text-gray-500 mb-4 max-w-md">
                    You haven't bookmarked any discussions yet. 
                    Click the bookmark icon on any discussion to save it here.
                  </p>
                  <Button
                    onClick={() => navigate('/forum')}
                    variant="outline"
                  >
                    Browse All Discussions
                  </Button>
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

export default Forum;
