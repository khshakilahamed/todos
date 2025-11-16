"use client";

import { TaskCard } from "@/app/dashboard/todos/_components/TaskCard";
import Image from "next/image";
import { TaskCardSkeleton } from "@/app/dashboard/todos/_components/TaskCardSkeleton";
import { useTasks } from "@/hooks/useTask";
import { TTask } from "@/types";
import NoTask from "./../../../../assets/icon-no projects.png"

type TQuery = {
  search?: string;
};

const Task = ({ search }: TQuery) => {
  const { loading, tasks } = useTasks(search);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {tasks.map((task:TTask) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
