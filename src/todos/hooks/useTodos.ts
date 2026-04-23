import { useCallback, useEffect } from 'react'

import { useLocalStorageState } from '../../hooks/useLocalStorageState'
import type { Priority, TodoTask } from '../types'

const STORAGE_KEY = 'todo.tasks.v1'

type AddTaskInput = {
  title: string
  dueAt: string | null
  priority: Priority
}

export function useTodos() {
  const [tasks, setTasks] = useLocalStorageState<TodoTask[]>(STORAGE_KEY, [])

  useEffect(() => {
    const needsMigration = tasks.some(
      (t) => typeof (t as unknown as { completed?: unknown }).completed !== 'boolean',
    )
    if (!needsMigration) return

    setTasks((prev) =>
      prev.map((t) => ({
        ...t,
        completed: typeof (t as unknown as { completed?: unknown }).completed === 'boolean' ? t.completed : false,
      })),
    )
  }, [setTasks, tasks])

  const addTask = useCallback(
    (input: AddTaskInput) => {
      const title = input.title.trim()
      if (!title) return

      const newTask: TodoTask = {
        id: crypto.randomUUID(),
        title,
        createdAt: new Date().toISOString(),
        dueAt: input.dueAt,
        priority: input.priority,
        completed: false,
      }

      setTasks((prev) => [newTask, ...prev])
    },
    [setTasks],
  )

  const toggleCompleted = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      )
    },
    [setTasks],
  )

  const removeTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((t) => t.id !== id))
    },
    [setTasks],
  )

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.completed))
  }, [setTasks])

  return { tasks, addTask, toggleCompleted, removeTask, clearCompleted } as const
}
