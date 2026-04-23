import Button from '../ui/Button'
import type { TodoTask } from '../../todos/types'
import { PRIORITIES } from '../../todos/types'
import { formatDateTime } from '../../todos/utils/date'

function priorityMeta(priority: TodoTask['priority']) {
  const base = PRIORITIES.find((p) => p.value === priority)
  const label = base?.label ?? priority

  if (priority === 'high')
    return { label, badge: 'bg-red-500/10 text-red-200 border-red-500/20' }
  if (priority === 'medium')
    return { label, badge: 'bg-orange-500/10 text-orange-200 border-orange-500/20' }
  return { label, badge: 'bg-emerald-500/10 text-emerald-200 border-emerald-500/20' }
}

export default function TodoItem({
  task,
  now,
  onRemove,
  onToggleCompleted,
}: {
  task: TodoTask
  now: number
  onRemove: (id: string) => void
  onToggleCompleted: (id: string) => void
}) {
  const p = priorityMeta(task.priority)
  const created = formatDateTime(task.createdAt)
  const due = task.dueAt ? formatDateTime(task.dueAt) : null
  const isOverdue = task.dueAt ? new Date(task.dueAt).getTime() < now : false

  return (
    <li className="group rounded-2xl border border-zinc-800 bg-zinc-950/25 p-4 backdrop-blur transition hover:border-zinc-700">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={[
                'truncate text-base font-semibold',
                task.completed ? 'text-zinc-400 line-through decoration-zinc-600' : 'text-zinc-50',
              ].join(' ')}
            >
              {task.title}
            </h3>
            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${p.badge}`}>
              {p.label}
            </span>
            {!task.completed && isOverdue && (
              <span className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-200">
                Po terminie
              </span>
            )}
          </div>

          <dl className="mt-2 grid grid-cols-1 gap-1 text-xs text-zinc-300 sm:grid-cols-2 sm:gap-x-4">
            <div className="flex items-center justify-between gap-2 sm:justify-start">
              <dt className="text-zinc-400">Utworzono</dt>
              <dd className="font-medium text-zinc-200">{created}</dd>
            </div>
            <div className="flex items-center justify-between gap-2 sm:justify-start">
              <dt className="text-zinc-400">Termin</dt>
              <dd className="font-medium text-zinc-200">{due ?? '—'}</dd>
            </div>
          </dl>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            variant={task.completed ? 'secondary' : 'primary'}
            size="sm"
            onClick={() => onToggleCompleted(task.id)}
          >
            {task.completed ? 'Cofnij' : 'Zrobione'}
          </Button>
          <Button variant="danger" size="sm" onClick={() => onRemove(task.id)}>
            Usuń
          </Button>
        </div>
      </div>
    </li>
  )
}
