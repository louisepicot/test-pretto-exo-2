import { clsx, type ClassValue } from "clsx";
import type { City } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCityLabel(city: City): string {
  if (city.postalCode) {
    return `${city.name} (${city.postalCode})`;
  }
  return city.name;
}
