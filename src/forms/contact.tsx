import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Form, FormControl, FormDescription, FormField, FormMessage, FormLabel, FormItem } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { contactZodSchema } from '../lib/validation/contact'
import SubmitButton from '../components/layout/submit-button'
import { Textarea } from '../components/ui/textarea'
type SubmitState = 'idle' | 'loading' | 'success' | 'error'
const ContactForm = () => {
   const [submitState, setSubmitState] = useState<SubmitState>('idle');

   const form = useForm<z.infer<typeof contactZodSchema>>({
      resolver: zodResolver(contactZodSchema,),
      defaultValues: {
         email: '',
         menssage: '',
         name: '',
         subject: ''
      }
   })
   const { handleSubmit, control } = form;

   async function onSubmit(values: z.infer<typeof contactZodSchema>) {
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
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 max-w-3xl mx-auto py-10"
         >
            {/* BI NUMBER */}
            <FormField
               control={control}
               name='name'
               render={({ field }) => (
                  <FormItem className="w-full">
                     <FormLabel>Nome completo</FormLabel>
                     <FormControl>
                        <Input {...field} className='bg-white' placeholder="Manuel Zacarias Andrades" />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name='email'
               render={({ field }) => (
                  <FormItem className="w-full">
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input {...field} className='bg-white' placeholder="exemplo@gmail" />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name='subject'
               render={({ field }) => (
                  <FormItem className="w-full">
                     <FormLabel>Assunto</FormLabel>
                     <FormControl>
                        <Input {...field} className='bg-white' placeholder="Parceira" />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name='menssage'
               render={({ field }) => (
                  <FormItem className="w-full">
                     <FormLabel>Mensagem</FormLabel>
                     <FormControl>
                        <Textarea {...field} className='bg-white text-black' placeholder="Escreva a sua mensagem" />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <SubmitButton submitState={submitState} />
         </form>
      </Form>
   )
}

export default ContactForm
