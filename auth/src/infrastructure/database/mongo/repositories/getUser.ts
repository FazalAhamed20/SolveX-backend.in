import { User } from '../models';
import { UserEntity } from '@/enterprise/entities';

export const getUser = async (): Promise<UserEntity[]> => {
  const users = await User.find(
    { username: { $ne: 'Admin' } },
    { username: 1, email: 1, isBlocked: 1 },
  );
  console.log(users);

  return users;
};
