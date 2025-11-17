"use client";

import { useForm } from "react-hook-form";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import { PRIORITY } from "@/constants";
import { TTask } from "@/types";

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: TTask;
  mode?: "add" | "edit";
  // onSubmitTask: (task: TTask) => void;
  onSubmitTask: (task: TTask) => void;
  loading: boolean;
  errorMessage: string;
  resetRef?: React.RefObject<(() => void) | null>;
}

export function TaskModal({
  open,
  onOpenChange,
  initialData,
  mode = "add",
  onSubmitTask,
  loading,
  errorMessage,
  resetRef,
}: TaskModalProps) {
  const form = useForm<TTask>({
    defaultValues: initialData || {
      title: "",
      todo_date: "",
      priority: "",
      description: "",
    },
  });

  useEffect(() => {
    if (resetRef) {
      resetRef.current = () => form.reset();
    }
  }, [resetRef, form]);

  const handleSubmit = async (data: TTask) => {
    const task = {
      ...data,
      id: initialData?.id,
      todo_date: data.todo_date,
    };

    if (!task.todo_date) {
      delete task["todo_date"];
    }
    if (!task.id) {
      delete task["id"];
    }
    if (!task.priority) {
      delete task["priority"];
    }

    console.log("task.todo_date: ", task.todo_date);
    // form.reset();
    onSubmitTask(task);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md bg-white rounded-xl"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl text-slate-900">
            {mode === "add" ? "Add New Task" : "Update Task"}
            <div className="border-b-2 border-blue-600 w-16 mt-1"></div>
          </DialogTitle>
          <Button
            variant="link"
            onClick={() => onOpenChange(false)}
            className="text-black font-medium cursor-pointer"
          >
            Go Back
          </Button>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 pt-4"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: mode === "add" ? "Title is required" : false,
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 font-semibold text-sm">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Task title"
                      {...field}
                      className="bg-white border-gray-400 h-10"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="todo_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 font-semibold text-sm">
                    Date
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value ?? ""}
                      className="bg-white border-gray-400 h-10"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 font-semibold text-sm mb-3">
                    Priority
                  </FormLabel>
                  <div className="flex flex-wrap items-center gap-6">
                    {Object.values(PRIORITY).map((level) => (
                      <div key={level} className="flex items-center gap-2">
                        <Label
                          htmlFor={level.toLowerCase()}
                          className="flex items-center gap-2 cursor-pointer text-sm text-slate-600"
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              level === PRIORITY.EXTREME
                                ? "bg-red-500"
                                : level === PRIORITY.MODERATE
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }`}
                          />
                          {level}
                        </Label>
                        <Checkbox
                          id={level.toLowerCase()}
                          checked={field?.value === level}
                          onCheckedChange={() => field.onChange(level)}
                        />
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              rules={{
                required: mode === "add" ? "Description is required" : false,
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 font-semibold text-sm">
                    Task Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Start writing here...."
                      {...field}
                      className="bg-white border-gray-400 min-h-28 resize-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-center justify-between gap-3 pt-4">
              <Button type="submit" disabled={loading}>
                {mode === "add" ? "Add Task" : "Update Task"}
              </Button>
              <Button
                type="button"
                size="icon"
                className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                onClick={() => {
                  onOpenChange(false);
                  form.reset();
                }}
                disabled={loading}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
