import { useId } from 'react'

import Button from '../ui/Button'
import Input from '../ui/Input'

export type TaskFilter = 'all' | 'active' | 'done'

export default function FilterBar({
  filter,
  query,
  completedCount,
  onFilterChange,
  onQueryChange,
  onClearCompleted,
}: {
  filter: TaskFilter
  query: string
  completedCount: number
  onFilterChange: (filter: TaskFilter) => void
  onQueryChange: (q: string) => void
  onClearCompleted: () => void
}) {
  const searchId = useId()

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onFilterChange('all')}
        >
          Wszystkie
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onFilterChange('active')}
        >
          Aktywne
        </Button>
        <Button
          variant={filter === 'done' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onFilterChange('done')}
        >
          Ukończone
        </Button>

        {completedCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearCompleted}>
            Wyczyść ukończone ({completedCount})
          </Button>
        )}
      </div>

      <div className="w-full sm:max-w-xs">
        <label className="sr-only" htmlFor={searchId}>
          Szukaj
        </label>
        <Input
          id={searchId}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Szukaj po nazwie…"
        />
      </div>
    </div>
  )
}

