import  { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import EditTaskDialog from "@/components/todo/EditTaskCard";
import DeleteTaskDialog from "@/components/todo/DeleteTaskCard";
import { Button } from "@/components/ui/button";
import { ToDoItem } from "@/types/index";

interface ToDoListCardProps {
  todo: ToDoItem;
  onEdit: (updatedTodo: ToDoItem) => void;
  onDelete: () => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export default function ToDoListCard({
  todo,
  onEdit,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}: ToDoListCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="flex justify-between items-start pb-2">
          <div>
            <CardTitle className="text-lg font-semibold">
              {todo.title}
            </CardTitle>
            <CardDescription className="mt-1 line-clamp-3">
              {todo.description ?? "No description"}
            </CardDescription>
          </div>

          {/* Menubar */}
          <div className="flex flex-col space-y-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditOpen(true)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteOpen(true)}
              disabled={isDeleting}
            >
              Delete
            </Button>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4 text-sm mt-2">
          <div>
            <span className="font-semibold">Completed:</span>{" "}
            {todo.isCompleted ? "Yes" : "No"}
          </div>
          <div>
            <span className="font-semibold">Due Date:</span>{" "}
            {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "N/A"}
          </div>
          <div>
            <span className="font-semibold">Created At:</span>{" "}
            {todo.createdAt
              ? new Date(todo.createdAt).toLocaleDateString()
              : "N/A"}
          </div>
        </CardContent>
      </Card>

      <EditTaskDialog
        isOpen={editOpen}
        onOpenChange={setEditOpen}
        todo={todo}
        onSave={(updatedTodo) => {
          onEdit(updatedTodo);
          setEditOpen(false);
        }}
        isSaving={isUpdating}
      />

      <DeleteTaskDialog
        isOpen={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDeleteConfirm={() => {
          onDelete();
          setDeleteOpen(false);
        }}
        isDeleting={isDeleting}
      />
    </>
  );
}
