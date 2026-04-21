import * as React from "react"

import { Card, CardContent } from "../ui/card"
import {
   Carousel as RootCarousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "../ui/carousel"

type TProps = {
   images: string[]
}
export function Carousel({ images }: TProps) {
   return (
      <RootCarousel className="w-full max-w-48 sm:max-w-xs">
         <CarouselContent>
            {images.map((src, index) => (
               <CarouselItem key={index}>
                  <div className="p-1">
                     <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                           <img src={src} className="size-full object-cover" alt={`Image Preview-${index}`} />
                        </CardContent>
                     </Card>
                  </div>
               </CarouselItem>
            ))}
         </CarouselContent>
         <CarouselPrevious />
         <CarouselNext />
      </RootCarousel>
   )
}
