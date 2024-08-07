import { UserEntity } from "@/enterprise/entities";
import { User } from "../models";
import { Types } from 'mongoose';

interface UserDocument {
  _id: string;
  username: string;
  email: string;
  isBlocked?: boolean | null;
  profileImage?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const fetchAllUsers = async (): Promise<UserEntity[] | null> => {
  try {
    const result = await User.find({}).lean();
    console.log("Fetched users:", result);
    
    if (!result || result.length === 0) {
      console.log("No users found");
      return null;
    }

    // Transform User documents to UserEntity objects
    const users: UserEntity[] = result.map((user: UserDocument) => ({
      _id: new Types.ObjectId(user._id), // Convert string _id to ObjectId
      username: user.username,
      email: user.email,
      isBlocked: user.isBlocked ?? false, // Provide a default value if null/undefined
      profileImage: user.profileImage ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}