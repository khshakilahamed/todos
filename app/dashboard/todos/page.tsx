"use client";

import { useState } from "react";
import { Search, Filter, Plus, ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskCard } from "@/components/TaskCard";
import { AddTaskModal } from "@/components/AddTaskModel";
import NoProject from "./../../../assets/icon-no projects.png";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "Extreme" | "Moderate" | "Low";
  dueDate: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Backend Infrastructure",
    description: "Upgrading backend infrastructure for better performance",
    priority: "Extreme",
    dueDate: "Apr 15, 2025",
  },
  {
    id: "2",
    title: "Mobile App Redesign",
    description:
      "Redesigning the mobile app interface for better user experience",
    priority: "Moderate",
    dueDate: "Mar 25, 2025",
  },
  {
    id: "3",
    title: "Analytics Dashboard",
    description: "Creating a new analytics dashboard for clients",
    priority: "Low",
    dueDate: "Mar 30, 2025",
  },
];

export default function TodosPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6 md:mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2">
            Todos
          </h1>
          <div className="border-b-2 border-blue-600 w-16"></div>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          size={"lg"}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base sm:w-auto"
        >
          <Plus className="text-white" /> New Task
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Input
            id="search"
            type="text"
            placeholder="Search your task here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4 pr-10 bg-white text-sm md:text-base"
          />
          <Label
            htmlFor="search"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full rounded-lg px-3 text-white bg-primary"
          >
            <Search />
          </Label>
        </div>

        <Select>
          <SelectTrigger
            className="bg-white"
            icon={<ArrowDownUp className="h-4 w-4 text-gray-500" />}
          >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks Section */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 flex flex-col items-center justify-center py-12 md:py-20">
          <div className="text-center px-4">
            <Image src={NoProject} alt="no project" />
            <p className="text-lg md:text-2xl text-slate-900">No todos yet</p>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6">
            Your Tasks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
            ))}
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      <AddTaskModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAddTask={handleAddTask}
      />
    </div>
  );
}
