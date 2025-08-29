
import React from 'react';
import { Link } from 'react-router-dom';
import { BookMarked, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BookmarksEmptyState: React.FC = () => {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle>No Bookmarks Yet</CardTitle>
        <CardDescription>
          You haven't bookmarked any resources yet.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex flex-col items-center justify-center py-8">
        <BookMarked className="h-16 w-16 text-gray-300 mb-4" />
        <p className="text-center text-gray-500 max-w-md mb-4">
          Bookmark your favorite academic resources to easily access them later. 
          Click the bookmark icon on any resource to save it to your collection.
        </p>
        
        <Link to="/browse">
          <Button className="bg-academy-600 hover:bg-academy-700">
            Browse Resources
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
      
      <CardFooter className="border-t bg-muted/50 px-6 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <BookMarked className="h-4 w-4" />
          <span>Tip: Use bookmarks to organize resources for different research projects or courses</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookmarksEmptyState;
