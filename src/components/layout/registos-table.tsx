// components/RegistosTable.tsx
import React from 'react'
import { Link } from 'gatsby'
import { TRegistrationStatus } from '../../types/enum'
import { TAdmitionExame } from '../../types'
import { Pagination } from './pagination'

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


interface Props {
   data: TAdmitionExame[]
   meta: {
      total: number;
      totalPages: number;
      currentPage: number;
      limit: number;
   } | undefined;
   page: number;
   setPage: (page: number) => void;
}

export function RegistosTable({ data, meta, page, setPage, }: Props) {

   return (
      <div className="space-y-4">

         {/* Tabela */}
         <div className="bg-white border border-[#0D0D0D]/8 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-sm">
                  <thead>
                     <tr className="border-b border-[#0D0D0D]/8">
                        {['#', 'Candidato', 'Fase', 'Data do Exame', 'Local', 'Pagamento', 'Estado', ''].map(h => (
                           <th key={h}
                              className="text-left px-5 py-4 text-xs tracking-widest uppercase
                               text-[#0D0D0D]/35 font-normal whitespace-nowrap first:pl-6 last:pr-6">
                              {h}
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {data.length === 0 ? (
                        <tr>
                           <td colSpan={8} className="text-center py-20 text-[#0D0D0D]/30 text-sm">
                              Nenhum registo encontrado
                           </td>
                        </tr>
                     ) : data.map((r, i) => {
                        const limit = meta?.limit ?? 0;
                        const isPaid = r.ExamePayment?.[0]?.status === 'APROVE'
                        const rowNum = (meta?.currentPage ? meta?.currentPage - 1 : 0) * limit + i + 1;

                        return (
                           <tr key={r.id}
                              className="border-b border-[#0D0D0D]/5 last:border-0
                               hover:bg-[#0D0D0D]/2 transition-colors">

                              {/* Nº */}
                              <td className="pl-6 py-4 text-[#0D0D0D]/30 font-mono text-xs tabular-nums">
                                 {String(rowNum).padStart(2, '0')}
                              </td>

                              {/* Candidato */}
                              <td className="px-5 py-4">
                                 <p className="font-medium text-[#0D0D0D] leading-tight">
                                    {r.firstName} {r.middleName} {r.lastName}
                                 </p>
                                 <p className="text-xs text-[#0D0D0D]/40 mt-0.5">{r.email}</p>
                              </td>

                              {/* Fase */}
                              <td className="px-5 py-4 text-[#0D0D0D]/60 whitespace-nowrap">
                                 {r.fase?.name ?? '—'}
                              </td>

                              {/* Data */}
                              <td className="px-5 py-4 text-[#0D0D0D]/60 whitespace-nowrap tabular-nums">
                                 {new Date(r.exameDate).toLocaleDateString('pt-PT', {
                                    day: '2-digit', month: 'short', year: 'numeric'
                                 })}
                              </td>

                              {/* Local */}
                              <td className="px-5 py-4 text-[#0D0D0D]/60 text-xs whitespace-nowrap">
                                 {r.building ?? '—'}
                                 {r.room ? ` · ${r.room}` : ''}
                              </td>

                              {/* Pagamento */}
                              <td className="px-5 py-4">
                                 <span className={`inline-flex items-center gap-1.5 text-xs font-medium`}>
                                    <span className={`w-1.5 h-1.5 rounded-full
                          ${isPaid ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                                    {isPaid ? 'Pago' : 'Pendente'}
                                 </span>
                              </td>

                              {/* Status */}
                              <td className="px-5 py-4">
                                 <span className={`text-xs px-2.5 py-1 rounded-full border font-medium
                                        ${STATUS_STYLE[r.status]}`}>
                                    {STATUS_LABEL[r.status]}
                                 </span>
                              </td>

                              {/* Link */}
                              <td className="pr-6 py-4">
                                 <Link
                                    to={`/exames/registos/${r.id}`}
                                    className="text-xs text-[#0D0D0D]/30 hover:text-[#0D0D0D]/70
                                   transition-colors whitespace-nowrap"
                                 >
                                    Ver →
                                 </Link>
                              </td>
                           </tr>
                        )
                     })}
                  </tbody>
               </table>
            </div>

            {/* Paginação */}
            <div className="flex items-center justify-between px-6 py-4 border-t">
               <p className="text-xs text-[#0D0D0D]/40">
                  {meta
                     ? `${(meta.currentPage - 1) * meta.limit + 1}–${Math.min(
                        meta.currentPage * meta.limit,
                        meta.total
                     )} de ${meta.total}`
                     : "—"}
               </p>
               {meta && (
                  <Pagination
                     page={page}
                     totalPages={meta.totalPages}
                     onPageChange={setPage}
                  />

               )}
            </div>
         </div>
      </div>
   )
}

// ── Helpers ────────────────────────────────────────────────────────
