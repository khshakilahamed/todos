"use client";

import { TaskCard } from "@/app/dashboard/todos/_components/TaskCard";
import Image from "next/image";
import { TaskCardSkeleton } from "@/app/dashboard/todos/_components/TaskCardSkeleton";
import { useTasks } from "@/hooks/useTask";

type TQuery = {
  search?: string;
};

const Task = ({ search }: TQuery) => {
  const { loading, refetch, tasks } = useTasks(search);

  const handleDeleteTask = (id: string) => {
    //     setTasks(tasks.filter((task) => task?.id && task?.id !== id));
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
            <img src="/placeholder.svg" alt="no project" className="w-16 h-16 mx-auto mb-4" />
            <p className="text-lg md:text-2xl text-slate-900">No todos yet</p>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6">
            Your Tasks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} refetch={refetch} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
