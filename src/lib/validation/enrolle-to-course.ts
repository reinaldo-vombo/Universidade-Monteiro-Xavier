import { z } from 'zod';

export const enrollIntoCourseZodSchema = z.object({
  offeredCourseId: z.string().min(1, 'Selecciona uma cadeira'),
  offeredCourseSectionId: z.string().min(1, 'Selecciona uma turma'),
});
