import { TRegistrationStatus } from "../types/enum";

export const PASSED_FILTERS = [
   { label: 'Todos', value: undefined, },
   { label: 'Aprovados', value: true, },
   { label: 'Reprovados', value: false, },
] as const
export const STATUS_OPTIONS = ['ALL', 'CONFIRMED', 'WAITING_LIST', 'CANCELLED'] as const
export type TabStatus = typeof STATUS_OPTIONS[number]
export const TABS: { label: string; value: TRegistrationStatus | 'ALL' }[] = [
   { label: 'Todos', value: 'ALL' },
   { label: 'Confirmados', value: 'CONFIRMED' },
   { label: 'Lista de Espera', value: 'WAITING_LIST' },
   { label: 'Cancelados', value: 'CANCELLED' },
]
export type PassedFilter = boolean | undefined