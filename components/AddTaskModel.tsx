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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "./ui/checkbox";

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (task: any) => void;
}

export function AddTaskModal({
  open,
  onOpenChange,
  onAddTask,
}: AddTaskModalProps) {
  const form = useForm({
    defaultValues: {
      title: "",
      date: "",
      priority: "Moderate",
      description: "",
    },
  });

  const onSubmit = (data: any) => {
    const newTask = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.date || "No due date",
    };
    onAddTask(newTask);
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
            <h2>Add New Task</h2>
            <div className="border-b-2 border-blue-600 w-16"></div>
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
            onSubmit={form.handleSubmit(onSubmit)}
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 font-semibold text-sm">
                    Date
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
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
                    {/* Extreme */}
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor="extreme"
                        className="flex items-center gap-2 cursor-pointer text-sm text-slate-600"
                      >
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                        Extreme
                      </Label>
                      <Checkbox
                        checked={field.value === "Extreme"}
                        onCheckedChange={() => field.onChange("Extreme")}
                        id="extreme"
                      />
                    </div>

                    {/* Moderate */}
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor="moderate"
                        className="flex items-center gap-2 cursor-pointer text-sm text-slate-600"
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        Moderate
                      </Label>
                      <Checkbox
                        checked={field.value === "Moderate"}
                        onCheckedChange={() => field.onChange("Moderate")}
                        id="moderate"
                      />
                    </div>

                    {/* Low */}
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor="low"
                        className="flex items-center gap-2 cursor-pointer text-sm text-slate-600"
                      >
                        <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                        Low
                      </Label>
                      <Checkbox
                        checked={field.value === "Low"}
                        onCheckedChange={() => field.onChange("Low")}
                        id="low"
                      />
                    </div>
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
              <Button type="submit" className="">
                Done
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
