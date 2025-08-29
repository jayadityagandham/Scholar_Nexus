import { FilterState } from "@/components/ResourceFilters";
import { ResourceProps } from "@/components/ResourceCard";

// Mock data for resources
const mockResources: ResourceProps[] = [
  {
    id: '1',
    title: 'Machine Learning: A Probabilistic Perspective',
    authors: ['Kevin P. Murphy'],
    type: 'book',
    year: 2012,
    publisher: 'MIT Press',
    category: ['Computer Science', 'Artificial Intelligence', 'Machine Learning'],
    abstract: 'This textbook offers a comprehensive and self-contained introduction to the field of machine learning, a unified treatment of both popular statistical approaches and more recent methodology.',
    access: 'student',
    citationCount: 9425,
  },
  {
    id: '2',
    title: 'Attention Is All You Need',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit', 'Llion Jones', 'Aidan N. Gomez', 'Łukasz Kaiser', 'Illia Polosukhin'],
    type: 'paper',
    year: 2017,
    journal: 'Advances in Neural Information Processing Systems',
    category: ['Computer Science', 'Natural Language Processing', 'Deep Learning'],
    abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
    access: 'open',
    citationCount: 42891,
  },
  {
    id: '3',
    title: 'Introduction to Algorithms',
    authors: ['Thomas H. Cormen', 'Charles E. Leiserson', 'Ronald L. Rivest', 'Clifford Stein'],
    type: 'book',
    year: 2009,
    publisher: 'MIT Press',
    category: ['Computer Science', 'Algorithms', 'Data Structures'],
    abstract: 'This internationally acclaimed textbook provides a comprehensive introduction to the modern study of computer algorithms. It covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers.',
    access: 'student',
    citationCount: 67225,
  },
  {
    id: '4',
    title: 'Deep Learning',
    authors: ['Ian Goodfellow', 'Yoshua Bengio', 'Aaron Courville'],
    type: 'book',
    year: 2016,
    publisher: 'MIT Press',
    category: ['Computer Science', 'Artificial Intelligence', 'Deep Learning'],
    abstract: 'The Deep Learning textbook is a resource intended to help students and practitioners enter the field of machine learning in general and deep learning in particular.',
    access: 'open',
    citationCount: 31072,
  },
  {
    id: '5',
    title: 'CS50: Introduction to Computer Science',
    authors: ['David J. Malan'],
    type: 'course',
    year: 2023,
    publisher: 'Harvard University',
    category: ['Computer Science', 'Programming', 'Introduction'],
    abstract: "This is Harvard University's introduction to the intellectual enterprises of computer science and the art of programming, taught by Professor David J. Malan.",
    access: 'open',
  },
];

// Function to get resources based on filters
export const getResources = async (filters: FilterState): Promise<ResourceProps[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Filter resources based on provided filters
  let filteredResources = [...mockResources];
  
  // Filter by type
  if (filters.types.length > 0) {
    filteredResources = filteredResources.filter(resource => 
      filters.types.includes(resource.type)
    );
  }
  
  // Filter by access level
  if (filters.accessLevels.length > 0) {
    filteredResources = filteredResources.filter(resource => 
      filters.accessLevels.includes(resource.access)
    );
  }
  
  // Filter by category
  if (filters.categories.length > 0) {
    filteredResources = filteredResources.filter(resource => 
      resource.category.some(category => filters.categories.includes(category))
    );
  }
  
  // Filter by year range
  filteredResources = filteredResources.filter(resource => 
    resource.year >= filters.yearRange[0] && resource.year <= filters.yearRange[1]
  );
  
  // Filter by search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredResources = filteredResources.filter(resource => 
      resource.title.toLowerCase().includes(query) ||
      resource.authors.some(author => author.toLowerCase().includes(query)) ||
      resource.category.some(category => category.toLowerCase().includes(query)) ||
      (resource.abstract && resource.abstract.toLowerCase().includes(query)) ||
      (resource.publisher && resource.publisher.toLowerCase().includes(query)) ||
      (resource.journal && resource.journal.toLowerCase().includes(query))
    );
  }
  
  // Sort resources
  switch (filters.sortBy) {
    case 'newest':
      filteredResources.sort((a, b) => b.year - a.year);
      break;
    case 'oldest':
      filteredResources.sort((a, b) => a.year - b.year);
      break;
    case 'citations':
      filteredResources.sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0));
      break;
    case 'relevance':
    default:
      // For relevance, we can't really implement without a proper search engine
      // So we'll just leave the default order
      break;
  }
  
  return filteredResources;
};

// Function to get a single resource by ID
export const getResourceById = async (id: string): Promise<ResourceProps | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find resource by ID
  const resource = mockResources.find(r => r.id === id);
  return resource || null;
};

// Function to add a new resource
export const addResource = async (resource: Omit<ResourceProps, 'id'>): Promise<ResourceProps> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate a new ID
  const newId = String(mockResources.length + 1);
  
  // Create the new resource
  const newResource: ResourceProps = {
    ...resource,
    id: newId,
  };
  
  // In a real app, we would send this to an API
  // For now, we'll just log it
  console.log('New resource added:', newResource);
  
  return newResource;
};

// Function to get featured resources
export const getFeaturedResources = async (count: number = 3): Promise<ResourceProps[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Sort resources by citation count (as a measure of popularity)
  const sortedResources = [...mockResources].sort((a, b) => 
    (b.citationCount || 0) - (a.citationCount || 0)
  );
  
  // Return the top N resources
  return sortedResources.slice(0, count);
};
