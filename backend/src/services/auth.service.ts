import { createUser, findUserByEmail } from '../repositories/user.repository';
import { hashPassword, comparePassword } from '../utils/hash';
import { signToken } from '../utils/jwt';
import type { IUser } from '../models/user.model';

type SafeUser = Omit<IUser, 'password'>;

function sanitizeUser(user: IUser): SafeUser {
const obj = (user as any).toObject();
  delete (obj as any).password;
  return obj as SafeUser;
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  const hashedPassword = await hashPassword(input.password);

  const user = await createUser({
    name: input.name,
    email: input.email,
    password: hashedPassword,
  });

  return sanitizeUser(user);
}

export async function loginUser(input: {
  email: string;
  password: string;
}) {
  const user = await findUserByEmail(input.email);
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const isMatch = await comparePassword(input.password, user.password);
  if (!isMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const token = signToken({ id: user._id.toString() });

  return {
    user: sanitizeUser(user),
    token,
  };
}

export default {
  registerUser,
  loginUser,
};
