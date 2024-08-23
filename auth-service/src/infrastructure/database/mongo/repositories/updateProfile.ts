import { User } from '../models';
import { UserEntity } from '@/enterprise/entities';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const updateProfile = async (
  data: UserEntity,
): Promise<UserEntity | null> => {
  const {
    email,
    role,
    username,
    bio,
    github,
    linkedin,
    twitter,
    profileImage,
  } = data;


  const currentUser = await User.findOne({ email: email });

  if (!currentUser) {
    throw new Error('User not found');
  }

  
  if (profileImage === '' && currentUser.profileImage) {
    try {
     
      const urlParts = currentUser.profileImage.split('/');
      const uploadIndex = urlParts.lastIndexOf('upload');
      const publicId = 'upload/' + urlParts.slice(uploadIndex + 1).join('/').split('.')[0];

      console.log('Current profile image URL:', currentUser.profileImage);
      console.log('Extracted public ID:', publicId);
  
      if (publicId) {
       
        const result = await cloudinary.uploader.destroy(publicId);
        console.log('result.',result)
        
        if (result.result === 'ok') {
          console.log('Image successfully deleted from Cloudinary');
        } else {
          console.error('Failed to delete image from Cloudinary:', result);
        }
      }
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      
    }
  }

 
  const user = await User.findOneAndUpdate(
    { email: email },
    {
      $set: {
        role,
        username,
        bio,
        github,
        linkedin,
        twitter,
        profileImage,
      },
    },
    { new: true, projection: { password: 0 } },
  );

  if (!user) {
    throw new Error('User not found');
  }

  return user;
 
};