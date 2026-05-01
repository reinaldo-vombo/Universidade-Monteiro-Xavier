import { Link } from 'gatsby';
import React, { useState } from 'react'

const IMAGES = ['/pos-graduacao.png', '/graduacao.jpg']
const LifeInCampus = () => {
   const [slectedImage, setSlectedImage] = useState<string | null>(null)
   return (
      <div className='bg-center bg-cover h-[87vh] relative over-layer' style={{ backgroundImage: `url(${slectedImage || '/cover/contact-green-img1-min.jpg'})` }}>
         <div className="container h-full">
            <div className='relative text-center h-full place-items-center text-white grid'>
               <h1 className='text-8xl'>MX Vida no campus</h1>
               <Link to='/vida-no-campus' className='text-center font-bold'>Ver com é</Link>
               <div className='flex items-center justify-center gap-6'>
                  {IMAGES.map((src, i) => (
                     <div key={src} onClick={() => setSlectedImage(src)} className={src === slectedImage ? 'border-red-500 border-2 rounded-2xl' : ''}>
                        <img
                           className='rounded-2xl size-48 cursor-pointer'
                           src={src}
                           width={300}
                           height={300}
                           alt={`Image-preview-${i}`}
                        />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}

export default LifeInCampus;
