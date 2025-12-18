import { Request, Response } from 'express';
import { findUserById, updateUserById } from '../repositories/user.repository';
import { UpdateUserDto } from '../dtos/user.dto';

/**
 * Get current user's profile
 * GET /api/users/me
 */
export async function getProfile(req: Request, res: Response) {
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

/**
 * Update current user's profile
 * PUT /api/users/me
 */
export async function updateProfile(req: Request, res: Response) {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const updates = req.body as UpdateUserDto;

  const updatedUser = await updateUserById(userId, updates);

  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json({
    user: updatedUser,
  });
}

export default {
  getProfile,
  updateProfile,
};
