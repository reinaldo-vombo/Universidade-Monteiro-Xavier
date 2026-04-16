import { z } from 'zod';

const schema = z.object({
  GATSBY_BASE_URL: z.string(),
  GATSBY_API_BASE_URL: z.string(),
  GATSBY_UNIVERCITY_NAME: z.string(),
  GATSBY_UNIVERCITY_EMAIL: z.string(),
});

const parsed = schema.safeParse({
  GATSBY_BASE_URL: process.env.GATSBY_APP_BASE_URL,
  GATSBY_API_BASE_URL: process.env.GATSBY_APP_API_BASE_URL,
  GATSBY_UNIVERCITY_NAME: process.env.GATSBY_APP_UNIVERCITY_NAME,
  GATSBY_UNIVERCITY_EMAIL: process.env.GATSBY_APP_UNIVERCITY_EMAIL,
});

if (!parsed.success) {
  console.error('Invalid environment variables', parsed.error!.issues);
  throw new Error('Invalid environment variables');
}

export const clientEnv = parsed.data;
export type TClientEnv = z.infer<typeof schema>;
