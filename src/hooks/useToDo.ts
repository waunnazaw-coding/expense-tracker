import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ToDoItem } from "@/types/index";
import {
  createTodo,
  fetchTodos,
  updateTodo,
  deleteTodo,
  fetchTodosPaged,
  toggleTodoCompletion,
  type PagedTodosResponse,
  type CreateTodoRequest,
  type UpdateTodoRequest,
} from "@/api/todoApi";
import { useToDoStore } from "@/stores/todoStore";
import { toast } from "sonner";
import { useEffect } from "react";

export function useTodosPaged(pageNumber: number, pageSize: number) {
  const setPagedTodos = useToDoStore((state) => state.setPagedTodos);

  const query = useQuery<PagedTodosResponse, Error>({
    queryKey: ["todosPaged", pageNumber, pageSize],
    queryFn: () => fetchTodosPaged(pageNumber, pageSize),
    placeholderData: (prev) => prev, // keeps previous page data while loading
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setPagedTodos(query.data, pageNumber, pageSize);
    }
    if (query.isError && query.error) {
      toast.error(query.error.message || "Failed to fetch todos");
    }
  }, [
    query.isSuccess,
    query.isError,
    query.data,
    query.error,
    setPagedTodos,
    pageNumber,
    pageSize,
  ]);

  return query;
}
// Fetch all todos

export function useTodos() {
  const setTodos = useToDoStore((state) => state.setTodos);

  const query = useQuery<ToDoItem[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setTodos(query.data);
    }
    if (query.isError && query.error) {
      toast.error(query.error.message || "Failed to fetch todos");
    }
  }, [query.isSuccess, query.isError, query.data, query.error, setTodos]);

  return query;
}

// Create a new todo
export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation<ToDoItem, Error, CreateTodoRequest>({
    mutationFn: createTodo,
    onSuccess: () => {
      toast.success("Todo created successfully!");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todosPaged"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create todo");
    },
  });
}

// Update an existing todo (no optimistic update)
export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation<ToDoItem, Error, UpdateTodoRequest>({
    mutationFn: updateTodo,
    onSuccess: () => {
      toast.success("Todo updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todosPaged"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update todo");
    },
  });
}

// Delete a todo
export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteTodo,
    onSuccess: () => {
      toast.success("Todo deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todosPaged"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete todo");
    },
  });
}
