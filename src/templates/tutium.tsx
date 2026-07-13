
import React, { useMemo, useState } from "react"
import { OfferedCourseSection } from '../types'
import { parseAsString, useQueryState } from "nuqs"
import Banner from "../components/layout/banner"
import { SEO } from "../components/seo"
import { HeadFC } from "gatsby"


interface Props {
   pageContext: { sections: OfferedCourseSection[] }
}

// Mapeia os 3 turnos existentes. Ajusta os nomes conforme a tua realidade.
const SHIFT_LABELS: Record<number, string> = {
   1: "Manhã",
   2: "Tarde",
   3: "Noite",
}

const formatKz = (value: number) =>
   new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
   }).format(value)

const Tutium = ({ pageContext }: Props) => {
   const { sections } = pageContext

   const [selectedShiftId, setSelectedShiftId] = useQueryState(
      'shifth',
      parseAsString.withDefault('').withOptions({ shallow: true, scroll: false }),
   );

   const filteredSections = useMemo(() => {
      if (selectedShiftId === "all") return sections
      return sections.filter((s) => s.shiftId === Number(selectedShiftId))
   }, [sections, selectedShiftId])


   return (
      <div className="min-h-screen bg-gray-50">

         <Banner title="Propinas" description="Consulte os valores das propinas por curso e por turno." />

         <div className="max-w-5xl mx-auto px-6 -mt-8">
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-4 md:items-end">

            </div>
         </div>

         <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                           <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                              Curso
                           </th>
                           <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                              Ano de Duração
                           </th>
                           <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                              <div className="flex items-center gap-2">
                                 <span>Turno</span>
                                 <select
                                    value={selectedShiftId}
                                    onChange={(e) => setSelectedShiftId(e.target.value)}
                                    className="border border-gray-300 rounded-md px-2 py-1 text-sm font-normal text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                 >
                                    <option value="all">Todos</option>
                                    {[1, 2, 3].map((id) => (
                                       <option key={id} value={id}>
                                          {SHIFT_LABELS[id] ?? `Turno ${id}`}
                                       </option>
                                    ))}
                                 </select>
                              </div>
                           </th>
                           <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">
                              Propina
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {filteredSections.length === 0 ? (
                           <tr>
                              <td
                                 colSpan={4}
                                 className="px-6 py-10 text-center text-gray-500"
                              >
                                 Nenhum curso encontrado para o turno selecionado.
                              </td>
                           </tr>
                        ) : (
                           filteredSections.map((section) => (
                              <tr
                                 key={section.id}
                                 className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                              >
                                 <td className="px-6 py-4 font-medium text-gray-900">
                                    {section.offeredCourse.course.title}
                                 </td>
                                 <td className="px-6 py-4 text-gray-600">
                                    {section.yearLevel}
                                 </td>
                                 <td className="px-6 py-4">
                                    <span className="inline-block text-xs font-semibold text-blue-700 bg-blue-50 rounded-full px-3 py-1">
                                       {SHIFT_LABELS[section.shiftId] ??
                                          `Turno ${section.shiftId}`}
                                    </span>
                                 </td>
                                 <td className="px-6 py-4 text-right font-bold text-blue-900">
                                    {section.price
                                       ? formatKz(section.price.amount)
                                       : "Sob consulta"}
                                 </td>
                              </tr>
                           ))
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

      </div>
   )
}

export default Tutium
export const Head: HeadFC = () => <SEO title="Propinas" />