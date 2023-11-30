import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function truncateStringByBytes(text: string, bytes: number) {
  const encoder = new TextEncoder();
  return new TextDecoder().decode(encoder.encode(text).slice(0, bytes));
}

export async function convertToAscii(text: string) {
  // remove non-ascii characters
  return text.replace(/[^\x00-\x7F]/g, "");
}
