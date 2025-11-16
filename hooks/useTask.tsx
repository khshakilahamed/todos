"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { TTask } from "@/types";

export function useTasks(search?: string) {
  const { data: tasks = [], isLoading: loading } = useQuery({
    queryKey: ["tasks", search],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/todos", {
        params: {
          search,
        },
      });
      return data.results || [];
    },
  });

  return {
    tasks,
    loading,
  };
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: number) => {
      const { data } = await axiosInstance.delete(`todos/${taskId}/`);
      return data;
    },
    onSuccess: () => {
      // Automatically invalidates and refetches all tasks queries
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: TTask) => {
      const { data } = await axiosInstance.post("/todos/", task);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...task }: Partial<TTask> & { id?: number }) => {
      const { data } = await axiosInstance.patch(`/todos/${id}/`, task);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
