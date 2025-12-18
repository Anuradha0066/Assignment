import Notification, { INotification } from '../models/notification.model';
import { Types } from 'mongoose';

export interface CreateNotificationInput {
  userId: Types.ObjectId;
  taskId: Types.ObjectId;
  message: string;
}

export async function createNotification(
  data: CreateNotificationInput
): Promise<INotification> {
  return Notification.create(data);
}

export async function getNotificationsForUser(
  userId: string | Types.ObjectId
): Promise<INotification[]> {
  return Notification.find({ userId })
    .sort({ createdAt: -1 })
    .lean()
    .exec();
}

export default {
  createNotification,
  getNotificationsForUser,
};
