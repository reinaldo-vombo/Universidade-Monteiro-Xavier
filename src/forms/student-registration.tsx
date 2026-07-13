import React, { useState } from 'react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Form, FormControl, FormDescription, FormField, FormMessage, FormLabel, FormItem } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { createStudentZodSchema } from '../lib/validation/student'
import { SubmitState } from '../types/enum'
import { TAdmitionExame } from '../types'
import SubmitButton from '../components/layout/submit-button'
import { FileDropzone } from '../components/file-dropzone'
import Selector from '../components/shared/selector'
import { registerStudent } from '../lib/services/query'
type TProps = {
   data: TAdmitionExame;
   departmentId: string
}

const GENDER = [
   { id: '1', label: 'Maculino', value: 'M' },
   { id: '1', label: 'Feninino', value: 'F' },
]

const StudentRegistration = ({ data, departmentId }: TProps) => {
   const { firstName, middleName, lastName, email, phoneNumber, academicFalcultyId } = data;
   const [submitState, setSubmitState] = useState<SubmitState>('idle');

   const form = useForm<z.infer<typeof createStudentZodSchema>>({
      resolver: zodResolver(createStudentZodSchema,),
      defaultValues: {
         academicFacultyId: academicFalcultyId,
         academicDepartmentId: departmentId,
         academicSemesterId: '',
         profileImage: [],
         contactNo: phoneNumber,
         firstName,
         middleName,
         lastName,
         email,
         gender: ''
      }
   })
   const { handleSubmit, control } = form;

   async function onSubmit(values: z.infer<typeof createStudentZodSchema>) {
      setSubmitState('loading')
      await new Promise((res) => setTimeout(res, 2500));
      try {
         const formData = new FormData();
         formData.append("firstName", values.firstName);
         formData.append("middleName", values.middleName);
         formData.append("lastName", values.lastName);
         formData.append("contactNo", values.contactNo || '');
         formData.append("email", values.email);
         formData.append("gender", values.gender);

         if (values.profileImage) {
            values.profileImage.forEach((file, index) => {
               formData.append("profileImage", file);
               // ou:
               // formData.append(`files[${index}]`, file);
            });
         }

         for (let pair of formData.entries()) {
            // console.log(pair[0], pair[1]);
         }
         const result = await registerStudent(formData)
         if (!result.success) {
            toast.error('Ocorreu um ao submeter o formulario')
            return;
         }

         setSubmitState('success')
         toast.success("Formulário enviado com sucesso!");
         setTimeout(() => setSubmitState('idle'), 1000)
         localStorage.setItem('step-1', 'true')

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
            className="space-y-8 max-w-3xl mx-auto py-10"
         >
            <div className='grid grid-cols-2 gap-4'>
               <FormField
                  control={control}
                  name='firstName'
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Primero Nome</FormLabel>
                        <FormControl>
                           <Input {...field} className='bg-white cursor-not-allowed' disabled />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={control}
                  name='middleName'
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Nome do Meio</FormLabel>
                        <FormControl>
                           <Input {...field} className='bg-white cursor-not-allowed' disabled />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={control}
                  name='lastName'
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Ùltimo Nome</FormLabel>
                        <FormControl>
                           <Input {...field} className='bg-white cursor-not-allowed' disabled />
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
                           <Input {...field} className='bg-white text-black' placeholder="eu@gmail.com" />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className='flex items-center gap-4'>
               <FormField
                  control={control}
                  name='contactNo'
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Contact</FormLabel>
                        <FormControl>
                           <Input {...field} className='bg-white text-black' placeholder="(+244 934 456 789)" />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={control}
                  name='gender'
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Genero</FormLabel>
                        <FormControl>
                           <Selector formField={field} options={GENDER} className='w-full bg-white text-black' placeholder="Masculino/Feninino" />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <FormField
               control={control}
               name='profileImage'
               render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                     <FormLabel>Foto de perfil</FormLabel>
                     <FormControl>
                        <FileDropzone
                           value={field.value}
                           onChange={field.onChange}
                           accept="images"
                           maxSizeMB={5}
                           label=""
                           error={fieldState.error?.message}
                        />
                     </FormControl>
                     <FormDescription>Carrege sua foto tipo passe com as dimesões recomendadas <b>300 x 300</b></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <SubmitButton submitState={submitState} />
         </form>
      </Form>
   )
}

export default StudentRegistration
