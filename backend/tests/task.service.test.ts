import * as repo from '../src/repositories/task.repository';
import * as notificationService from '../src/services/notification.service';
import * as sockets from '../src/sockets/task.socket';
import { updateTask } from '../src/services/task.service';

jest.mock('../src/repositories/task.repository');
jest.mock('../src/services/notification.service');
jest.mock('../src/sockets/task.socket');

describe('Task Service', () => {
  beforeEach(() => jest.resetAllMocks());

  it('notifies when assignee changes', async () => {
    const prev = { _id: 't1', assignedToId: 'u1', status: 'To Do' } as any;
    const updated = { _id: 't1', assignedToId: 'u2' } as any;
    (repo.getTaskById as jest.Mock).mockResolvedValue(prev);
    (repo.updateTaskById as jest.Mock).mockResolvedValue(updated);
    (notificationService.notifyAssignment as jest.Mock).mockResolvedValue({ _id: 'n1' });

    const res = await updateTask('t1', { assignedToId: 'u2' });
    expect(notificationService.notifyAssignment).toHaveBeenCalledWith({ userId: 'u2', taskId: 't1', message: 'You were assigned to a task' });
    expect(sockets.emitTaskUpdated).toHaveBeenCalled();
    expect(res).toEqual(updated);
  });
});
