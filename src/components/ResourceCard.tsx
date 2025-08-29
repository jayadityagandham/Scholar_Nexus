
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Video, 
  BookMarked, 
  Download, 
  Share2, 
  Star,
  ExternalLink,
  CalendarDays
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type ResourceType = 'paper' | 'book' | 'video' | 'course';
export type AccessLevel = 'open' | 'student' | 'faculty' | 'restricted';

export interface ResourceProps {
  id: string;
  title: string;
  authors: string[];
  type: ResourceType;
  year: number;
  publisher?: string;
  journal?: string;
  category: string[];
  abstract?: string;
  access: AccessLevel;
  citationCount?: number;
  thumbnailUrl?: string;
}

const ResourceCard: React.FC<ResourceProps> = ({
  id,
  title,
  authors,
  type,
  year,
  publisher,
  journal,
  category,
  abstract,
  access,
  citationCount,
  thumbnailUrl,
}) => {
  // Determine icon based on the resource type
  const getResourceIcon = () => {
    switch (type) {
      case 'paper':
        return <FileText className="h-8 w-8 text-academy-500" />;
      case 'book':
        return <BookMarked className="h-8 w-8 text-academy-500" />;
      case 'video':
        return <Video className="h-8 w-8 text-academy-500" />;
      case 'course':
        return <BookOpen className="h-8 w-8 text-academy-500" />;
      default:
        return <FileText className="h-8 w-8 text-academy-500" />;
    }
  };

  // Determine badge color based on access level
  const getAccessBadge = () => {
    switch (access) {
      case 'open':
        return <Badge variant="default" className="bg-green-500">Open Access</Badge>;
      case 'student':
        return <Badge variant="default" className="bg-blue-500">Student Access</Badge>;
      case 'faculty':
        return <Badge variant="default" className="bg-purple-500">Faculty Access</Badge>;
      case 'restricted':
        return <Badge variant="default" className="bg-red-500">Restricted</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="academy-card overflow-hidden h-full flex flex-col">
      <div className="p-4 flex items-center space-x-4">
        <div className="flex-shrink-0">
          {thumbnailUrl ? (
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="w-12 h-12 object-cover rounded-md"
            />
          ) : (
            getResourceIcon()
          )}
        </div>
        <div className="flex-1 min-w-0">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            <Link to={`/resource/${id}`} className="hover:text-academy-600">
              {title}
            </Link>
          </CardTitle>
          <CardDescription className="text-sm mt-1">
            {authors.slice(0, 3).join(", ")}
            {authors.length > 3 && ' et al.'}
          </CardDescription>
        </div>
      </div>
      
      <CardContent className="pt-0 pb-2 flex-grow">
        {abstract && (
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
            {abstract}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2 mb-3">
          {category.slice(0, 3).map((cat, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {cat}
            </Badge>
          ))}
          {category.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{category.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <CalendarDays className="h-3 w-3 mr-1" />
            <span>{year}</span>
          </div>
          
          {citationCount !== undefined && (
            <div className="flex items-center">
              <Star className="h-3 w-3 mr-1" />
              <span>{citationCount} citations</span>
            </div>
          )}
          
          {(publisher || journal) && (
            <div className="truncate max-w-[150px]">
              {publisher || journal}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4 flex justify-between items-center border-t">
        <div>
          {getAccessBadge()}
        </div>
        
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Share2 className="h-4 w-4 mr-1" />
            <span className="sr-only md:not-sr-only md:inline">Share</span>
          </Button>
          <Button size="sm" variant="outline">
            <ExternalLink className="h-4 w-4 mr-1" />
            <span className="sr-only md:not-sr-only md:inline">View</span>
          </Button>
          <Button size="sm" variant="default" className="bg-academy-600 hover:bg-academy-700">
            <Download className="h-4 w-4 mr-1" />
            <span className="sr-only md:not-sr-only md:inline">Download</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
