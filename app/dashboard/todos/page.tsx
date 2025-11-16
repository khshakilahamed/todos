"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Task from "./_components/Task";
import { TaskModal } from "@/app/dashboard/todos/_components/TaskModel";
import { TTask } from "@/types";

export default function TodosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddTask = (newTask: TTask) => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Todos</h1>
          <div className="border-b-2 border-blue-600 w-16"></div>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          size="lg"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus /> New Task
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 flex gap-3 items-center">
        <div className="relative flex-1">
          <Input
            id="search"
            type="text"
            placeholder="Search your task..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4 pr-10 bg-white"
          />
          <Label
            htmlFor="search"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-full px-3 text-white bg-primary cursor-pointer"
          >
            <Search />
          </Label>
        </div>
      </div>

      {/* Server Component */}
      <Task search={searchQuery} />

      {/* Add Task Modal */}
      <TaskModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        mode="add"
        onSubmitTask={handleAddTask}
      />
    </div>
  );
}
