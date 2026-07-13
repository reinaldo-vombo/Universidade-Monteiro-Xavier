import React from 'react'

import { Link } from "gatsby";
import { TExamePayment } from "../types";
import { formatCurrency } from '../lib/helpers/date';

const PAYMENT_METHOD_LABEL: Record<string, string> = {
   BANK_TRANSFER: 'Transferência Bancária',
   CASH: 'Numerário',
   CARD: 'Cartão',
   MULTICAIXA: 'Multicaixa',
}
const PAYMENT_STATUS_LABEL: Record<string, string> = {
   PAID: 'Pago',
   PENDING: 'Pendente',
   FAILED: 'Falhado',
}

export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
   return (
      <div className="bg-white border border-[#0D0D0D]/8 rounded-2xl p-7">
         <p className="text-xs tracking-[0.2em] text-[#0D0D0D]/35 uppercase mb-6">{title}</p>
         {children}
      </div>
   )
}

export function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
   return (
      <div>
         <p className="text-xs tracking-wide text-[#0D0D0D]/35 uppercase mb-1">{label}</p>
         <p className={`text-sm text-[#0D0D0D] font-medium break-all
                     ${mono ? 'font-mono text-xs text-[#0D0D0D]/60' : ''}`}>
            {value}
         </p>
      </div>
   )
}

export function PagamentoRow({ pagamento, exameId }: { pagamento: TExamePayment, exameId: string, }) {
   const isPaid = pagamento.status === 'APROVE'
   const paymentUrl = `/exames-de-acesso/pagamento?exameId=${exameId}&candidateId=${pagamento.canditateId}&paymentId=${pagamento.id}&totalAmout=${pagamento.totalAmount}`

   return (
      <Link to={paymentUrl} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4
                    p-4 rounded-xl bg-[#0D0D0D]/3 border border-[#0D0D0D]/5">
         <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full shrink-0
                          ${isPaid ? 'bg-emerald-500' : 'bg-amber-400'}`} />
            <div>
               <p className="text-sm font-medium text-[#0D0D0D]">
                  {PAYMENT_METHOD_LABEL[pagamento.method] ?? pagamento.method}
               </p>
               {pagamento.payerName && (
                  <p className="text-xs text-[#0D0D0D]/40 mt-0.5">{pagamento.payerName}</p>
               )}
            </div>
         </div>

         <div className="flex items-center gap-6 sm:gap-8">
            {/* Items do pagamento */}
            <div className="text-xs text-[#0D0D0D]/40 space-y-0.5">
               {pagamento.paymentItems?.map(item => (
                  <p key={item.id}>{item.description}</p>
               ))}
            </div>

            <div className="text-right">
               <p className="text-sm font-medium text-[#0D0D0D]">

                  {formatCurrency(pagamento.totalAmount)}
               </p>
               <span className={`text-xs font-medium
                            ${isPaid ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {PAYMENT_STATUS_LABEL[pagamento.status] ?? pagamento.status}
               </span>
            </div>
         </div>
      </Link>
   )
}