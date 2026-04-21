import { z } from 'zod';

export const contactZodSchema = z.object({
  name: z.string().min(1, 'Nome completo é obrigatório'),
  email: z
    .string({
      error: 'Email é obrigatório',
    })
    .min(1, 'Adicione o seu email'),
  subject: z
    .string({
      error: 'Assunto é obrigatório',
    })
    .min(1, 'Preencha o assunto'),
  menssage: z
    .string({
      error: 'Menssagem é obrigatório',
    })
    .min(1, 'Preencha a sua menssagem'),
});
