import React, { ReactElement } from 'react'
import { MorphingDialog, MorphingDialogClose, MorphingDialogContainer, MorphingDialogContent, MorphingDialogImage, MorphingDialogSubtitle, MorphingDialogTitle, MorphingDialogTrigger } from '../ui/morphing-dialog'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'

type TProps = {
   title: string;
   subTitle?: string
   thumbnail?: string;
   thumbnailMode?: 'icon' | 'cover';
   triggerDescription?: boolean
   children: ReactElement
   className?: string
   triggerStyle?: React.CSSProperties
}
const Madal = ({ title, subTitle, children, thumbnailMode = 'cover', triggerDescription = false, thumbnail, className, triggerStyle }: TProps) => {
   const type = {
      cover: 'h-auto w-50',
      icon: 'size-20 '
   }
   return (
      <MorphingDialog transition={{ type: 'spring', stiffness: 200, damping: 24, }}>
         <MorphingDialogTrigger style={triggerStyle} className='border rounded-lg border-gray-200/60 bg-white'>
            <div className={`flex items-center ${triggerDescription ? 'space-x-3 p-3' : 'justify-center'}`}>
               {thumbnail ? (<MorphingDialogImage
                  src={thumbnail}
                  alt={title}
                  className='h-8 w-8 object-cover rounded-lg object-top'
                  style={{
                     borderRadius: '4px',
                  }}
               />) : null}

               <div className='flex flex-col items-start justify-center space-y-0'>
                  {triggerDescription ? (
                     <>
                        <MorphingDialogTitle className='text-[10px] font-medium text-black sm:text-xs'>
                           {title}
                        </MorphingDialogTitle>
                        <MorphingDialogSubtitle className='text-[10px] text-gray-600 sm:text-xs'>
                           {subTitle ?? null}
                        </MorphingDialogSubtitle>
                     </>
                  ) : null}

               </div>
            </div>
         </MorphingDialogTrigger>
         <MorphingDialogContainer>
            <MorphingDialogContent
               style={{
                  borderRadius: '12px',
               }}
               size='md'
               className={`relative border border-gray-100 ${className}`}
            >
               <ScrollArea className='h-[90vh]' type='scroll'>
                  <div className='relative p-6'>
                     <div className='flex justify-center py-10'>
                        <MorphingDialogImage
                           src={thumbnail || ''}
                           alt='thumbnail'
                           className={type[thumbnailMode]}
                        />
                     </div>
                     <div >
                        <MorphingDialogTitle className='text-shadow-neutral-500'>
                           {title}
                        </MorphingDialogTitle>
                        <MorphingDialogSubtitle className='font-light text-gray-400'>
                           {subTitle || null}
                        </MorphingDialogSubtitle>
                        {children}
                     </div>
                  </div>
               </ScrollArea>
               <MorphingDialogClose className='text-zinc-500' />
            </MorphingDialogContent>
         </MorphingDialogContainer>
      </MorphingDialog>
   )
}

export default Madal;
