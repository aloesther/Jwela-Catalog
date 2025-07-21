import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
