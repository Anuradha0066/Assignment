import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { findUserById } from '../repositories/user.repository';

/**
 * Register a new user
 * POST /api/auth/register
 */
export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const user = await registerUser({ name, email, password });

  res.status(201).json({
    user,
  });
}

/**
 * Login user
 * POST /api/auth/login
 */
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const { user, token } = await loginUser({ email, password });

  res.cookie('token', token, {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  path: '/',          // 🔥 MUST
});


 
// ✅ CORRECT:
res.status(200).json({ user, token });

}
/**
 * Logout user
 * POST /api/auth/logout
 */
export async function logout(_req: Request, res: Response) {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
  });

  res.status(204).send();
}

/**
 * Get current logged-in user
 * GET /api/auth/me
 */
export async function me(req: Request, res: Response) {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = await findUserById(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json({
    user,
  });
}

export default {
  register,
  login,
  logout,
  me,
};
