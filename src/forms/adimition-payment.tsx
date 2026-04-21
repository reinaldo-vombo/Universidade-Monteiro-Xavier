import React, { useState } from 'react'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Form, FormControl, FormDescription, FormField, FormMessage, FormLabel, FormItem } from "../components/ui/form"
import { FileDropzone } from '../components/file-dropzone'
import { clientEnv } from '../config/env'
import { navigate } from 'gatsby'
import { admitionExamePaymentZodSchema } from '../lib/validation/payment'
import SubmitButton from '../components/layout/submit-button'

type TProps = {
   candidateId: string
   paymentId: string
}
type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export default function AdmitionExamePaymentForm({ candidateId, paymentId }: TProps) {

   const [submitState, setSubmitState] = useState<SubmitState>('idle');

   const form = useForm<z.infer<typeof admitionExamePaymentZodSchema>>({
      resolver: zodResolver(admitionExamePaymentZodSchema,),
      defaultValues: {
         candidateId,
         paymentId,
         invoice: []
      }
   })
   const { handleSubmit, control } = form;

   async function onSubmit(values: z.infer<typeof admitionExamePaymentZodSchema>) {
      setSubmitState('loading')
      try {
         const formData = new FormData();
         formData.append("candidateId", values.candidateId);
         formData.append("paymentId", values.paymentId);

         if (values.invoice) {
            values.invoice.forEach((file, index) => {
               formData.append("invoice", file);
               // ou:
               // formData.append(`files[${index}]`, file);
            });
         }

         for (let pair of formData.entries()) {
            // console.log(pair[0], pair[1]);
         }
         const url = `${clientEnv.GATSBY_API_BASE_URL}/payments/invoice/${paymentId}/candidate/${candidateId}`;

         const result = await fetch(url, {
            method: "POST",
            body: formData,
         });
         const res = await result.json()

         if (!result.ok || !res.success) {
            setSubmitState('error')
            toast.error(res.message)
            // volta ao idle após 3s
            setTimeout(() => setSubmitState('idle'), 3000)
            return
         }
         setSubmitState('success')
         toast.success('Pagamento concluído com sucesso')
         setTimeout(() => navigate('/exames-de-acesso/listas'), 2000)
      } catch (error) {
         console.error(error)
         setSubmitState('error')
         setTimeout(() => setSubmitState('idle'), 3000)
      }
   }
   const loading = form.formState.isSubmitting

   return (
      <Form {...form}>
         <form
            onSubmit={handleSubmit(onSubmit)}
            id='form-123'
            className="h-80 pr-4.75 lg:pr-0"
         >
            {/* BI NUMBER */}

            <FormField
               control={control}
               name='invoice'
               render={({ field, fieldState }) => (
                  <FormItem className="sm:w-full">
                     <FormLabel>Recibo do pagamento</FormLabel>
                     <FormControl>
                        <FileDropzone
                           value={field.value}
                           onChange={field.onChange}
                           accept="documents"
                           maxSizeMB={5}
                           error={fieldState.error?.message}
                        />
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