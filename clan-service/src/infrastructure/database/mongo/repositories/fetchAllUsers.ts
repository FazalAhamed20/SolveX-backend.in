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
  
    const result = await User.find({}).lean();
    console.log("Fetched users:", result);
    
    if (!result || result.length === 0) {
      console.log("No users found");
      return null;
    }

    
    const users: UserEntity[] = result.map((user: UserDocument) => ({
      _id: new Types.ObjectId(user._id), 
      username: user.username,
      email: user.email,
      isBlocked: user.isBlocked ?? false,
      profileImage: user.profileImage ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));

    return users;

}