import React, { ReactElement } from 'react'
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "../ui/sheet"
import { Button } from '../ui/button';
import { StaticImage } from 'gatsby-plugin-image';
import { Separator } from '../ui/separator';
type TTrops = {
   title: string;
   description?: string
   className?: string
   triggerStyle?: string
   action?: () => void
   trigger: ReactElement
   triggerVariante?: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive"
   children: ReactElement,
   side: 'left' | 'top' | 'right' | 'bottom'
   disabled?: boolean
}

const SheetModal = ({ children, side = 'right', disabled = false, triggerStyle, className, trigger, title, description, triggerVariante = 'outline' }: TTrops) => {
   return (
      <Sheet>
         <SheetTrigger asChild>
            <Button disabled={disabled} variant={triggerVariante} className={triggerStyle}>
               {trigger}
            </Button>
         </SheetTrigger>
         <SheetContent side={side} className={className}>
            <SheetHeader>
               <SheetTitle className='flex items-center gap-4'>
                  <StaticImage src='../../images/logo-black.png' width={40} height={40} alt='logotipo da univercidade' />
                  {title}
               </SheetTitle>
               <Separator />
               <SheetDescription>
                  {description}
               </SheetDescription>
            </SheetHeader>
            <div className="container">
               {children}
            </div>
            <SheetFooter>
               <Button>hello</Button>
               <Separator />
               <p className="text-white/30 text-xs tracking-widest uppercase">
                  Universidade
               </p>
               <p className="text-white/30 text-xs">
                  © {new Date().getFullYear()}
               </p>
            </SheetFooter>
         </SheetContent>
      </Sheet>
   )
}

export default SheetModal
