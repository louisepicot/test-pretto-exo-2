import "@/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { AlertForm } from "@/components/AlertForm";
import AlertFormContextProvider from "./contexts/AlertFormContextProvider";
import SearchContextProvider from "./contexts/SearchContextProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlertFormContextProvider>
        <SearchContextProvider>
          <Header />
          <AlertForm />
        </SearchContextProvider>
      </AlertFormContextProvider>
    </QueryClientProvider>
  );
}

export default App;
