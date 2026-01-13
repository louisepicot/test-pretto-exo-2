import { createContext } from "react";
import type { AlertFormContextValue } from "@/lib/types";

export const AlertFormContext = createContext<AlertFormContextValue | null>(
  null
);
