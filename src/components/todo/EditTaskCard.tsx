import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToDoItem } from "@/types/index";

interface EditTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  todo: ToDoItem;
  onSave: (updatedTodo: ToDoItem) => void;
  isSaving?: boolean;
}

export default function EditTaskDialog({
  isOpen,
  onOpenChange,
  todo,
  onSave,
  isSaving = false,
}: EditTaskDialogProps) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description ?? "");
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted ?? false);
  const [dueDate, setDueDate] = useState(
    todo.dueDate ? todo.dueDate.slice(0, 10) : "",
  );

  useEffect(() => {
    if (isOpen) {
      setTitle(todo.title);
      setDescription(todo.description ?? "");
      setIsCompleted(todo.isCompleted ?? false);
      setDueDate(todo.dueDate ? todo.dueDate.slice(0, 10) : "");
    }
  }, [isOpen, todo]);

  const handleSave = () => {
    onSave({
      ...todo,
      title,
      description,
      isCompleted,
      dueDate,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update the task details below.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              className="w-full border rounded p-2"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="completed-checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
            />
            <label htmlFor="completed-checkbox">Completed</label>
          </div>

          <div>
            <label className="block mb-1 font-medium">Due Date</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
