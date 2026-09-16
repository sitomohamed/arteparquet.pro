'use client'

import { useEffect, useState } from 'react'
import type { CatalogItem } from '@/lib/catalog'

type Props = {
  onSelect: (item: CatalogItem) => void
}

export default function CatalogSelector({ onSelect }: Props) {
  const [items, setItems] = useState<CatalogItem[]>([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    void fetch('/api/crm/catalog')
      .then((r) => r.json())
      .then((data: { items: CatalogItem[] }) => {
        setItems(data.items.filter((i) => i.isActive))
      })
  }, [])

  const filtered = search
    ? items.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()),
      )
    : items

  function handleSelect(item: CatalogItem) {
    onSelect(item)
    setOpen(false)
    setSearch('')
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-sm font-semibold text-blue-600 hover:underline"
      >
        📦 Seleziona dal catalogo
      </button>
    )
  }

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mt-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-legno-bruciato">Catalogo lavorazioni</h3>
        <button
          onClick={() => {
            setOpen(false)
            setSearch('')
          }}
          className="text-xs text-neutral-500 hover:text-legno-bruciato"
        >
          Chiudi
        </button>
      </div>

      <input
        type="text"
        placeholder="Cerca nel catalogo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-neutral-200 rounded px-3 py-2 mb-3 text-sm"
      />

      <div className="max-h-64 overflow-y-auto space-y-2">
        {filtered.length === 0 ? (
          <p className="text-sm text-neutral-500 text-center py-4">Nessun risultato</p>
        ) : (
          filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className="w-full text-left border border-neutral-200 rounded-lg p-3 hover:border-rovere hover:bg-white transition-colors"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <p className="font-semibold text-legno-bruciato text-sm">{item.name}</p>
                  {item.description && (
                    <p className="text-xs text-neutral-500 mt-0.5">{item.description}</p>
                  )}
                  <p className="text-xs text-neutral-400 mt-1">
                    {item.category} · {item.unit}
                  </p>
                </div>
                <p className="text-sm font-semibold text-rovere whitespace-nowrap">
                  {(item.defaultPriceCents / 100).toFixed(2)} €
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
