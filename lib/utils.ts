import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cardDateFormat(date: string): string {
  const formattedDate = format(date, "MMM, MM yyyy");

  return formattedDate;
}
