// hooks/usePageData.ts
import { useQuery } from '@tanstack/react-query';
import { getPageData } from '../services/api';

export function usePageData() {
  return useQuery({
    queryKey: ['page-data'],
    queryFn: getPageData,
    staleTime: 1000 * 60 * 5,
  });
}
