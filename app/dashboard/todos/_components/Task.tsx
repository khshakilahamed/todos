"use client";

import { TaskCard } from "@/app/dashboard/todos/_components/TaskCard";
import Image from "next/image";
import { TaskCardSkeleton } from "@/app/dashboard/todos/_components/TaskCardSkeleton";
import { useTasks, useUpdateTask } from "@/hooks/useTask";
import { TTask } from "@/types";
import NoTask from "./../../../../assets/icon-no projects.png";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type TQuery = {
  search?: string;
};

const Task = ({ search }: TQuery) => {
  const { loading, tasks: fetchedTasks } = useTasks(search);

  const [tasks, setTasks] = useState<TTask[]>([]);
  const { mutateAsync } = useUpdateTask();

  useEffect(() => {
    setTasks(fetchedTasks);
  }, [fetchedTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t: any) => t.id === active.id);
    const newIndex = tasks.findIndex((t: any) => t.id === over.id);

    const newOrder = arrayMove(tasks, oldIndex, newIndex);
    const previousOrder = tasks; // Save old state for rollback

    setTasks(newOrder);

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const updatedTask = { id: activeTask.id, position: newIndex + 1 };

    try {
      await mutateAsync(updatedTask);
      console.log("Task position updated!");
    } catch (error) {
      console.error("Update failed:", error);

      setTasks(previousOrder);

      toast.error("Failed to update task order");
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <TaskCardSkeleton key={i}></TaskCardSkeleton>
          ))}
      </div>
    );
  }

  return (
    <div>
      {tasks.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 flex flex-col items-center justify-center py-12 md:py-20">
          <div className="text-center px-4">
            <Image src={NoTask} alt="no project" />
            <p className="text-lg md:text-2xl text-slate-900">No todos yet</p>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6">
            Your Tasks
          </h2>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={tasks.map((t: TTask) => t.id!)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {tasks?.map((task: TTask) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
};

export default Task;
