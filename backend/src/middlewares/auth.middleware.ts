import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

interface JwtPayload {
  id: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token =
    req.cookies?.token ||
    (authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const payload = verifyToken(token) as JwtPayload;
    req.userId = payload.id;
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export default authMiddleware;
