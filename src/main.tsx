import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from './layouts/providers/Theme.tsx';
import { Toaster } from 'sonner';

import "./lib/reacti18next/i18n.ts";
import queryClient from './lib/reactquery/reactquery.ts';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                
                    <App/>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Toaster />
                
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
