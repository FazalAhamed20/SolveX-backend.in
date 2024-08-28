import { User } from "@/infrastructure/database/mongo/models";
import { ObjectId } from "mongoose";

export default async (
  data: {
    _id?: ObjectId;
    username?: string;
    email: string;
    isBlocked: boolean;
    profileImage:string
  }
) => {
  try {
    console.log('data',data)
    if (Object.keys(data).length === 2 && data.email && 'isBlocked' in data) {
    
      const updatedUser = await User.findOneAndUpdate(
        { email: data.email },
        { isBlocked: data.isBlocked },
        { new: true }
      );

      if (updatedUser) {
        console.log("User updated:", updatedUser);
      } else {
        console.log("User not found for update");
      }
    } else {
      
      const newUser = new User({
        _id: data._id,
        username: data.username,
        email: data.email,
        isBlocked: data.isBlocked,
        profileImage:data.profileImage
      });

      console.log("New user created:", newUser);
      await newUser.save();
    }
  } catch (error: any) {
    console.log(error?.message);
  }
};