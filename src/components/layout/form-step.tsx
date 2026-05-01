import React, { ReactElement, ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '../ui/button';
type TProps = {
   formItems: {
      id: number
      title: string;
      description: string
      form: ReactElement
      descriptionUi?: ReactElement | null
   }[]
   isFormField: boolean
   currentFormIdx: number
   setCurrentForm: React.Dispatch<React.SetStateAction<number>>
}

const FormStep = ({ formItems, isFormField, currentFormIdx, setCurrentForm }: TProps) => {
   const [active, setActive] = useState(currentFormIdx)
   const currentForm = formItems.find((form) => form.id === currentFormIdx);
   const nextSetep = () => {
      setCurrentForm(currentFormIdx + 1)
      if (isFormField) {
         setActive(currentFormIdx)
      }
   }
   const prevSetep = () => {
      if (currentFormIdx >= 1) {
         setCurrentForm(currentFormIdx - 1)
      }
   }

   const disabled = currentFormIdx <= 1;

   return (
      <div className='gap-2'>
         <div className=" bg-neutral-900 text-white rounded-2xl">
            <div className="grid grid-cols-12 gap-4 py-8 mx-auto px-6 md:px-14">
               <div className="col-span-1">
                  <div className='h-40 grid'>
                     {formItems.map((item, i) => (
                        <Button size={'icon'} key={item.id} className={item.id === currentFormIdx ? 'bg-indigo-500' : ''}>{item.id}</Button>
                     ))}

                  </div>
               </div>
               <div className="col-span-11 overflow-x-auto scrollbar-none">
                  <AnimatePresence mode="wait">
                     <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
                     >
                        <div className='col-span-7'>
                           {currentForm?.descriptionUi ? (
                              <>{currentForm.descriptionUi}</>
                           ) : (
                              <>
                                 <h2 className="text-3xl md:text-4xl font-light text-[#0D0D0D] mb-8 leading-tight">
                                    {currentForm?.title}
                                 </h2>
                                 <p className="">{currentForm?.description}</p>
                              </>
                           )}

                        </div>
                        <div className="col-span-5">
                           {currentForm?.form}
                        </div>
                     </motion.div>
                  </AnimatePresence>
                  <div className='flex items-center justify-between mt-4'>
                     <Button className='bg-white text-black' onClick={() => prevSetep()} disabled={disabled}>Retroceder</Button>
                     <Button className='bg-white text-black' onClick={() => nextSetep()} disabled={isFormField}>Proximo</Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FormStep;
