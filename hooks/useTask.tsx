"use client";

import axiosInstance from "@/lib/axios";
import { TTask } from "@/types";
import { useState, useEffect, useDeferredValue } from "react";

export function useTasks(search?: string) {
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetchFlag, setRefetchFlag] = useState(false);

  const deferredSearch = useDeferredValue(search);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/todos", {
        params: {
          search: deferredSearch,
        },
      });

      setTasks(data.results || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when search changes or when refetchFlag toggles
  useEffect(() => {
    fetchTasks();
  }, [deferredSearch, refetchFlag]);

  // Expose a safe refetch function
  const refetch = () => setRefetchFlag((prev) => !prev);

  return {
    tasks,
    loading,
    refetch,
  };
}
