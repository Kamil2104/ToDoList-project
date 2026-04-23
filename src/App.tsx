import { useMemo, useState } from 'react'

import PageShell from './components/layout/PageShell'
import FilterBar, { type TaskFilter } from './components/todos/FilterBar'
import SortControls, { type SortKey, type SortOrder } from './components/todos/SortControls'
import TodoForm from './components/todos/TodoForm'
import TodoList from './components/todos/TodoList'
import { useNow } from './hooks/useNow'
import { useTodos } from './todos/hooks/useTodos'
import { sortTasks } from './todos/utils/sort'

function App() {
  const { tasks, addTask, toggleCompleted, removeTask, clearCompleted } = useTodos()
  const [sortKey, setSortKey] = useState<SortKey>('priority')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [filter, setFilter] = useState<TaskFilter>('all')
  const [query, setQuery] = useState('')
  const now = useNow(30_000)

  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks])

  const visibleTasks = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = tasks.filter((t) => {
      if (filter === 'active' && t.completed) return false
      if (filter === 'done' && !t.completed) return false
      if (!q) return true
      return t.title.toLowerCase().includes(q)
    })

    return sortTasks(filtered, { key: sortKey, order: sortOrder })
  }, [filter, query, sortKey, sortOrder, tasks])

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <header className="mb-8 flex flex-col gap-2">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            To-Do
          </h1>
          <p className="text-pretty text-sm leading-relaxed text-zinc-300 sm:text-base">
            Szybkie zadania z priorytetem i terminem — sortuj po nazwie lub priorytecie. Wszystko działa
            lokalnie (bez konta i bez chmury).
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="order-2 lg:order-1">
            <div className="mb-4 flex flex-col gap-3">
              <div className="text-sm text-zinc-300">
                {visibleTasks.length === 0 ? (
                  <span>Brak zadań</span>
                ) : (
                  <span>
                    Widoczne: <span className="font-medium text-zinc-100">{visibleTasks.length}</span>
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <FilterBar
                  filter={filter}
                  query={query}
                  completedCount={completedCount}
                  onFilterChange={setFilter}
                  onQueryChange={setQuery}
                  onClearCompleted={clearCompleted}
                />
                <SortControls
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                  onSortKeyChange={setSortKey}
                  onSortOrderChange={setSortOrder}
                />
              </div>
            </div>

            <TodoList
              tasks={visibleTasks}
              now={now}
              onRemove={removeTask}
              onToggleCompleted={toggleCompleted}
            />
          </div>

          <aside className="order-1 lg:order-2">
            <TodoForm onAdd={addTask} />
          </aside>
        </section>
      </div>
    </PageShell>
  )
}

export default App
