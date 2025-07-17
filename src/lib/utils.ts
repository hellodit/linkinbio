import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(value: number | undefined): string {
  if (value === undefined) return 'Rp 0';
  return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}
