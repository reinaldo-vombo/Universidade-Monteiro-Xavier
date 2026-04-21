import React from 'react'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Form, FormControl, FormDescription, FormField, FormMessage, FormLabel, FormItem } from "../components/ui/form"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { createadmitionExameZodSchema } from '../lib/validation/registation'
import { FileDropzone } from '../components/file-dropzone'
import { clientEnv } from '../config/env'
import { navigate } from 'gatsby'

type TProps = {
   academicFalcultyId: string
}

export default function AdmitionExameForm({ academicFalcultyId }: TProps) {

   const form = useForm<z.infer<typeof createadmitionExameZodSchema>>({
      resolver: zodResolver(createadmitionExameZodSchema,),
      defaultValues: {
         biNumber: '',
         email: '',
         phoneNumber: '',
         academicFalcultyId: academicFalcultyId || 'd',
         gradeDeclarationFile: []
      }
   })
   const { handleSubmit, control } = form;

   async function onSubmit(values: z.infer<typeof createadmitionExameZodSchema>) {
      try {
         const formData = new FormData();
         formData.append("biNumber", values.biNumber);
         formData.append("email", values.email);
         formData.append("phoneNumber", values.phoneNumber);
         formData.append("academicFalcultyId", values.academicFalcultyId);

         if (values.gradeDeclarationFile) {
            values.gradeDeclarationFile.forEach((file, index) => {
               formData.append("gradeDeclarationFile", file);
               // ou:
               // formData.append(`files[${index}]`, file);
            });
         }

         for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
         }
         const result = await fetch(`${clientEnv.GATSBY_API_BASE_URL}/admission-exame`, {
            method: "POST",
            body: formData,
         });
         if (!result.ok) {
            // toast.warning("Falha ao enviar o formulário");
            console.error('Falha ao enviar o formulário')
         }
         const res = await result.json()
         if (!res.success) {
            toast.error(res.message)
            return
         }
         navigate(`/exames-de-acesso/pagamento?exameId=${res.data.exameId}`)

         toast.success("Formulário preparado com sucesso!");
      } catch (error) {
         console.error("Form submission error", error);
         // toast.error("Ocorreu um erro ao submeter o formulario por favor tente de novo");
      }
   }
   const loading = form.formState.isSubmitting

   return (
      <Form {...form}>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
         >
            {/* BI NUMBER */}
            <FormField
               control={control}
               name='biNumber'
               render={({ field }) => (
                  <FormItem className="w-full">
                     <FormLabel>Número do bi</FormLabel>
                     <FormControl>
                        <Input {...field} className='bg-white' placeholder="Digite o BI" />
                     </FormControl>
                     <FormDescription> O seu nome sera preachido atomaticamento atravez do seu bi</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name='phoneNumber'
               render={({ field }) => (
                  <FormItem className="w-full">
                     <FormLabel>Número de telefone</FormLabel>
                     <FormControl>
                        <Input {...field} className='bg-white' placeholder="(+244) 923456789" />
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
                        <Input {...field} className='bg-white' placeholder="exemplo@gmail.com" />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name='gradeDeclarationFile'
               render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                     <FormLabel>Declaração de nota</FormLabel>
                     <FormControl>
                        <FileDropzone
                           value={field.value}
                           onChange={field.onChange}
                           accept="documents"
                           maxSizeMB={5}
                           label="Declaração de notas"
                           error={fieldState.error?.message}
                        />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button disabled={loading} type="submit">Cadastra-se</Button>
         </form>
      </Form>
   )
}