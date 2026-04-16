// components/RegistosTable.tsx
import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'gatsby'
import { TRegistrationStatus } from '../../types/enum'
import { TAdmitionExame } from '../../types'

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

function useDebounce<T>(value: T, delay = 300): T {
   const [debounced, setDebounced] = useState(value)

   useEffect(() => {
      const timer = setTimeout(() => setDebounced(value), delay)
      return () => clearTimeout(timer)
   }, [value, delay])

   return debounced
}

const PAGE_SIZE_OPTIONS = [10, 25, 50]

interface Props {
   data: TAdmitionExame[]
   status: TRegistrationStatus | 'ALL'
}

export function RegistosTable({ data, status }: Props) {
   const [search, setSearch] = useState('')
   const [page, setPage] = useState(1)
   const [pageSize, setPageSize] = useState(25)

   const debouncedSearch = useDebounce(search, 300)

   // Filtra por status + search local
   const filtered = useMemo(() => {
      let rows = status === 'ALL' ? data : data.filter(r => r.status === status)

      if (debouncedSearch) {
         const q = debouncedSearch.toLowerCase()
         rows = rows.filter(r =>
            [
               r.firstName,
               r.middleName,  // pode ser null/undefined
               r.lastName,
               r.email,
               r.phoneNumber,
               r.document,
            ]
               .filter(Boolean)        // remove null/undefined/''
               .some(field => field!.toLowerCase().includes(q))
         )
      }

      return rows
   }, [data, status, debouncedSearch])


   // Reset página ao filtrar
   useEffect(() => { setPage(1) }, [debouncedSearch, status])

   const totalPages = Math.ceil(filtered.length / pageSize)
   const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

   return (
      <div className="space-y-4">

         {/* Search + page size */}
         <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
            <div className="relative w-full sm:w-80">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D0D0D]/30 text-sm">
                  ⌕
               </span>
               <input
                  type="text"
                  placeholder="Filtrar por nome, email, documento..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-[#0D0D0D]/10
                       rounded-xl outline-none focus:border-[#0D0D0D]/30 transition-colors
                       placeholder-[#0D0D0D]/30 text-[#0D0D0D]"
               />
               {search && (
                  <button
                     onClick={() => setSearch('')}
                     className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0D0D0D]/30
                         hover:text-[#0D0D0D]/60 transition-colors text-xs"
                  >
                     ✕
                  </button>
               )}
            </div>

            <div className="flex items-center gap-2 text-sm text-[#0D0D0D]/50 shrink-0">
               <span>Mostrar</span>
               <select
                  value={pageSize}
                  onChange={e => { setPageSize(Number(e.target.value)); setPage(1) }}
                  className="bg-white border border-[#0D0D0D]/10 rounded-lg px-2 py-1.5
                       text-[#0D0D0D] outline-none text-sm"
               >
                  {PAGE_SIZE_OPTIONS.map(s => (
                     <option key={s} value={s}>{s}</option>
                  ))}
               </select>
               <span>por página · <strong className="text-[#0D0D0D]">{filtered.length}</strong> resultados</span>
            </div>
         </div>

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
                     {paginated.length === 0 ? (
                        <tr>
                           <td colSpan={8} className="text-center py-20 text-[#0D0D0D]/30 text-sm">
                              Nenhum registo encontrado
                           </td>
                        </tr>
                     ) : paginated.map((r, i) => {
                        const isPaid = r.ExamePayment?.[0]?.status === 'APROVE'
                        const rowNum = (page - 1) * pageSize + i + 1

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
            {totalPages > 1 && (
               <div className="flex items-center justify-between px-6 py-4
                          border-t border-[#0D0D0D]/8">
                  <p className="text-xs text-[#0D0D0D]/40">
                     {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} de {filtered.length}
                  </p>

                  <div className="flex items-center gap-1">
                     <PaginationBtn
                        onClick={() => setPage(1)}
                        disabled={page === 1}
                        label="«"
                     />
                     <PaginationBtn
                        onClick={() => setPage(p => p - 1)}
                        disabled={page === 1}
                        label="‹"
                     />

                     {/* Páginas visíveis */}
                     {getPageRange(page, totalPages).map((p, i) =>
                        p === '...' ? (
                           <span key={`ellipsis-${i}`}
                              className="w-8 text-center text-xs text-[#0D0D0D]/30">
                              …
                           </span>
                        ) : (
                           <PaginationBtn
                              key={p}
                              onClick={() => setPage(p as number)}
                              active={page === p}
                              label={String(p)}
                           />
                        )
                     )}

                     <PaginationBtn
                        onClick={() => setPage(p => p + 1)}
                        disabled={page === totalPages}
                        label="›"
                     />
                     <PaginationBtn
                        onClick={() => setPage(totalPages)}
                        disabled={page === totalPages}
                        label="»"
                     />
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

// ── Helpers ────────────────────────────────────────────────────────
function PaginationBtn({
   onClick, disabled, active, label
}: {
   onClick: () => void
   disabled?: boolean
   active?: boolean
   label: string
}) {
   return (
      <button
         onClick={onClick}
         disabled={disabled}
         className={`w-8 h-8 text-xs rounded-lg transition-all duration-150 font-medium
        ${active
               ? 'bg-[#0D0D0D] text-white'
               : disabled
                  ? 'text-[#0D0D0D]/20 cursor-not-allowed'
                  : 'text-[#0D0D0D]/50 hover:bg-[#0D0D0D]/6 hover:text-[#0D0D0D]'
            }`}
      >
         {label}
      </button>
   )
}

// Gera range de páginas com ellipsis: [1, '...', 4, 5, 6, '...', 12]
function getPageRange(current: number, total: number): (number | '...')[] {
   if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

   if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
   if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]

   return [1, '...', current - 1, current, current + 1, '...', total]
}