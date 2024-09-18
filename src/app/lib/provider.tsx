'use client';

import React, { useState, ReactNode } from 'react';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
    dehydrate,
    HydrationBoundary
} from '@tanstack/react-query';

const Provider = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(() =>
        new QueryClient({
            defaultOptions: { queries: { refetchOnWindowFocus: false } },
        }));
    const dehydratedState = dehydrate(queryClient);
    return (
        <QueryClientProvider client={queryClient} >
            <ReactQueryDevtools initialIsOpen={false} />
            <HydrationBoundary state={dehydratedState}>
                {children}
            </HydrationBoundary>
        </QueryClientProvider>
    )
}

export default Provider;