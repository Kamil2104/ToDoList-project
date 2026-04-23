export type Priority = 'low' | 'medium' | 'high'

export type TodoTask = {
  id: string
  title: string
  createdAt: string // ISO
  dueAt: string | null // ISO
  priority: Priority
  completed: boolean
}

export const PRIORITIES: Array<{ value: Priority; label: string; sortValue: number }> = [
  { value: 'low', label: 'Niski', sortValue: 1 },
  { value: 'medium', label: 'Średni', sortValue: 2 },
  { value: 'high', label: 'Wysoki', sortValue: 3 },
] as const

export function prioritySortValue(priority: Priority) {
  return PRIORITIES.find((p) => p.value === priority)?.sortValue ?? 0
}
