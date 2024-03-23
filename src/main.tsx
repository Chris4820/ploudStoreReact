import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from './layouts/providers/Theme.tsx';
import { Toaster } from 'sonner';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
    <App/>
    <ReactQueryDevtools initialIsOpen={false} />
    <Toaster />
    </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
