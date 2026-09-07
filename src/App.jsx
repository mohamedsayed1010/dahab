import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/index";
import { ThemeProvider } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import AuthContextProvider from "./context/AuthContext";

// `flowbite` is imported once in main.jsx; no need to pull it in again here.
import { GoldPriceProvider } from "./context/GoldPriceContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <GoldPriceProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>

        </GoldPriceProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;