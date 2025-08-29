
import React, { useState } from 'react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, CalendarDays, Clock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  available: boolean;
}

const BookServicePage: React.FC = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  // Mock books data
  const books: Book[] = [
    {
      id: '1',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      coverImage: 'https://m.media-amazon.com/images/I/41T0iBxY8FL._SX258_BO1,204,203,200_.jpg',
      available: true
    },
    {
      id: '2',
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
      coverImage: 'https://m.media-amazon.com/images/I/51szD9HC9pL._SX395_BO1,204,203,200_.jpg',
      available: true
    },
    {
      id: '3',
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      coverImage: 'https://m.media-amazon.com/images/I/51b7XbfMIIL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
      available: true
    }
  ];
  
  // Generate time slots for the selected date
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 17;
    
    for (let h = startHour; h < endHour; h++) {
      slots.push({
        id: `slot-${h}-00`,
        time: `${h}:00 - ${h}:30`,
        available: Math.random() > 0.3 // randomly set some slots as unavailable
      });
      
      slots.push({
        id: `slot-${h}-30`,
        time: `${h}:30 - ${h+1}:00`,
        available: Math.random() > 0.3
      });
    }
    
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  
  const handleBooking = () => {
    if (!selectedBook || !selectedSlot || !date) {
      toast({
        title: "Incomplete booking",
        description: "Please select a book, date, and time slot.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send the booking to a backend API
    toast({
      title: "Book Reserved",
      description: `You have successfully reserved "${selectedBook.title}" for ${format(date, 'PPP')} at ${timeSlots.find(slot => slot.id === selectedSlot)?.time}.`,
    });
    
    // Reset selections
    setSelectedBook(null);
    setSelectedSlot(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-academy-50 to-white py-8">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Offline Book Service</h1>
            <p className="text-gray-600 mb-6">
              Reserve physical books from our library and pick them up at your convenience.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Book selection */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Select a Book</CardTitle>
                  <CardDescription>Browse available books</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {books.map(book => (
                    <div 
                      key={book.id}
                      className={cn(
                        "flex items-center p-3 rounded-md cursor-pointer transition-colors",
                        selectedBook?.id === book.id 
                          ? "bg-academy-100 border border-academy-200" 
                          : "hover:bg-gray-50 border border-transparent"
                      )}
                      onClick={() => setSelectedBook(book)}
                    >
                      <div className="w-16 h-20 flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden">
                        <img 
                          src={book.coverImage} 
                          alt={book.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium text-gray-900 line-clamp-2">{book.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{book.author}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            {/* Date and time selection */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date & Time</CardTitle>
                  <CardDescription>Choose when to collect the book</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => {
                      // Disable past dates and weekends
                      const now = new Date();
                      now.setHours(0, 0, 0, 0);
                      
                      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                      return date < now || isWeekend;
                    }}
                    className="rounded-md border mb-6 pointer-events-auto"
                  />
                  
                  <h3 className="font-medium mb-3">Available Time Slots</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot.id}
                        disabled={!slot.available}
                        className={cn(
                          "p-2 text-sm rounded-md text-center",
                          slot.available ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed",
                          selectedSlot === slot.id ? "bg-academy-100 text-academy-800 font-medium" : ""
                        )}
                        onClick={() => {
                          if (slot.available) {
                            setSelectedSlot(slot.id);
                          }
                        }}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Booking summary */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                  <CardDescription>Review your book reservation details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedBook ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-5 w-5 text-academy-600" />
                        <div>
                          <p className="font-medium">Book</p>
                          <p className="text-sm text-gray-500">{selectedBook.title}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <CalendarDays className="h-5 w-5 text-academy-600" />
                        <div>
                          <p className="font-medium">Date</p>
                          <p className="text-sm text-gray-500">
                            {date ? format(date, 'PPP') : 'Not selected'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-academy-600" />
                        <div>
                          <p className="font-medium">Time</p>
                          <p className="text-sm text-gray-500">
                            {selectedSlot ? timeSlots.find(slot => slot.id === selectedSlot)?.time : 'Not selected'}
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="pt-2">
                        <Button 
                          className="w-full bg-academy-600 hover:bg-academy-700"
                          onClick={handleBooking}
                        >
                          Confirm Reservation
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Info className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium">No book selected</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Please select a book and a time slot to complete your reservation.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="mt-6 bg-academy-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-academy-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">How it works</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-2">
                      <li>1. Select a book you wish to borrow</li>
                      <li>2. Choose a date and time slot for pickup</li>
                      <li>3. Complete your reservation</li>
                      <li>4. Visit the library during your selected time slot</li>
                      <li>5. Return the book within 14 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookServicePage;
