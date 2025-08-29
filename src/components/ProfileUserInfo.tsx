
import React from 'react';
import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRoleCheck } from '@/hooks/useRoleCheck';

interface UserProfile {
  fullName: string;
  email: string;
  bio: string;
  institution: string;
  department: string;
  position: string;
  avatar?: string;
  joinDate: string;
}

interface ProfileUserInfoProps {
  user?: UserProfile;
}

const ProfileUserInfo: React.FC<ProfileUserInfoProps> = ({ user }) => {
  const { user: clerkUser } = useUser();
  const { isAdmin, isFaculty, isStudent } = useRoleCheck();
  
  const getUserRole = () => {
    if (isAdmin()) return { label: "Admin", color: "bg-red-500" };
    if (isFaculty()) return { label: "Faculty", color: "bg-purple-500" };
    return { label: "Student", color: "bg-blue-500" };
  };
  
  const userRole = getUserRole();
  
  // Mock data that would come from a real database
  const userStats = {
    joinDate: user?.joinDate || "March 2023",
    contributions: 0,
    bookmarks: 0,
    discussions: 0,
  };

  // Use either the passed user data or Clerk user data
  const displayName = user?.fullName || `${clerkUser?.firstName || ''} ${clerkUser?.lastName || ''}`;
  const displayEmail = user?.email || clerkUser?.emailAddresses?.[0]?.emailAddress || '';
  const avatarUrl = user?.avatar || clerkUser?.imageUrl;
  const initials = displayName ? displayName.split(' ').map(name => name.charAt(0)).join('').toUpperCase() : '';
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <h2 className="text-xl font-bold">
            {displayName}
          </h2>
          
          <p className="text-gray-500 text-sm mb-2">
            {displayEmail}
          </p>
          
          <Badge className={`${userRole.color}`}>
            {userRole.label}
          </Badge>

          {user?.bio && (
            <div className="mt-4 text-center">
              <h3 className="font-medium text-gray-700">Bio</h3>
              <p className="text-gray-600 mt-1">{user.bio}</p>
            </div>
          )}

          {(user?.institution || user?.department || user?.position) && (
            <div className="mt-4 text-center">
              {user.institution && <p className="text-gray-600"><span className="font-medium">Institution:</span> {user.institution}</p>}
              {user.department && <p className="text-gray-600"><span className="font-medium">Department:</span> {user.department}</p>}
              {user.position && <p className="text-gray-600"><span className="font-medium">Position:</span> {user.position}</p>}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t flex justify-between pt-4 text-sm">
        <div className="text-center">
          <p className="font-bold">{userStats.contributions}</p>
          <p className="text-gray-500">Contributions</p>
        </div>
        
        <div className="text-center">
          <p className="font-bold">{userStats.bookmarks}</p>
          <p className="text-gray-500">Bookmarks</p>
        </div>
        
        <div className="text-center">
          <p className="font-bold">{userStats.discussions}</p>
          <p className="text-gray-500">Discussions</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfileUserInfo;
