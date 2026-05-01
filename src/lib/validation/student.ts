import { z } from 'zod';

export const createStudentZodSchema = z.object({
  firstName: z
    .string({
      error: 'Primero nome é obrigatório',
    })
    .min(1, 'Preencha seu primero nome'),
  middleName: z.string().min(1, 'Preencha seu nome do meio'),
  lastName: z
    .string({
      error: 'Último nome é obrigatório',
    })
    .min(1, 'Preencha seu último nome'),
  profileImage: z
    .array(z.instanceof(File))
    .min(1, 'Pelo menos um ficheiro é obrigatório')
    .optional(),
  email: z.string({
    error: 'Email é obrigatório',
  }),
  contactNo: z.string().optional(),
  gender: z
    .string({
      error: 'Género é obrigatório',
    })
    .min(1, 'Selecione seu género'),
  academicSemesterId: z.string({
    error: 'Academic semester is required',
  }),
  academicDepartmentId: z.string({
    error: 'Academic department is required',
  }),
  academicFacultyId: z.string({
    error: 'Unidade academico é obrigatorio',
  }),
});
