import User, { IUser } from '../models/user.model';
import { Types } from 'mongoose';

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export async function createUser(
  data: CreateUserInput
): Promise<IUser> {
  return User.create(data);
}

export async function findUserByEmail(
  email: string
): Promise<IUser | null> {
  return User.findOne({ email })
    .select('+password')
    .exec(); 
}

export async function findUserById(
  id: string | Types.ObjectId
): Promise<Omit<IUser, 'password'> | null> {
  return User.findById(id)
    .select('-password')
    .lean() 
    .exec();
}

export async function updateUserById(
  id: string | Types.ObjectId,
  updates: Partial<IUser>
): Promise<Omit<IUser, 'password'> | null> {
  return User.findByIdAndUpdate(id, updates, {
    new: true,
  })
    .select('-password')
    .lean()
    .exec();
}

export default {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserById,
};
