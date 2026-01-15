import { AlertFormContext } from "@/contexts/AlertFormContextProvider";
import { useContext } from "react";

export function useAlertFormContext() {
  const context = useContext(AlertFormContext);
  if (!context) {
    throw new Error("useAlertForm must be used within an AlertFormProvider");
  }
  return context;
}
