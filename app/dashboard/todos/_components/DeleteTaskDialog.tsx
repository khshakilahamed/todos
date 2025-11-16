import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteTask } from "@/hooks/useTask";
import { useState } from "react";

interface DeleteTaskDialogProps {
  todoId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setDeleteTodoId: (id: number | null) => void;
}

export function DeleteTaskDialog({
  todoId,
  setDeleteTodoId,
  open,
  onOpenChange,
}: DeleteTaskDialogProps) {
  const [errorMessage, setErrorMessage] = useState("");
  
  const deleteTaskMutation = useDeleteTask();

  const handleDeleteTask = async (todoId: number) => {
    setErrorMessage("");
    try {
      await deleteTaskMutation.mutateAsync(todoId);
      onOpenChange(false);
    } catch (error: any) {
      setErrorMessage(error?.message || "Failed to delete task");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Todo</DialogTitle>
          <DialogDescription>
            Once deleted, you cannot back data.
          </DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{errorMessage}</p>
          </div>
        )}
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            className="cursor-pointer"
            onClick={() => {
              if (todoId) {
                handleDeleteTask(todoId);
                setDeleteTodoId(null);
              }
            }}
            disabled={deleteTaskMutation.isPending}
          >
            {deleteTaskMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer"
              onClick={() => setDeleteTodoId(null)}
              disabled={deleteTaskMutation.isPending}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
