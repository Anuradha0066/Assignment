export interface Notification {
  _id: string;
  userId: string;
  taskId: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}
