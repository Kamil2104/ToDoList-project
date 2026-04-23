import { prioritySortValue, type TodoTask } from '../types'

export type TaskSortKey = 'title' | 'priority'
export type TaskSortOrder = 'asc' | 'desc'

export function sortTasks(tasks: TodoTask[], sort: { key: TaskSortKey; order: TaskSortOrder }) {
  const direction = sort.order === 'asc' ? 1 : -1

  return [...tasks].sort((a, b) => {
    if (sort.key === 'title') {
      return (
        a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }) * direction ||
        a.createdAt.localeCompare(b.createdAt) * -1
      )
    }

    const byPriority = (prioritySortValue(a.priority) - prioritySortValue(b.priority)) * direction
    if (byPriority !== 0) return byPriority

    return a.createdAt.localeCompare(b.createdAt) * -1
  })
}

