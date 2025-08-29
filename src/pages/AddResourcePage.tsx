
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
import { Checkbox } from '@/components/ui/checkbox';
import { ResourceType, AccessLevel } from '@/components/ResourceCard';
import { BookOpen, UploadCloud, ChevronLeft, FileText, BookMarked, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AddResourcePage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    type: '' as ResourceType,
    year: new Date().getFullYear().toString(),
    publisher: '',
    journal: '',
    doi: '',
    categories: [] as string[],
    abstract: '',
    access: '' as AccessLevel,
    file: null as File | null,
    externalLink: '',
    tags: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (category: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, category] 
        : prev.categories.filter(c => c !== category)
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files?.[0] || null }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a resource title.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.type) {
      toast({
        title: "Error",
        description: "Please select a resource type.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.authors.trim()) {
      toast({
        title: "Error",
        description: "Please enter at least one author.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.access) {
      toast({
        title: "Error",
        description: "Please select an access level.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.categories.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one category.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.file && !formData.externalLink) {
      toast({
        title: "Error",
        description: "Please either upload a file or provide an external link.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Submitting resource:', formData);
      
      toast({
        title: "Success",
        description: "Your resource has been added successfully and is pending review.",
      });
      
      // Navigate back to browse
      navigate('/browse');
    }, 1500);
  };
  
  // Define all available categories
  const allCategories = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Engineering',
    'Biology',
    'Chemistry',
    'Social Sciences',
    'Arts & Humanities',
    'Medicine',
    'Economics',
    'Law',
    'Psychology',
  ];

  // Function to get icon based on resource type
  const getResourceIcon = () => {
    switch (formData.type) {
      case 'paper':
        return <FileText className="h-12 w-12 text-blue-500" />;
      case 'book':
        return <BookMarked className="h-12 w-12 text-green-500" />;
      case 'video':
        return <Video className="h-12 w-12 text-red-500" />;
      case 'course':
        return <BookOpen className="h-12 w-12 text-amber-500" />;
      default:
        return <BookOpen className="h-12 w-12 text-academy-500" />;
    }
  };

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
              Back
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Add Academic Resource
            </h1>
            <p className="text-gray-600 mb-6">
              Contribute to our repository by adding an academic resource
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Resource Information</CardTitle>
              <CardDescription>
                Fill out the details for the academic resource you wish to add to the repository
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Resource Preview */}
                {formData.type && (
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6">
                    <div>{getResourceIcon()}</div>
                    <div>
                      <h3 className="font-medium">
                        {formData.title || 'Resource Title'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formData.authors || 'Author(s)'} • {formData.year}
                      </p>
                      <div className="text-xs text-gray-500 mt-1">
                        {formData.type && (
                          <span className="capitalize">{formData.type}</span>
                        )}
                        {formData.publisher && (
                          <span> • {formData.publisher}</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Basic Information */}
                <div>
                  <h3 className="font-medium text-lg mb-4">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        Title <span className="text-red-500">*</span>
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
                      <Label htmlFor="type">
                        Resource Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => handleSelectChange('type', value as ResourceType)}
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
                  </div>
                  
                  <div className="space-y-2 mt-4">
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">
                        Year <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="year"
                        name="year"
                        type="number"
                        placeholder="Publication year"
                        value={formData.year}
                        onChange={handleChange}
                        min="1800"
                        max={new Date().getFullYear()}
                        required
                      />
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
                      <Label htmlFor="doi">DOI (if applicable)</Label>
                      <Input
                        id="doi"
                        name="doi"
                        placeholder="Digital Object Identifier"
                        value={formData.doi}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Categories */}
                <div>
                  <h3 className="font-medium text-lg mb-4">Categories & Description</h3>
                  
                  <div className="space-y-2">
                    <Label>
                      Categories <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                      {allCategories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                            checked={formData.categories.includes(category)}
                            onCheckedChange={(checked) => 
                              handleCategoryChange(category, checked === true)
                            }
                          />
                          <Label
                            htmlFor={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="abstract">Abstract/Description</Label>
                    <Textarea
                      id="abstract"
                      name="abstract"
                      placeholder="Provide a brief summary or description of the resource"
                      value={formData.abstract}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="tags">Tags (separated by commas)</Label>
                    <Input
                      id="tags"
                      name="tags"
                      placeholder="e.g., machine learning, textbooks, beginners"
                      value={formData.tags}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                {/* Access & Files */}
                <div>
                  <h3 className="font-medium text-lg mb-4">Access & Resource Files</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="access">
                      Access Level <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.access}
                      onValueChange={(value) => handleSelectChange('access', value as AccessLevel)}
                    >
                      <SelectTrigger id="access">
                        <SelectValue placeholder="Select access level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open Access (available to all)</SelectItem>
                        <SelectItem value="student">Student Access</SelectItem>
                        <SelectItem value="faculty">Faculty Access</SelectItem>
                        <SelectItem value="restricted">Restricted Access</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="file">Upload File</Label>
                      <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <UploadCloud className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF, DOCX, EPUB up to 100MB
                        </p>
                        <Input
                          id="file"
                          type="file"
                          className="hidden"
                          accept=".pdf,.docx,.doc,.epub"
                          onChange={handleFileChange}
                        />
                        {formData.file && (
                          <div className="mt-2 text-sm text-blue-600">
                            {formData.file.name}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="externalLink">External Link (if available)</Label>
                      <Input
                        id="externalLink"
                        name="externalLink"
                        type="url"
                        placeholder="https://example.com/resource"
                        value={formData.externalLink}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
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
                onClick={handleSubmit}
                className="bg-academy-600 hover:bg-academy-700"
                disabled={isSubmitting}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Submitting...' : 'Submit Resource'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddResourcePage;
