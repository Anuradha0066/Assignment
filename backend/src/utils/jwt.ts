import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

export function signToken(payload: object, expiresIn: string | number = '7d'): string {
  const opts: SignOptions = { expiresIn: expiresIn as any };
  return jwt.sign(payload as any, JWT_SECRET as Secret, opts);
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET as Secret);
}

export default { signToken, verifyToken };
