
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ResourceType } from './ResourceCard';
import { LibraryBig, AlertCircle, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ResourceRequestForm: React.FC = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    type: 'paper' as ResourceType,
    publisher: '',
    year: '',
    link: '',
    description: '',
    priority: 'medium',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show success toast
    toast({
      title: "Request Submitted",
      description: "Your resource request has been submitted successfully.",
      duration: 5000,
    });
    
    // Show success state
    setSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setFormData({
        title: '',
        authors: '',
        type: 'paper',
        publisher: '',
        year: '',
        link: '',
        description: '',
        priority: 'medium',
      });
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6 pb-8 flex flex-col items-center justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-center mb-2">Request Submitted!</h2>
          <p className="text-center text-gray-600 max-w-md">
            Your resource request has been received. We'll notify you once it's been processed.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="bg-academy-50 p-3 rounded-full">
            <LibraryBig className="h-6 w-6 text-academy-700" />
          </div>
          <div>
            <CardTitle className="text-2xl">Request a Resource</CardTitle>
            <CardDescription className="mt-1">
              Request academic materials not currently available in our repository.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Resource Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter the full title of the resource"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="authors">
              Author(s) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="authors"
              name="authors"
              placeholder="Enter author names (separated by commas)"
              value={formData.authors}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">
                Resource Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paper">Research Paper</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="course">Course</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="publisher">Publisher/Journal</Label>
              <Input
                id="publisher"
                name="publisher"
                placeholder="Publisher or journal name"
                value={formData.publisher}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Publication Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                placeholder="Publication year"
                value={formData.year}
                onChange={handleChange}
                min="1800"
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="link">Resource Link (if available)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger type="button">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      If you have found the resource online, please provide the URL.
                      This helps us locate and verify the resource.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="link"
              name="link"
              type="url"
              placeholder="https://example.com/resource"
              value={formData.link}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Why do you need this resource? <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Briefly explain why this resource would be valuable to you and others"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Request Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => handleSelectChange('priority', value)}
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Nice to have</SelectItem>
                <SelectItem value="medium">Medium - Would be helpful</SelectItem>
                <SelectItem value="high">High - Needed for current work</SelectItem>
                <SelectItem value="urgent">Urgent - Critical for deadline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" type="button">Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          className="bg-academy-600 hover:bg-academy-700"
        >
          <Send className="h-4 w-4 mr-2" />
          Submit Request
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceRequestForm;
