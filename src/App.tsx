import { NetworkState } from "@/components/common/network"
import { Toaster } from "@/components/ui/sonner"
import { router } from "@/routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster closeButton richColors position="top-right" theme="light" />
      <NetworkState />
    </QueryClientProvider>
  )
}

export default App
