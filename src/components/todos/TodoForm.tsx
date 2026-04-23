import { useId, useState } from 'react'

import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { PRIORITIES, type Priority } from '../../todos/types'
import { toIsoFromDateTimeLocal } from '../../todos/utils/date'

type FormState = {
  title: string
  dueAtLocal: string
  priority: Priority
}

export default function TodoForm({
  onAdd,
}: {
  onAdd: (task: { title: string; dueAt: string | null; priority: Priority }) => void
}) {
  const titleId = useId()
  const dueId = useId()
  const priorityId = useId()

  const [form, setForm] = useState<FormState>({
    title: '',
    dueAtLocal: '',
    priority: 'medium',
  })

  const canSubmit = form.title.trim().length > 0

  return (
    <form
      className="rounded-2xl border border-zinc-800 bg-zinc-950/30 p-4 backdrop-blur sm:p-5"
      onSubmit={(e) => {
        e.preventDefault()
        if (!canSubmit) return

        onAdd({
          title: form.title,
          dueAt: toIsoFromDateTimeLocal(form.dueAtLocal),
          priority: form.priority,
        })

        setForm((prev) => ({ ...prev, title: '', dueAtLocal: '' }))
      }}
    >
      <div className="mb-4">
        <h2 className="text-base font-semibold text-zinc-50">Nowe zadanie</h2>
        <p className="mt-1 text-sm text-zinc-300">Dodaj nazwę, termin i priorytet.</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label className="grid gap-1.5">
          <span className="text-xs font-medium text-zinc-300">Nazwa</span>
          <Input
            id={titleId}
            placeholder="Np. oddać projekt"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            autoComplete="off"
          />
        </label>

        <label className="grid gap-1.5">
          <span className="text-xs font-medium text-zinc-300">Termin (opcjonalnie)</span>
          <Input
            id={dueId}
            type="datetime-local"
            value={form.dueAtLocal}
            onChange={(e) => setForm((prev) => ({ ...prev, dueAtLocal: e.target.value }))}
          />
        </label>

        <label className="grid gap-1.5">
          <span className="text-xs font-medium text-zinc-300">Priorytet</span>
          <Select
            id={priorityId}
            value={form.priority}
            onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value as Priority }))}
          >
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </Select>
        </label>

        <Button type="submit" disabled={!canSubmit} className="mt-1 w-full">
          Dodaj
        </Button>
      </div>
    </form>
  )
}

