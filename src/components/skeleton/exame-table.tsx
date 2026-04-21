import React from 'react'


export function ExameTableSkeletont() {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
         {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-[#0D0D0D]/8 rounded-2xl p-6 animate-pulse">
               <div className="flex gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#0D0D0D]/6" />
                  <div className="flex-1 space-y-2">
                     <div className="h-4 bg-[#0D0D0D]/6 rounded w-3/4" />
                     <div className="h-3 bg-[#0D0D0D]/4 rounded w-1/2" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  {[...Array(4)].map((_, j) => (
                     <div key={j} className="space-y-1">
                        <div className="h-2 bg-[#0D0D0D]/4 rounded w-1/2" />
                        <div className="h-4 bg-[#0D0D0D]/6 rounded" />
                     </div>
                  ))}
               </div>
            </div>
         ))}
      </div>
   )
}