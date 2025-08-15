import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getColorForName(name: string) {
  switch (name) {
    case "white":
      return "repeating-conic-gradient(#ffffff, #ffffff 10px, #f3f4f6 10px, #f3f4f6 20px)";
    case "black":
      return "#111827";
    case "purple":
      return "#8b5cf6";
    case "teal":
      return "#14b8a6";
    case "blue":
      return "#3b82f6";
    default:
      return "#e5e7eb";
  }
}