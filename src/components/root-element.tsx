import React, { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import RootLayout from './layout';
import { LenisProvider } from './provider/lenis-context';
import { queryClient } from '../lib/queryClient';
import { Toaster } from './ui/sonner';

type TRootElement = {
   children: ReactNode;
}

const RootElement = ({ children }: TRootElement) => {
   return <QueryClientProvider client={queryClient}>
      <RootLayout>
         <LenisProvider>
            {children}
            <Toaster />
         </LenisProvider>
      </RootLayout>
   </QueryClientProvider>;
};

export default RootElement;