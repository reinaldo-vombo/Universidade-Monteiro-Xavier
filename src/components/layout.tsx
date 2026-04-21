import React, { ReactNode } from 'react'
import Navbar from './layout/nav-bar'
import Footer from './sections/footer'
type TProps = {
   children: ReactNode
}
//bg-[#F7F5F0]'
export default function RootLayout({ children }: TProps) {
   return (
      <>
         <Navbar />
         <main className='bg-[#F7F5F0] relative'>
            {children}
         </main>
         <Footer />
      </>
   )
}
