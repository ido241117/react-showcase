import { useState } from 'react'
import {
  DndContext,
  type DragStartEvent,
  type DragEndEvent,
  useDraggable,
  useDroppable,
  DragOverlay,
} from '@dnd-kit/core'
import { Plus, X, GripVertical } from 'lucide-react'
import { kanbanCards } from '../lib/mockData'
import type { KanbanCard } from '../types'

const columns: { id: KanbanCard['column']; label: string; color: string }[] = [
  { id: 'todo', label: 'To Do', color: 'bg-slate-100 dark:bg-slate-700/50' },
  { id: 'in_progress', label: 'In Progress', color: 'bg-blue-50 dark:bg-blue-900/20' },
  { id: 'done', label: 'Done', color: 'bg-emerald-50 dark:bg-emerald-900/20' },
]

const priorityStyle: Record<KanbanCard['priority'], string> = {
  High: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Low: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
}

function CardContent({ card }: { card: KanbanCard }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-snug">{card.title}</p>
        <GripVertical size={14} className="text-slate-300 dark:text-slate-600 shrink-0 mt-0.5" />
      </div>
      <div className="flex items-center gap-1.5">
        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${priorityStyle[card.priority]}`}>
          {card.priority}
        </span>
        <span className="text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
          {card.tag}
        </span>
      </div>
    </div>
  )
}

function DraggableCard({ card, onDelete }: { card: KanbanCard; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: card.id })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={transform ? { transform: `translate3d(${transform.x}px,${transform.y}px,0)` } : undefined}
      className={`relative group cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-30' : ''}`}
    >
      <CardContent card={card} />
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onDelete(card.id)}
        className="absolute top-2 right-8 hidden group-hover:flex items-center justify-center w-4 h-4 text-slate-400 hover:text-red-500 transition-colors"
      >
        <X size={12} />
      </button>
    </div>
  )
}

function DroppableColumn({
  col,
  cards,
  onDelete,
  onAddCard,
}: {
  col: (typeof columns)[number]
  cards: KanbanCard[]
  onDelete: (id: string) => void
  onAddCard: (column: KanbanCard['column'], title: string) => void
}) {
  const { isOver, setNodeRef } = useDroppable({ id: col.id })
  const [adding, setAdding] = useState(false)
  const [title, setTitle] = useState('')

  const handleAdd = () => {
    if (title.trim()) {
      onAddCard(col.id, title.trim())
      setTitle('')
      setAdding(false)
    }
  }

  return (
    <div className="flex-1 min-w-64 max-w-80">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-300">{col.label}</h3>
          <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-400">
            {cards.length}
          </span>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="p-1 rounded text-slate-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
        >
          <Plus size={15} />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={[
          'min-h-64 rounded-xl p-2 space-y-2 transition-colors',
          col.color,
          isOver ? 'ring-2 ring-violet-400 ring-inset' : '',
        ].join(' ')}
      >
        {cards.map((card) => (
          <DraggableCard key={card.id} card={card} onDelete={onDelete} />
        ))}

        {adding && (
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 p-2">
            <textarea
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Card title…"
              rows={2}
              className="w-full text-sm text-slate-900 dark:text-slate-100 bg-transparent resize-none focus:outline-none placeholder-slate-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); handleAdd() }
                if (e.key === 'Escape') { setAdding(false); setTitle('') }
              }}
            />
            <div className="flex gap-2 mt-1">
              <button
                onClick={handleAdd}
                className="px-2 py-1 bg-violet-600 text-white text-xs rounded font-medium hover:bg-violet-700 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => { setAdding(false); setTitle('') }}
                className="px-2 py-1 text-slate-500 text-xs hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Kanban() {
  const [cards, setCards] = useState<KanbanCard[]>(kanbanCards)
  const [activeCard, setActiveCard] = useState<KanbanCard | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    const card = cards.find((c) => c.id === event.active.id)
    setActiveCard(card ?? null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveCard(null)
    if (!over) return
    const newCol = over.id as KanbanCard['column']
    setCards((prev) =>
      prev.map((c) => (c.id === active.id ? { ...c, column: newCol } : c)),
    )
  }

  const handleDelete = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id))
  }

  const handleAddCard = (column: KanbanCard['column'], title: string) => {
    const newCard: KanbanCard = {
      id: `k${Date.now()}`,
      title,
      column,
      priority: 'Medium',
      tag: 'Feature',
      position: cards.filter((c) => c.column === column).length,
    }
    setCards((prev) => [...prev, newCard])
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Kanban Board</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          @dnd-kit drag & drop · add / delete cards · 3 columns
        </p>
      </div>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((col) => (
            <DroppableColumn
              key={col.id}
              col={col}
              cards={cards.filter((c) => c.column === col.id)}
              onDelete={handleDelete}
              onAddCard={handleAddCard}
            />
          ))}
        </div>
        <DragOverlay>
          {activeCard && <CardContent card={activeCard} />}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
