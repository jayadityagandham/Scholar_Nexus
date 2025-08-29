
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  isNew?: boolean;
}

const ForumPreview: React.FC = () => {
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
  ];

  return (
    <Card className="academy-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Discussion Forums</CardTitle>
          <CardDescription>Recent conversations in the academic community</CardDescription>
        </div>
        <Link to="/forum">
          <Button variant="outline" size="sm" className="gap-1">
            All Forums
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="px-0">
        <div className="divide-y">
          {topics.map((topic) => (
            <div key={topic.id} className="py-3 px-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link 
                    to={`/forum/topic/${topic.id}`} 
                    className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-academy-600 flex items-center"
                  >
                    {topic.title}
                    {topic.isNew && (
                      <Badge className="ml-2 bg-green-500 text-white text-xs">New</Badge>
                    )}
                  </Link>
                  <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
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
                    <span className="text-gray-600 dark:text-gray-300">{topic.lastPost.author}</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    {topic.lastPost.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Link to="/forum/new" className="w-full">
          <Button className="w-full bg-academy-600 hover:bg-academy-700">
            <MessageSquare className="h-4 w-4 mr-2" />
            Start a New Discussion
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForumPreview;
