import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteConfirm: () => void;
  isDeleting?: boolean;
}

export default function DeleteTaskDialog({
  isOpen,
  onOpenChange,
  onDeleteConfirm,
  isDeleting = false,
}: DeleteTaskDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the task.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onDeleteConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
