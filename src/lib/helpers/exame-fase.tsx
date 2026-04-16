import { TAdmitionExameFase } from "../../types"

export function formatDateShort(date: Date | string) {
   return new Date(date).toLocaleDateString('pt-PT', {
      day: '2-digit', month: 'short',
   })
}


export function isActive(fase: TAdmitionExameFase) {
   const now = new Date()
   return new Date(fase.startDate) <= now && now <= new Date(fase.endDate)
}

export function isPast(fase: TAdmitionExameFase) {
   return new Date(fase.endDate) < new Date()
}