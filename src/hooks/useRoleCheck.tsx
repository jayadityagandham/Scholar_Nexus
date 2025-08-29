
import { useUser } from "@clerk/clerk-react";

type UserRole = "admin" | "faculty" | "student";

export const useRoleCheck = () => {
  const { user, isLoaded } = useUser();
  
  const hasRole = (role: UserRole): boolean => {
    if (!isLoaded || !user) return false;
    
    // Get user's role from public metadata
    // You should set this metadata in Clerk Dashboard or via the Clerk API
    const userRole = user.publicMetadata.role as UserRole | undefined;
    
    return userRole === role;
  };
  
  const isAdmin = (): boolean => hasRole("admin");
  const isFaculty = (): boolean => hasRole("faculty");
  const isStudent = (): boolean => hasRole("student");
  
  // Function to get the appropriate redirect path based on user's role
  const getHomePathForRole = (): string => {
    if (isAdmin()) return "/admin";
    if (isFaculty()) return "/faculty";
    return "/browse"; // Default for students or no specific role
  };
  
  return {
    isAdmin,
    isFaculty,
    isStudent,
    hasRole,
    getHomePathForRole,
  };
};
