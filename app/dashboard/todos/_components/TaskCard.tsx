"use client";

import { Trash2, Edit2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PRIORITY, TPriority, TTask } from "@/types";
import { useState } from "react";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import { useUpdateTask } from "@/hooks/useTask";
import { TaskModal } from "./TaskModel";

interface TaskCardProps {
  task: TTask;
}

const priorityConfig: Record<TPriority, { bg: string; badge: string }> = {
  extreme: {
    bg: "bg-red-100",
    badge: "bg-red-100 text-red-700 hover:bg-red-100",
  },
  moderate: {
    bg: "bg-green-100",
    badge: "bg-green-100 text-green-700 hover:bg-green-100",
  },
  low: {
    bg: "bg-yellow-100",
    badge: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  },
};

export function TaskCard({ task }: TaskCardProps) {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  // const resetRef = useRef<(() => void) | null>(null);

  // const deleteTaskMutation = useDeleteTask();
  const updateTaskMutation = useUpdateTask();

  const handleAddTask = async (newTask: TTask) => {
    // console.log(newTask);
    setErrorMessage("");
    try {
      const result = await updateTaskMutation.mutateAsync(newTask);
      // resetRef.current?.();
      setIsModalOpen(false);
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error?.message);
    }
  };

  // const config = priorityConfig[task?.priority ?? "moderate"];
  const config =
    priorityConfig[(task.priority ?? PRIORITY.MODERATE) as TPriority];

  return (
    <div className="bg-white rounded-lg border p-6 hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex flex-wrap justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900 flex-1 pr-4">
          {task.title}
        </h3>
        <div className="flex items-center gap-1">
          <Badge
            variant="outline"
            className={cn(
              "whitespace-nowrap rounded-sm px-3 py-1",
              config?.badge
            )}
          >
            {task.priority}
          </Badge>

          <GripVertical className="text-gray-400" />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
        {task.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-slate-500">Due {task.todo_date}</p>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 bg-blue-50 text-blue-600 hover:bg-blue-150 hover:text-blue-700 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 bg-blue-50 text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
            onClick={() => {
              if (task?.id) {
                setIsOpenDialog(true);
                setDeleteTodoId(task?.id);
              }
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Update Task */}
      <TaskModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        mode="edit"
        initialData={task}
        onSubmitTask={handleAddTask}
        loading={updateTaskMutation?.isPending}
        errorMessage={errorMessage}
        // resetRef={resetRef}
      />

      {/* Delete Dialog */}
      <DeleteTaskDialog
        todoId={deleteTodoId}
        setDeleteTodoId={setDeleteTodoId}
        onOpenChange={setIsOpenDialog}
        open={isOpenDialog}
      />
    </div>
  );
}
