
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { SEO } from '../../../components/seo'
import { TAdmitionExame } from '../../../types'
import { api } from '../../../lib/services/api'
import { RegistosTable } from '../../../components/layout/registos-table'
import ExameFilter from '../../../components/filters/exame'
import { useExameFilters } from '../../../lib/hooks/use-exame-filters'
import Banner from '../../../components/layout/banner'
import { ExameTableSkeletont } from '../../../components/skeleton/exame-table'

const links = [{
   lable: 'Exames de Acesso',
   url: '/exames-de-acesso'
}]

export default function RegistosExamePage() {
   const {
      search,
      setSearch,
      status,
      setStatus,
      passed,
      setPassed,
      exameId,
      setPage,
      page,
   } = useExameFilters();
   const { data, isPending } = useQuery<{
      data: TAdmitionExame[]
      meta: { total: number; totalPages: number; currentPage: number; limit: number }
   }>({
      queryKey: ['registos-exame', exameId, search, passed, page],
      queryFn: () => api.exames.registos({
         exameId: exameId || undefined,
         search: search || undefined,
         passed: passed || null,
         page,
         limit: 25,
      }),
      staleTime: 1000 * 60 * 2,
      placeholderData: prev => prev,
   })

   const registers = data?.data ?? [];
   const meta = data?.meta;

   const filtered = status === 'ALL'
      ? registers
      : registers.filter(r => r.status === status)


   return (
      <div>
         <Banner
            links={links}
            title='Registos'
            subTitle='Admissão'
            description='Consulta o estado da tua candidatura ao exame de admissão.' />

         <div className="max-w-7xl mx-auto px-6 md:px-20">
            <ExameFilter
               registers={registers}
               search={search}
               passed={passed}
               status={status}
               setPassed={setPassed}
               setSearch={setSearch}
               setStatus={setStatus}
            />

            {/* Lista */}
            <div className="py-10">
               {isPending ? (
                  <ExameTableSkeletont />
               ) : filtered?.length === 0 ? (
                  <EmptyState />
               ) : (
                  <RegistosTable
                     data={registers}
                     meta={meta}
                     page={page}
                     setPage={setPage}
                  />
               )}
            </div>
         </div>
      </div>
   )
}
function EmptyState() {
   return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
         <div className="w-16 h-16 rounded-full bg-[#0D0D0D]/6 flex items-center
                      justify-center text-2xl text-[#0D0D0D]/20 mb-4">
            ◎
         </div>
         <p className="text-[#0D0D0D]/40 text-sm">Nenhum registo encontrado</p>
      </div>
   )
}

export const Head = () => <SEO title='Lista dos Exames de Acesso' />
