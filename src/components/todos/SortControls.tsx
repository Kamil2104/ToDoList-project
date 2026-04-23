import Button from '../ui/Button'
import Select from '../ui/Select'

export type SortKey = 'title' | 'priority'
export type SortOrder = 'asc' | 'desc'

export default function SortControls({
  sortKey,
  sortOrder,
  onSortKeyChange,
  onSortOrderChange,
}: {
  sortKey: SortKey
  sortOrder: SortOrder
  onSortKeyChange: (key: SortKey) => void
  onSortOrderChange: (order: SortOrder) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="min-w-44">
        <Select
          aria-label="Sortowanie"
          value={sortKey}
          onChange={(e) => onSortKeyChange(e.target.value as SortKey)}
        >
          <option value="priority">Priorytet</option>
          <option value="title">Nazwa</option>
        </Select>
      </div>
      <Button
        variant="secondary"
        aria-label={sortOrder === 'asc' ? 'Kolejność rosnąca' : 'Kolejność malejąca'}
        onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
        className="shrink-0"
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </Button>
    </div>
  )
}

