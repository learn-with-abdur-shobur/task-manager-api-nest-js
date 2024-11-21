export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
}

export type TaskStatus = 'pending' | 'in-progress' | 'done';
