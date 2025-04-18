import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Delete '/' at the beginning of the path
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}
