import React from 'react'
export function InfoCell({ label, value }: { label: string; value: string }) {
   return (
      <div>
         <p className="text-xs tracking-wide text-[#0D0D0D]/35 uppercase mb-0.5">{label}</p>
         <p className="text-sm text-[#0D0D0D] font-medium truncate">{value}</p>
      </div>
   )
}