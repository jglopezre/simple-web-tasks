import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from '@/components/ui/provider.tsx'
import { ErrorAdviceContextProvider, AddTaskFormDisclosureContextProvider } from '@/contexts'
import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <Provider>
    <QueryClientProvider client={queryClient}>
      <ErrorAdviceContextProvider>
        <AddTaskFormDisclosureContextProvider>
          <App />
        </AddTaskFormDisclosureContextProvider>
      </ErrorAdviceContextProvider>
    </QueryClientProvider>
  </Provider>
)
