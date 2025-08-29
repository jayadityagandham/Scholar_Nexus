
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { MessageSquare, ChevronLeft, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewDiscussionPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    tags: '',
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
    
    // Basic validation
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a discussion title.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.category) {
      toast({
        title: "Error",
        description: "Please select a category.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: "Error",
        description: "Please enter your discussion content.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Submitting discussion:', formData);
      
      toast({
        title: "Success",
        description: "Your discussion thread has been created.",
      });
      
      // Navigate back to forums
      navigate('/forum');
    }, 1500);
  };

  const categories = [
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
            <button 
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-gray-600 hover:text-academy-600 mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Forums
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Start a New Discussion
            </h1>
            <p className="text-gray-600 mb-6">
              Share your questions, ideas, or research with the academic community
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Create Discussion</CardTitle>
              <CardDescription>
                Start a new thread in the forum to engage with other scholars
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Discussion Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a clear, specific title for your discussion"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">
                    Discussion Content <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Provide details, context, and your question or topic for discussion"
                    value={formData.content}
                    onChange={handleChange}
                    rows={8}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (separated by commas)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="e.g., research methods, data analysis, beginner"
                    value={formData.tags}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-gray-500">
                    Adding relevant tags will help others find your discussion
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t pt-6">
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-academy-600 hover:bg-academy-700"
                  disabled={isSubmitting}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Posting...' : 'Post Discussion'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewDiscussionPage;
