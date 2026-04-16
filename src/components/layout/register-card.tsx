import React from 'react'
import { Link } from "gatsby"
import { TAdmitionExame } from "../../types"
import { TRegistrationStatus } from '../../types/enum'
import { InfoCell } from './cell'


const STATUS_LABEL: Record<TRegistrationStatus, string> = {
   CONFIRMED: 'Confirmado',
   WAITING_LIST: 'Lista de Espera',
   CANCELLED: 'Cancelado',
}

const STATUS_STYLE: Record<TRegistrationStatus, string> = {
   CONFIRMED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
   WAITING_LIST: 'bg-amber-50 text-amber-700 border-amber-200',
   CANCELLED: 'bg-red-50 text-red-600 border-red-200',
}

export function RegistoCard({ registo }: { registo: TAdmitionExame }) {
   function initials(first: string, last: string) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
   }
   const paymentStatus = registo.ExamePayment?.[0]?.status
   const isPaid = paymentStatus === 'APROVE'

   return (
      <Link
         to={`/exames-de-acesso/registo/${registo.id}`}
         className="group block bg-white border border-[#0D0D0D]/8 rounded-2xl p-6
                 hover:border-[#0D0D0D]/20 hover:shadow-sm transition-all duration-300"
      >
         {/* Topo — avatar + nome + status */}
         <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-[#0D0D0D]/8 flex items-center
                          justify-center text-sm font-medium text-[#0D0D0D]/50 shrink-0">
                  {initials(registo.firstName, registo.lastName)}
               </div>
               <div>
                  <p className="font-medium text-[#0D0D0D] leading-tight">
                     {registo.firstName} {registo.middleName} {registo.lastName}
                  </p>
                  <p className="text-xs text-[#0D0D0D]/40 mt-0.5">{registo.email}</p>
               </div>
            </div>
            <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full border font-medium
                         ${STATUS_STYLE[registo.status]}`}>
               {STATUS_LABEL[registo.status]}
            </span>
         </div>

         {/* Info grid */}
         <div className="grid grid-cols-2 gap-3 mb-5">
            <InfoCell label="Fase" value={registo.fase?.name ?? '—'} />
            <InfoCell label="Data do Exame"
               value={new Date(registo.exameDate).toLocaleDateString('pt-PT', {
                  day: '2-digit', month: 'short', year: 'numeric'
               })} />
            {registo.building && <InfoCell label="Edifício" value={registo.building} />}
            {registo.room && <InfoCell label="Sala" value={registo.room} />}
         </div>

         {/* Footer — pagamento */}
         <div className="flex items-center justify-between pt-4 border-t border-[#0D0D0D]/6">
            <div className="flex items-center gap-2">
               <span className={`w-2 h-2 rounded-full ${isPaid ? 'bg-emerald-500' : 'bg-amber-400'}`} />
               <span className="text-xs text-[#0D0D0D]/50">
                  {isPaid ? 'Pagamento confirmado' : 'Pagamento pendente'}
               </span>
            </div>
            <span className="text-xs text-[#0D0D0D]/30 group-hover:text-[#0D0D0D]/60
                         transition-colors">
               Ver detalhes →
            </span>
         </div>
      </Link>
   )
}