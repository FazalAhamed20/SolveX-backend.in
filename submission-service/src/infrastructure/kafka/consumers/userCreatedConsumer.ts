import { User } from "@/infrastructure/database/mongo/models";
import { ObjectId } from "mongoose";

export default async (
  data: {
    _id?: ObjectId;
    username?: string;
    email: string;
    isBlocked: boolean;
  }
) => {
  try {
    if (Object.keys(data).length === 2 && data.email && 'isBlocked' in data) {
      // If only email and isBlocked are provided, update the existing user
      const updatedUser = await User.findOneAndUpdate(
        { email: data.email },
        { isBlocked: data.isBlocked },
        { new: true }
      );

      if (updatedUser) {
        
      } else {
        
      }
    } else {
      // If other fields are provided, create a new user
      const newUser = new User({
        _id: data._id,
        username: data.username,
        email: data.email,
        isBlocked: data.isBlocked
      });

      
      await newUser.save();
    }
  } catch (error: any) {
    
  }
};