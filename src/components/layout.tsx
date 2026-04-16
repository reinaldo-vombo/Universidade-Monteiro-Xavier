import React, { ReactNode } from 'react'
import Navbar from './layout/nav-bar'
type TProps = {
   children: ReactNode
}

export default function RootLayout({ children }: TProps) {
   return (
      <>
         <Navbar />
         <main className='bg-[#F7F5F0]'>
            {children}
         </main>
      </>
   )
}
