import { Request, Response } from 'express';
import { getNotificationsForUser } from '../repositories/notification.repository';

export async function getNotifications(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const list = await getNotificationsForUser(userId);
  res.json({ notifications: list });
}


export default { getNotifications };
