import { z } from 'zod';

export const createadmitionExameZodSchema = z.object({
   phoneNumber: z.string().max(9, 'Número deve conter 9 digitos'),
   email: z.string(),
   biNumber: z.string().max(14).min(1, 'Número do bi é obrigatorio'),
   gradeDeclarationUrl: z.array(z.instanceof(File))
      .min(1, "Pelo menos um ficheiro é obrigatório"),
   academicFalcultyId: z.string().min(1, 'Unidade academica é obrigatorio'),
});