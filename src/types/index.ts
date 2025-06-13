export interface ToDoItem {
  taskId?: number;
  title: string;
  description?: string | null;
  isCompleted?: boolean | null;
  dueDate?: string | null;
  createdAt?: string | null;
}
