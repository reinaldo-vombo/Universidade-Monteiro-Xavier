import React, { useState } from 'react'

import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '../components/ui/form'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '../components/ui/select'
import SubmitButton from '../components/layout/submit-button'
import { OfferedCourseSection } from '../types'
import { enrollIntoCourseZodSchema } from '../lib/validation/enrolle-to-course'
import { SubmitState } from '../types/enum'
import z from 'zod'
import { toast } from 'sonner'
import { Button } from '../components/ui/button'

interface Props {
   sections: OfferedCourseSection[]
}

export function EnrollCourseForm({ sections }: Props) {
   const [submitState, setSubmitState] = useState<SubmitState>('idle');
   const form = useForm<z.infer<typeof enrollIntoCourseZodSchema>>({
      resolver: zodResolver(enrollIntoCourseZodSchema),
      defaultValues: {
         offeredCourseId: '',
         offeredCourseSectionId: '',
      },
   })

   // ── Cadeiras únicas ──────────────────────────────────────────
   const uniqueCourses = sections.reduce<
      { id: string; title: string }[]
   >((acc, section) => {
      const course = section.offeredCourse.course
      if (!acc.find((c) => c.id === course.id)) {
         acc.push({ id: section.offeredCourseId, title: course.title })
      }
      return acc
   }, [])

   // ── Turmas da cadeira seleccionada ───────────────────────────
   const selectedCourseId = useWatch({
      control: form.control,
      name: 'offeredCourseId',
   })

   const availableSections = sections.filter(
      (s) => s.offeredCourseId === selectedCourseId,
   )

   // ── Turma seleccionada para mostrar detalhes ─────────────────
   const selectedSectionId = useWatch({
      control: form.control,
      name: 'offeredCourseSectionId',
   })
   const selectedSection = sections.find((s) => s.id === selectedSectionId)

   const isFull = (s: OfferedCourseSection) =>
      s.currentlyEnrolledStudent >= s.maxCapacity
   async function onSubmit(values: z.infer<typeof enrollIntoCourseZodSchema>) {
      setSubmitState('loading')
      await new Promise((res) => setTimeout(res, 2500));
      try {
         if (values) {
            setSubmitState('success')
            toast.success("Formulário enviado com sucesso!");
            setTimeout(() => setSubmitState('idle'), 1000)
         }
      } catch (error) {
         console.error("Form submission error", error);
         setTimeout(() => setSubmitState('idle'), 3000)
         // toast.error("Ocorreu um erro ao submeter o formulario por favor tente de novo");
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* ── Cadeira ── */}
            <FormField
               control={form.control}
               name="offeredCourseId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Cadeira</FormLabel>
                     <Select
                        onValueChange={(val) => {
                           field.onChange(val)
                           // reset turma ao mudar cadeira
                           form.setValue('offeredCourseSectionId', '')
                        }}
                        value={field.value}
                     >
                        <FormControl>
                           <SelectTrigger>
                              <SelectValue placeholder="Selecciona uma cadeira" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {uniqueCourses.map((course) => (
                              <SelectItem key={course.id} value={course.id}>
                                 {course.title}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                     <FormMessage />
                  </FormItem>
               )}
            />

            {/* ── Turma ── */}
            {selectedCourseId && (
               <FormField
                  control={form.control}
                  name="offeredCourseSectionId"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Turma</FormLabel>
                        <Select
                           onValueChange={field.onChange}
                           value={field.value}
                           disabled={availableSections.length === 0}
                        >
                           <FormControl>
                              <SelectTrigger>
                                 <SelectValue placeholder="Selecciona uma turma" />
                              </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                              {availableSections.map((s) => (
                                 <SelectItem
                                    key={s.id}
                                    value={s.id}
                                    disabled={isFull(s)}
                                 >
                                    <span className="flex items-center gap-2">
                                       {s.title}
                                       {isFull(s) && (
                                          <Button size={'icon'} variant="destructive" className="text-xs">
                                             Lotado
                                          </Button>
                                       )}
                                    </span>
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            )}

            {/* ── Detalhes da turma seleccionada ── */}
            {selectedSection && (
               <div className="rounded-lg border p-4 text-sm space-y-2">
                  <div className="flex justify-between">
                     <span className="text-muted-foreground">Vagas</span>
                     <span>
                        {selectedSection.currentlyEnrolledStudent}
                        {' / '}
                        {selectedSection.maxCapacity}
                     </span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-muted-foreground">Preço</span>
                     <span>
                        {selectedSection.price
                           ? `${selectedSection.price.amount.toLocaleString('pt-AO')} AOA`
                           : 'Incluído'}
                     </span>
                  </div>
                  {selectedSection.offeredCourse.OfferedCourseDiscipline.length > 0 && (
                     <div>
                        <span className="text-muted-foreground">Disciplinas</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                           {selectedSection.offeredCourse.OfferedCourseDiscipline.map(
                              ({ discipline }) => (
                                 <Button key={discipline.id} size={'icon'} variant="secondary">
                                    {discipline.name}
                                 </Button>
                              ),
                           )}
                        </div>
                     </div>
                  )}
               </div>
            )}

            <SubmitButton submitState={submitState} />
         </form>
      </Form>
   )
}