"use client";

import { useRef, useState } from "react";
import { Search, Plus, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Task from "./_components/Task";
import { TaskModal } from "@/app/dashboard/todos/_components/TaskModel";
import { TTask } from "@/types";
import { useAddTask } from "@/hooks/useTask";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const filterItems = [
  { id: 1, label: "Deadline Today", value: "today" },
  { id: 2, label: "Expires in 5 days", value: "5days" },
  { id: 4, label: "Expires in 10 days", value: "10days" },
  { id: 5, label: "Expires in 30 days", value: "30days" },
];

export default function TodosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const resetRef = useRef<(() => void) | null>(null);

  // const deleteTaskMutation = useDeleteTask();
  const addTaskMutation = useAddTask();

  const handleAddTask = async (newTask: TTask) => {
    // console.log(newTask);
    setErrorMessage("");
    try {
      const result = await addTaskMutation.mutateAsync(newTask);
      resetRef.current?.();
      setIsModalOpen(false);
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error?.message);
    }
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
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1">
          <Input
            id="search"
            type="text"
            placeholder="Search your task..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4 pr-10 bg-white min-w-[200px]"
          />
          <Label
            htmlFor="search"
            className="absolute hidden sm:flex right-0 top-1/2 -translate-y-1/2 h-full px-3 text-white bg-primary cursor-pointer rounded-lg"
          >
            <Search />
          </Label>
        </div>
        <Select>
          <SelectTrigger className="bg-white min-w-[180px]" icon={<ArrowUpDown/>}>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Date</SelectLabel>
              {filterItems?.map((item) => (
                <SelectItem key={item?.id} value={item?.value ?? ""}>{item?.label}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Server Component */}
      <Task search={searchQuery} />

      {/* Add Task Modal */}
      <TaskModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        mode="add"
        onSubmitTask={handleAddTask}
        loading={addTaskMutation?.isPending}
        errorMessage={errorMessage}
        resetRef={resetRef}
      />
    </div>
  );
}
