import {
  TAcademicFaculty,
  TAdmitionExame,
  TAdmitionExameFase,
  TBankAccounte,
  TBulkAcademicFaculty,
  TCourse,
  TDepartemant,
  TDepartemantProps,
  TSigleFaculty,
} from '../../types';
import { fetchJSON } from './fetch';

// lib/api.ts
const BASE_URL = process.env.GATSBY_APP_API_BASE_URL;

export const api = {
  departamentos: {
    list: (): Promise<TDepartemantProps> =>
      fetch(`${BASE_URL}/academic-department`).then((r) => r.json()),
    byId: (id: string): Promise<TDepartemant> =>
      fetch(`${BASE_URL}/academic-department/${id}`).then((r) => r.json()),
    byFaculty: (id: string): Promise<any> =>
      fetch(`${BASE_URL}/academic-department?academicFacultyId=${id}`).then(
        (r) => r.json(),
      ),
  },
  unidades: {
    list: async () => {
      const res = await fetch(`${BASE_URL}/academic-faculty`);

      if (!res.ok) {
        throw new Error('Erro na API');
      }
      const result = await res.json();
      return result.data;
    },
    withCourse: async (): Promise<TBulkAcademicFaculty[]> => {
      const res = await fetch(`${BASE_URL}/academic-faculty/with-courses`);
      if (!res.ok) {
        throw new Error('Erro na API');
      }
      const result = await res.json();
      return result.data;
    },
    byId: async (id: string): Promise<TAcademicFaculty> => {
      const res = await fetch(`${BASE_URL}/academic-faculty/${id}`);
      if (!res.ok) {
        throw new Error('Erro na API');
      }
      const result = await res.json();
      return result.data;
    },
  },
  cursos: {
    list: (): Promise<TCourse[]> =>
      fetch(`${BASE_URL}/course`).then((r) => r.json()),
    byId: (slug: string): Promise<TCourse> =>
      fetch(`${BASE_URL}/course/${slug}`).then((r) => r.json()),
  },
  exames: {
    // registos: (): Promise<TAdmitionExame[]> =>
    //   fetch(`${BASE_URL}/admission-exame`).then((r) => r.json()),
    registos: (params?: { exameId?: string; search?: string }) => {
      const qs = new URLSearchParams();
      if (params?.exameId) qs.set('exameId', params.exameId);
      if (params?.search) qs.set('search', params.search);
      const query = qs.toString() ? `?${qs}` : '';
      return fetchJSON(`/admission-exame/cadidates${query}`);
    },
    byExameId: (exameId: string): Promise<TAdmitionExame> =>
      fetch(`${BASE_URL}/admission-exame/${exameId}`).then((r) => r.json()),
    fases: (): Promise<TAdmitionExameFase> =>
      fetch(`${BASE_URL}/admission-exame/fases`).then((r) => r.json()),
  },
  contas: {
    all: async (): Promise<TBankAccounte[]> => {
      const res = await fetch(`${BASE_URL}/bank-accountes`);

      if (!res.ok) {
        throw new Error('Erro na API');
      }
      const result = await res.json();

      return result.data;
    },
  },
};
