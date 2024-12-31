import { createRoot } from 'react-dom/client'
import { Provider } from './components/ui/provider.tsx'
import { ErrorAdviceContextProvider } from './contexts/ErrorAdviceContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <Provider>
    <QueryClientProvider client={queryClient}>
      <ErrorAdviceContextProvider>
        <App />
      </ErrorAdviceContextProvider>
    </QueryClientProvider>
  </Provider>
)
