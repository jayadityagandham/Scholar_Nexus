
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import RequestPage from "./pages/RequestPage";
import Forum from "./pages/Forum";
import NotFound from "./pages/NotFound";
import AuthLayout from "./components/AuthLayout";
import AdminPanel from "./pages/AdminPanel";
import FacultyPanel from "./pages/FacultyPanel";
import { useRoleCheck } from "./hooks/useRoleCheck";
import ProfilePage from "./pages/ProfilePage";
import NewDiscussionPage from "./pages/NewDiscussionPage";
import AddResourcePage from "./pages/AddResourcePage";
import BookServicePage from "./pages/BookServicePage";

const queryClient = new QueryClient();

// Role-based redirect component
const RoleBasedRedirect = () => {
  const { getHomePathForRole } = useRoleCheck();
  const { isSignedIn } = useAuth();
  
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  
  return <Navigate to={getHomePathForRole()} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/browse" element={<Browse />} />
          
          {/* Role-based routes */}
          <Route path="/admin" element={
            <>
              <SignedIn>
                <AdminPanel />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" replace />
              </SignedOut>
            </>
          } />
          
          <Route path="/faculty" element={
            <>
              <SignedIn>
                <FacultyPanel />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" replace />
              </SignedOut>
            </>
          } />
          
          {/* Protected routes - only accessible when signed in */}
          <Route path="/request" element={
            <>
              <SignedIn>
                <RequestPage />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" replace />
              </SignedOut>
            </>
          } />
          
          <Route path="/forum" element={
            <>
              <SignedIn>
                <Forum />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" replace />
              </SignedOut>
            </>
          } />
          
          {/* Book Service route */}
          <Route path="/book-service" element={
            <>
              <SignedIn>
                <BookServicePage />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" replace />
              </SignedOut>
            </>
          } />
          
          {/* Profile and other routes */}
          <Route path="/profile" element={
            <>
              <SignedIn>
                <ProfilePage />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" replace />
              </SignedOut>
            </>
          } />
          
          <Route path="/forum/new" element={
            <>
              <SignedIn>
                <NewDiscussionPage />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" replace />
              </SignedOut>
            </>
          } />
          
          <Route path="/resource/add" element={
            <>
              <SignedIn>
                <AddResourcePage />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" replace />
              </SignedOut>
            </>
          } />
          
          {/* Auth routes */}
          <Route path="/sign-in/*" element={
            <AuthLayout>
              <SignIn routing="path" path="/sign-in" />
            </AuthLayout>
          } />
          <Route path="/sign-up/*" element={
            <AuthLayout>
              <SignUp routing="path" path="/sign-up" />
            </AuthLayout>
          } />
          
          {/* Dashboard redirect based on role */}
          <Route path="/dashboard" element={
            <>
              <SignedIn>
                <RoleBasedRedirect />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" replace />
              </SignedOut>
            </>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
