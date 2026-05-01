import { clientEnv } from '../../config/env';

export const registerStudent = async (body: FormData) => {
  const res = await fetch(`${clientEnv.GATSBY_API_BASE_URL}/student`, {
    method: 'POST',
    body,
  });
  if (!res.ok) {
    throw new Error('Erro na API');
  }
  const result = await res.json();
  return result;
};
