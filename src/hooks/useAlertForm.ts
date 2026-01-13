import { useContext } from "react";

import type { AlertFormContextValue } from "@/lib/types";
import { AlertFormContext } from "@/contexts/AlertFormContext";

export function useAlertForm(): AlertFormContextValue {
  const context = useContext(AlertFormContext);
  if (!context) {
    throw new Error("useAlertForm must be used within an AlertFormProvider");
  }
  return context;
}
