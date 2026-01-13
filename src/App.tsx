import "@/index.css";
import { Header } from "@/components/Header";
import { AlertForm } from "@/components/AlertForm";
import { AlertFormProvider } from "@/contexts";

function App() {
  return (
    <AlertFormProvider>
      <Header />
      <AlertForm />
    </AlertFormProvider>
  );
}

export default App;
