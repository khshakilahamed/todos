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
import axiosInstance from "@/lib/axios";
import { useState } from "react";

interface DeleteTaskDialogProps {
  todoId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setDeleteTodoId: (id: number | null) => void;
  refetch: () => void;
}

export function DeleteTaskDialog({
  todoId,
  setDeleteTodoId,
  open,
  onOpenChange,
  refetch,
}: DeleteTaskDialogProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteTask = async (todoId: number) => {
    setErrorMessage("");
    setIsDeleting(true);
    try {
      const { data } = await axiosInstance.delete(`todos/${todoId}/`);
      console.log("deleted: ", data);

      refetch();
      onOpenChange(false);
    } catch (error: any) {
      setErrorMessage(error?.message);
    } finally {
      setIsDeleting(false);
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
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer"
              onClick={() => setDeleteTodoId(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
