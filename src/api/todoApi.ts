import axiosInstance from "@/api/axioInstance";
import type { ToDoItem } from "@/types/index";

export interface PagedTodosResponse {
  tasks: ToDoItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  dueDate?: string;
  isCompleted?: boolean;
}

export interface UpdateTodoRequest {
  taskId: number;
  title: string;
  description?: string;
  dueDate?: string;
  isCompleted?: boolean;
}

// Fetch paginated todos
export const fetchTodosPaged = async (
  pageNumber: number,
  pageSize: number,
): Promise<PagedTodosResponse> => {
  try {
    const response = await axiosInstance.get<ApiResponse<PagedTodosResponse>>(
      `/Task/paged`,
      {
        params: { pageNumber, pageSize },
      },
    );

    console.log("Paged todos response:", response.data.data);

    // Calculate totalPages if not provided by API
    const data = response.data.data;
    const totalPages = Math.ceil(data.totalCount / pageSize);

    return {
      ...data,
      currentPage: pageNumber,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching paged todos:", error);
    throw new Error("Failed to fetch todos. Please try again.");
  }
};

// Create a new todo
export const createTodo = async (
  todo: CreateTodoRequest,
): Promise<ToDoItem> => {
  try {
    const response = await axiosInstance.post<ApiResponse<ToDoItem>>(
      "/Task",
      todo,
    );
    console.log("Created todo:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw new Error("Failed to create todo. Please try again.");
  }
};

// Fetch all todos
export const fetchTodos = async (): Promise<ToDoItem[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<ToDoItem[]>>("/Task");
    console.log("All todos:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error("Failed to fetch todos. Please try again.");
  }
};

// Update an existing todo
export const updateTodo = async (
  todo: UpdateTodoRequest,
): Promise<ToDoItem> => {
  try {
    const response = await axiosInstance.put<ApiResponse<ToDoItem>>(
      `/Task/${todo.taskId}`,
      todo,
    );
    console.log("Updated todo:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw new Error("Failed to update todo. Please try again.");
  }
};

// Delete a todo
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/Task/${id}`);
    console.log("Deleted todo:", id);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw new Error("Failed to delete todo. Please try again.");
  }
};

// Toggle todo completion status
export const toggleTodoCompletion = async (
  id: string,
  isCompleted: boolean,
): Promise<ToDoItem> => {
  try {
    const response = await axiosInstance.patch<ApiResponse<ToDoItem>>(
      `/Task/${id}/toggle`,
      {
        isCompleted,
      },
    );
    console.log("Toggled todo completion:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error toggling todo completion:", error);
    throw new Error("Failed to update todo status. Please try again.");
  }
};
