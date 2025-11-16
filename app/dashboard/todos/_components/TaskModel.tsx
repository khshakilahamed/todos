"use client";

import { useForm } from "react-hook-form";
import { Trash2 } from 'lucide-react';
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
import { TTask } from "@/types";

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: TTask;
  mode?: "add" | "edit";
  onSubmitTask: (task: TTask) => void;
}

export function TaskModal({
  open,
  onOpenChange,
  initialData,
  mode = "add",
  onSubmitTask,
}: TaskModalProps) {
  const form = useForm<TTask>({
    defaultValues: initialData || {
      title: "",
      todo_date: "",
      priority: "moderate",
      description: "",
    },
  });

  const handleSubmit = (data: TTask) => {
    const task = {
      ...data,
      id: initialData?.id,
      todo_date: data.todo_date || "No due date",
    };
    onSubmitTask(task);
    form.reset();
    onOpenChange(false);
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
                  <div className="flex items-center gap-6">
                    {["Extreme", "Moderate", "Low"].map((level) => (
                      <div key={level} className="flex items-center gap-2">
                        <Label
                          htmlFor={level.toLowerCase()}
                          className="flex items-center gap-2 cursor-pointer text-sm text-slate-600"
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              level === "Extreme"
                                ? "bg-red-500"
                                : level === "Moderate"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }`}
                          />
                          {level}
                        </Label>
                        <Checkbox
                          id={level.toLowerCase()}
                          checked={field.value === level}
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

            {/* Buttons */}
            <div className="flex items-center justify-between gap-3 pt-4">
              <Button type="submit">
                {mode === "add" ? "Add Task" : "Update Task"}
              </Button>
              <Button
                type="button"
                size="icon"
                className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                onClick={() => onOpenChange(false)}
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
