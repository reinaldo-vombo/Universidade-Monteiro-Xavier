import React, { ReactNode } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/react'
import { QueryClientProvider } from '@tanstack/react-query';
import RootLayout from './layout';
import { LenisProvider } from '../provider/lenis-context';
import { queryClient } from '../lib/queryClient';
import { Toaster } from './ui/sonner';
import { ErrorBoundary } from './error/error-boundary';

type TRootElement = {
   children: ReactNode;
}

const RootElement = ({ children }: TRootElement) => {
   return <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
         <RootLayout>
            <NuqsAdapter>
               {children}
            </NuqsAdapter>
            <Toaster richColors />
         </RootLayout>
      </ErrorBoundary>
   </QueryClientProvider>;
};

export default RootElement;