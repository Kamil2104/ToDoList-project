import TodoItem from './TodoItem'
import type { TodoTask } from '../../todos/types'

export default function TodoList({
  tasks,
  now,
  onRemove,
  onToggleCompleted,
}: {
  tasks: TodoTask[]
  now: number
  onRemove: (id: string) => void
  onToggleCompleted: (id: string) => void
}) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/20 p-8 text-center">
        <p className="text-sm font-medium text-zinc-200">Dodaj pierwsze zadanie</p>
        <p className="mt-1 text-sm text-zinc-400">Po lewej zobaczysz listę, a po prawej formularz.</p>
      </div>
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-3">
      {tasks.map((t) => (
        <TodoItem
          key={t.id}
          task={t}
          now={now}
          onRemove={onRemove}
          onToggleCompleted={onToggleCompleted}
        />
      ))}
    </ul>
  )
}
