import { format } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const formatBorrowedBook = (borrowDate: string, dueDate: string) => {
  const borrowedOn = format(new Date(borrowDate), "MMM d");
  const due = new Date(dueDate);
  const today = new Date();

  const timeDiff = due.getTime() - today.getTime();
  const daysLeft = Math.max(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)), 0);

  return {
    borrowedText: `${borrowedOn}`,
    daysLeftText: `${daysLeft}`,
  };
};
