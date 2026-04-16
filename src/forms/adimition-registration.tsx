import React from 'react'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Form, FormControl, FormDescription, FormField, FormMessage, FormLabel, FormItem } from "../components/ui/form"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from "../components/ui/select"
import { createadmitionExameZodSchema } from '../lib/validation/registation'
import { FileDropzone } from '../components/file-dropzone'
import { TAcademicFaculty } from '../types'
import { clientEnv } from '../config/env'

type TProps = {
   data: TAcademicFaculty[] | undefined
}

export default function AdmitionExameForm({ data }: TProps) {
   console.log(clientEnv.GATSBY_API_BASE_URL);

   const form = useForm<z.infer<typeof createadmitionExameZodSchema>>({
      resolver: zodResolver(createadmitionExameZodSchema,),
      defaultValues: {
         biNumber: '',
         email: '',
         phoneNumber: '',
         academicFalcultyId: '',
         gradeDeclarationUrl: []
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

         if (values.gradeDeclarationUrl) {
            values.gradeDeclarationUrl.forEach((file, index) => {
               formData.append("gradeDeclarationUrl", file);
               // ou:
               // formData.append(`files[${index}]`, file);
            });
         }

         for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
         }
         const result = await fetch(`${process.env.GATSBY_API_BASE_URL}/admition-exame`, {
            method: "POST",
            body: formData,
         });
         if (!result.ok) {
            toast.warning("Falha ao enviar o formulário");

         }

         toast.success("Formulário preparado com sucesso!");
      } catch (error) {
         console.error("Form submission error", error);
         toast.error("Failed to submit the form. Please try again.");
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
                        <Input {...field} placeholder="Digite o BI" />
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
                        <Input {...field} placeholder="(+244) 9*******" />
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
                        <Input {...field} placeholder="exemplo@gmail.com" />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name='gradeDeclarationUrl'
               render={({ field }) => (
                  <FormItem className="w-full">
                     <FormLabel>Email</FormLabel>
                     <FormControl>

                        <FileDropzone
                           value={field.value}
                           onChange={field.onChange}
                           multiple
                        />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name='academicFalcultyId'
               render={({ field }) => (
                  <FormItem className="w-full">
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Select
                           value={field.value}
                           onValueChange={field.onChange}
                        >
                           <SelectTrigger>
                              <SelectValue placeholder="Selecione uma unidade" />
                           </SelectTrigger>
                           <SelectContent>
                              {data ? data.map((item) => (
                                 <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>
                              )) : (
                                 <SelectItem value='n'>Sem unidades</SelectItem>

                              )}
                           </SelectContent>
                        </Select>
                     </FormControl>
                     <FormDescription> Selecione a unidade no qual o seu curso pertence</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button disabled={loading} type="submit">Cadastra-se</Button>
         </form>
      </Form>
   )
}