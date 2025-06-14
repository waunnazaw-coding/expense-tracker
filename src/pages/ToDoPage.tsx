import React, { useEffect } from "react";
import { useTodos, useUpdateTodo, useDeleteTodo } from "@/hooks/useToDo";
import { useToDoStore } from "@/stores/todoStore";
import ToDoListCard from "@/components/todo/ToDoListCard";
import type { ToDoItem } from "@/types";
import { UpdateTodoRequest } from "@/api/todoApi";

export default function ToDoList() {
  // Zustand store state and setter
  const todos = useToDoStore((state) => state.todos);
  const setTodos = useToDoStore((state) => state.setTodos);

  // React Query hooks
  const { data: fetchedTodos, isLoading, error } = useTodos();
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  // Sync fetched todos into Zustand store when fetchedTodos changes
  useEffect(() => {
    if (fetchedTodos) {
      setTodos(fetchedTodos);
    }
  }, [fetchedTodos, setTodos]);

  // Handle updating a todo with type safety on taskId
  const handleEdit = async (updatedTodo: ToDoItem) => {
    if (updatedTodo.taskId === undefined) {
      console.error("Cannot update todo without a valid taskId");
      return;
    }

    // Construct UpdateTodoRequest explicitly to satisfy type requirements
    const updatePayload: UpdateTodoRequest = {
      taskId: updatedTodo.taskId,
      title: updatedTodo.title,
      description: updatedTodo.description,
      dueDate: updatedTodo.dueDate,
      isCompleted: updatedTodo.isCompleted,
    };

    try {
      await updateMutation.mutateAsync(updatePayload);
      // No manual Zustand update needed; React Query refetch will sync store
    } catch (err) {
      console.error("Failed to update todo", err);
    }
  };
  // Handle deleting a todo
  const handleDelete = async (taskId: number) => {
    try {
      await deleteMutation.mutateAsync(String(taskId)); // API expects string id
      // No manual Zustand update needed; React Query refetch will sync store
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-24 text-gray-600">
        Loading todos...
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 text-center p-4">
        Error loading todos: {(error as Error).message}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {todos?.map((todo) => (
          <ToDoListCard
            key={todo.taskId ?? todo.title}
            todo={todo}
            onEdit={handleEdit}
            onDelete={() =>
              todo.taskId !== undefined && handleDelete(todo.taskId)
            }
            isUpdating={updateMutation.isPending}
            isDeleting={deleteMutation.isPending}
          />
        ))}
      </div>
    </div>
  );
}
