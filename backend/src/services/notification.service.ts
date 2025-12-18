import { Types } from 'mongoose';
import { createNotification } from '../repositories/notification.repository';

export async function notifyAssignment(input: {
  userId: string | Types.ObjectId;
  taskId: string | Types.ObjectId;
  message: string;
}) {
  return createNotification({
    userId: new Types.ObjectId(input.userId),
    taskId: new Types.ObjectId(input.taskId),
    message: input.message,
  });
}

export default {
  notifyAssignment,
};
