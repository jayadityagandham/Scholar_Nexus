
import { toast } from "@/hooks/use-toast";

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description?: string;
  categories?: string[];
  available: boolean;
}

export interface BookReservation {
  id: string;
  bookId: string;
  userId: string;
  date: Date;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}

// Mock books data
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    coverImage: 'https://m.media-amazon.com/images/I/41T0iBxY8FL._SX258_BO1,204,203,200_.jpg',
    description: 'A comprehensive introduction to the modern study of computer algorithms.',
    categories: ['Computer Science', 'Algorithms'],
    available: true
  },
  {
    id: '2',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
    coverImage: 'https://m.media-amazon.com/images/I/51szD9HC9pL._SX395_BO1,204,203,200_.jpg',
    description: 'Capturing a wealth of experience about the design of object-oriented software.',
    categories: ['Software Engineering', 'Object-Oriented Design'],
    available: true
  },
  {
    id: '3',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    coverImage: 'https://m.media-amazon.com/images/I/51b7XbfMIIL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
    description: 'A handbook of agile software craftsmanship that helps programmers write better code.',
    categories: ['Software Engineering', 'Programming'],
    available: true
  },
  {
    id: '4',
    title: 'The Pragmatic Programmer',
    author: 'Andy Hunt, Dave Thomas',
    coverImage: 'https://m.media-amazon.com/images/I/51W1sBPO7tL._SX380_BO1,204,203,200_.jpg',
    description: 'From journeyman to master - a guide to the characteristics, attitudes, and techniques of pragmatic programming.',
    categories: ['Software Engineering', 'Programming'],
    available: true
  },
  {
    id: '5',
    title: 'Artificial Intelligence: A Modern Approach',
    author: 'Stuart Russell, Peter Norvig',
    coverImage: 'https://m.media-amazon.com/images/I/51r+Sq96TYL._SX258_BO1,204,203,200_.jpg',
    description: 'The leading textbook in Artificial Intelligence, used in over 1500 universities worldwide.',
    categories: ['Computer Science', 'Artificial Intelligence'],
    available: true
  }
];

// Mock reservations
const mockReservations: BookReservation[] = [];

// Get all available books
export const getAvailableBooks = async (): Promise<Book[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return only available books
  return mockBooks.filter(book => book.available);
};

// Get book by ID
export const getBookById = async (id: string): Promise<Book | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const book = mockBooks.find(b => b.id === id);
  return book || null;
};

// Make a book reservation
export const reserveBook = async (
  bookId: string, 
  userId: string, 
  date: Date, 
  timeSlot: string
): Promise<BookReservation> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if the book exists and is available
  const book = await getBookById(bookId);
  if (!book) {
    throw new Error('Book not found');
  }
  
  if (!book.available) {
    throw new Error('Book is not available for reservation');
  }
  
  // Create new reservation
  const newReservation: BookReservation = {
    id: `reservation-${Date.now()}`,
    bookId,
    userId,
    date,
    timeSlot,
    status: 'confirmed',
    createdAt: new Date(),
  };
  
  // In a real app, this would be stored in a database
  mockReservations.push(newReservation);
  
  // Set the book as unavailable
  const bookIndex = mockBooks.findIndex(b => b.id === bookId);
  if (bookIndex !== -1) {
    mockBooks[bookIndex].available = false;
  }
  
  // Send notification (in a real app, this would be an email or push notification)
  toast({
    title: "Reservation Confirmed",
    description: `Your reservation for "${book.title}" has been confirmed.`,
  });
  
  return newReservation;
};

// Get user's reservations
export const getUserReservations = async (userId: string): Promise<BookReservation[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockReservations.filter(reservation => reservation.userId === userId);
};

// Cancel reservation
export const cancelReservation = async (reservationId: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const reservationIndex = mockReservations.findIndex(r => r.id === reservationId);
  
  if (reservationIndex === -1) {
    throw new Error('Reservation not found');
  }
  
  const reservation = mockReservations[reservationIndex];
  
  // Update reservation status
  mockReservations[reservationIndex].status = 'cancelled';
  
  // Make the book available again
  const bookIndex = mockBooks.findIndex(b => b.id === reservation.bookId);
  if (bookIndex !== -1) {
    mockBooks[bookIndex].available = true;
  }
  
  toast({
    title: "Reservation Cancelled",
    description: `Your reservation has been cancelled successfully.`,
  });
};
