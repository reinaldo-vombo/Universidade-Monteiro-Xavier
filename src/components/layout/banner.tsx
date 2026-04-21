import { Link } from 'gatsby'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
type TProps = {
   links?: {
      lable: string
      url: string
   }[]
   title: string
   description?: string
   subTitle?: string
   thumbnail?: string
}

const Banner = ({ links, title, description, thumbnail, subTitle }: TProps) => {
   return (
      <div className="bg-[#0D0D0D] text-center md:text-left md:h-1/2 px-4 md:px-20 pt-8 md:pt-36 pb-16">
         <div className='md:hidden flex mb-4'>
            <Button variant={'link'} className='border border-white rounded-md p-2 mr-auto'>
               <Link to=''>
                  <ArrowLeft className='text-white ' />
               </Link>

            </Button>
         </div>
         <div className="flex items-center gap-4">
            {links ? links.map((item) => (
               <Link
                  to={item.url}
                  className="text-xs tracking-widest text-white/40 uppercase hover:text-white/70
                                     transition-colors mb-10 inline-block"
               >
                  ← {item.lable}
               </Link>

            )) : null}
         </div>
         <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">{subTitle}</p>
         <h1 className="text-3xl md:text-7xl font-light text-white leading-none tracking-tight">
            {title}
         </h1>
         <p className="text-white/40 mt-4 text-base font-light">
            {description}
         </p>
      </div>
   )
}

export default Banner;
