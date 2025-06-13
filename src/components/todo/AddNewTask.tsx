import React, { useState } from "react";
import { useCreateTodo } from "@/hooks/useCreateToDo";
import { useToDoStore } from "@/stores/todoStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function AddNewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [dueDate, setDueDate] = useState<string>("");
  const createTodoMutation = useCreateTodo();
  const addLocalTodo = useToDoStore((state) => state.addLocalTodo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo = {
      title,
      description: description || null,
      isCompleted,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    };

    try {
      const created = await createTodoMutation.mutateAsync(newTodo);
      addLocalTodo(created);
      setTitle("");
      setDescription("");
      setIsCompleted(false);
      setDueDate("");
    } catch (error) {
      console.error("Failed to create todo", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e: any) => setDescription(e.target.value)}
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
        <span>Completed</span>
      </label>
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <Button type="submit">Create New</Button>
      {createTodoMutation.isError && (
        <p className="text-red-600">Error creating task</p>
      )}
    </form>
  );
}
