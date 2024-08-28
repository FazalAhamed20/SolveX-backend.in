import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// export const generateAccessToken = (payload: {
//   _id: string;
//   email: string;
//   role?:string
// }): string => {
//   const accessToken = jwt.sign(
//     payload,
//     String(process.env.ACCESS_TOKEN_SECRET),
//     {
//       expiresIn: '5d',
//     },
//   );

//   return accessToken;
// };

export const generateAccessToken = (user: {
  _id: string;
  email: string;
  isAdmin?: boolean;
}) => {
  const role = user.isAdmin ? 'admin' : 'user';
  console.log('user', user);

  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: role,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '1h' },
  );
};
