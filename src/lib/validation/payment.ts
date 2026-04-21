import { z } from 'zod';

export const admitionExamePaymentZodSchema = z.object({
  paymentId: z.string({
    error: 'Id do pagamento é obrigatorio',
  }),
  // exameId: z.string({
  //   error: 'Id do exame de admissão é obrigatorio',
  // }),
  candidateId: z.string({
    error: 'Id do candidato é obrigatorio',
  }),
  invoice: z
    .array(z.instanceof(File), { error: 'ficheiro não carregado' })
    .min(1, 'Pelo menos um ficheiro é obrigatório'),
});
