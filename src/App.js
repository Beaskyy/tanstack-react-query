import logo from "./logo.svg";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Beasky from "./components/beasky";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider
      className="App"
      client={queryClient}
    >
      <Beasky />
    </QueryClientProvider>
  );
}

export default App;
