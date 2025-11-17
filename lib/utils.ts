import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cardDateFormat(date: string): string {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    console.error("Invalid date:", date);
    return date; // return original or ""
  }

  const formattedDate = format(parsedDate, "MMM dd, yyyy");

  return formattedDate;
}
