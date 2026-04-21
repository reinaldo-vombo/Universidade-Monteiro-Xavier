
import React from 'react'
import { Link } from 'gatsby'
import { TAdmitionExame, TExamePayment } from '../types'
import { TRegistrationStatus } from '../types/enum'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/services/api'
import { SEO } from '../components/seo'

interface Props {
   pageContext: { registo: TAdmitionExame }
}

const STATUS_LABEL: Record<TRegistrationStatus, string> = {
   CONFIRMED: 'Confirmado',
   WAITING_LIST: 'Lista de Espera',
   CANCELLED: 'Cancelado',
}

const STATUS_STYLE: Record<TRegistrationStatus, { card: string; dot: string }> = {
   CONFIRMED: { card: 'bg-emerald-50 border-emerald-200 text-emerald-700', dot: 'bg-emerald-500' },
   WAITING_LIST: { card: 'bg-amber-50 border-amber-200 text-amber-700', dot: 'bg-amber-400' },
   CANCELLED: { card: 'bg-red-50 border-red-200 text-red-600', dot: 'bg-red-400' },
}

const PAYMENT_STATUS_LABEL: Record<string, string> = {
   PAID: 'Pago',
   PENDING: 'Pendente',
   FAILED: 'Falhado',
}

const PAYMENT_METHOD_LABEL: Record<string, string> = {
   BANK_TRANSFER: 'Transferência Bancária',
   CASH: 'Numerário',
   CARD: 'Cartão',
   MULTICAIXA: 'Multicaixa',
}

function formatDate(date: Date | string, withTime = false) {
   return new Date(date).toLocaleDateString('pt-PT', {
      day: '2-digit', month: 'long', year: 'numeric',
      ...(withTime && { hour: '2-digit', minute: '2-digit' }),
   })
}

function formatCurrency(amount: number, currency = 'AOA') {
   return new Intl.NumberFormat('pt-PT', {
      style: 'currency', currency,
      minimumFractionDigits: 0,
   }).format(amount)
}

// ── Page ───────────────────────────────────────────────────────────
export default function RegistoDetalhePage({ pageContext }: Props) {
   const { data: registo } = useQuery({
      queryKey: ['registo', pageContext.registo.id],
      queryFn: () => api.exames.byExameId(pageContext.registo.id),
      initialData: pageContext.registo,
      staleTime: 1000 * 60 * 2, // 2 min — estado de pagamento muda mais
   })


   const statusStyle = STATUS_STYLE[registo.status]
   const pagamentos = registo.ExamePayment ?? []
   const totalPago = pagamentos
      .filter(p => p.status === 'APROVE')
      .reduce((s, p) => s + p.totalAmount, 0)

   const currency = pagamentos[0]?.currency ?? 'AOA'

   return (
      <main className="min-h-screen bg-[#F7F5F0]">

         {/* Hero / Header */}
         <section className="bg-[#0D0D0D] px-6 md:px-20 pt-36 pb-16">
            <Link
               to="/exames-de-acesso"
               className="text-xs tracking-widest text-white/40 uppercase hover:text-white/70
                     transition-colors mb-10 inline-block"
            >
               ← Todos os registos
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div>
                  {/* Avatar + nome */}
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-14 h-14 rounded-full bg-white/10 flex items-center
                              justify-center text-xl font-light text-white/60">
                        {registo.firstName.charAt(0)}{registo.lastName.charAt(0)}
                     </div>
                     <div>
                        <h1 className="text-3xl md:text-5xl font-light text-white leading-none">
                           {registo.firstName} {registo.middleName} {registo.lastName}
                        </h1>
                        <p className="text-white/40 mt-1 text-sm">{registo.email}</p>
                     </div>
                  </div>
               </div>

               {/* Badge de status */}
               <span className={`self-start md:self-auto inline-flex items-center gap-2
                            text-sm font-medium px-4 py-2 rounded-full border ${statusStyle.card}`}>
                  <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                  {STATUS_LABEL[registo.status]}
               </span>
            </div>
         </section>

         <div className="max-w-5xl mx-auto px-6 md:px-20 py-16 space-y-8">

            {/* Dados do exame */}
            <SectionCard title="Detalhes do Exame">
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <Field label="Fase" value={registo.fase?.name ?? '—'} />
                  <Field label="Data do Exame" value={formatDate(registo.exameDate)} />
                  <Field label="Seu ID" value={registo.exameId} mono />
                  {registo.building && <Field label="Edifício" value={registo.building} />}
                  {registo.room && <Field label="Sala" value={registo.room} />}
                  <Field label="Horario" value='Manha - 11:00 - 12:00' mono />
               </div>
            </SectionCard>

            {/* Dados pessoais */}
            <SectionCard title="Dados Pessoais">
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <Field label="Nº de Documento" value={registo.document} mono />
                  <Field label="Telefone" value={registo.phoneNumber} />
                  <Field label="Email" value={registo.email} />
               </div>
            </SectionCard>

            {/* Resultado — só mostra se passou */}
            {registo.exameResults > 0 && (
               <SectionCard title="Resultado">
                  <div className="flex items-center gap-8">
                     <div>
                        <p className="text-xs tracking-widest text-[#0D0D0D]/40 uppercase mb-1">
                           Nota
                        </p>
                        <p className="text-4xl font-light text-[#0D0D0D]">
                           {registo.exameResults}
                           <span className="text-xl text-[#0D0D0D]/30 ml-1">/ 20</span>
                        </p>
                     </div>
                     <div>
                        <p className="text-xs tracking-widest text-[#0D0D0D]/40 uppercase mb-1">
                           Situação
                        </p>
                        <span className={`inline-flex items-center gap-2 text-sm font-medium
                                  px-3 py-1.5 rounded-full border
                                  ${registo.passed
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                              : 'bg-red-50 border-red-200 text-red-600'
                           }`}>
                           <span className={`w-1.5 h-1.5 rounded-full
                                    ${registo.passed ? 'bg-emerald-500' : 'bg-red-400'}`} />
                           {registo.passed ? 'Aprovado' : 'Reprovado'}
                        </span>
                     </div>
                  </div>
               </SectionCard>
            )}

            {/* Pagamentos */}
            <SectionCard title="Pagamentos">
               {pagamentos.length === 0 ? (
                  <p className="text-sm text-[#0D0D0D]/40">Sem registos de pagamento.</p>
               ) : (
                  <div className="space-y-4">
                     {pagamentos.map(p => (
                        <PagamentoRow
                           key={p.id}
                           pagamento={p}
                           falcultyId={registo.academicFalcultyId}
                           exameId={registo.exameId}
                        />
                     ))}

                     {/* Total */}
                     <div className="flex justify-between items-center pt-4 border-t border-[#0D0D0D]/8">
                        <p className="text-sm text-[#0D0D0D]/50">Total pago</p>
                        <p className="text-lg font-medium text-[#0D0D0D]">
                           {formatCurrency(totalPago, currency)}
                        </p>
                     </div>
                  </div>
               )}
            </SectionCard>

            {/* Comprovativo — link se existir */}
            {registo.paymentRecipt && (
               <a
                  href={registo.paymentRecipt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full bg-[#0D0D0D] text-white
                       rounded-2xl px-8 py-5 hover:bg-[#0D0D0D]/80 transition-colors group"
               >
                  <span className="text-sm tracking-wide">Ver comprovativo de pagamento</span>
                  <span className="text-white/40 group-hover:text-white transition-colors">↗</span>
               </a>
            )}
         </div>
      </main>
   )
}

// ── Sub-componentes ────────────────────────────────────────────────
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
   return (
      <div className="bg-white border border-[#0D0D0D]/8 rounded-2xl p-7">
         <p className="text-xs tracking-[0.2em] text-[#0D0D0D]/35 uppercase mb-6">{title}</p>
         {children}
      </div>
   )
}

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
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

function PagamentoRow({ pagamento, exameId, falcultyId }: { pagamento: TExamePayment, falcultyId: string, exameId: string, }) {
   const isPaid = pagamento.status === 'APROVE'
   const paymentUrl = `/exames-de-acesso/pagamento?academicFalcultyId=${falcultyId}&exameId=${exameId}&candidateId=${pagamento.canditateId}&paymentId=${pagamento.id}&totalAmout=${pagamento.totalAmount}`

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
                  {new Intl.NumberFormat('pt-PT', {
                     style: 'currency',
                     currency: pagamento.currency,
                     minimumFractionDigits: 0,
                  }).format(pagamento.totalAmount)}
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

export const Head = ({ pageContext }: Props) => <SEO title={`${pageContext.registo.firstName} ${pageContext.registo.lastName} — Registo de Exame`} />
