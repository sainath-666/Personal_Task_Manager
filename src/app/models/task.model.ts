export interface Task {
  taskId?: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdDate?: Date;
  dueDate?: Date;
}
