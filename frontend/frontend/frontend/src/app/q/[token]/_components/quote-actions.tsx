'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function QuoteActions({ token }: { token: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleAccept() {
    if (!confirm('Confermi di voler accettare questo preventivo?')) return
    setLoading(true)
    const res = await fetch(`/api/quotes/${token}/accept`, { method: 'POST' })
    if (res.ok) {
      router.refresh()
    } else {
      alert('Errore durante l\'accettazione. Riprova.')
      setLoading(false)
    }
  }

  async function handleDecline() {
    if (!confirm('Sei sicuro di voler rifiutare questo preventivo?')) return
    setLoading(true)
    const res = await fetch(`/api/quotes/${token}/decline`, { method: 'POST' })
    if (res.ok) {
      router.refresh()
    } else {
      alert('Errore durante il rifiuto. Riprova.')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={handleAccept}
        disabled={loading}
        className="flex-1 bg-green-600 text-white rounded-xl px-8 py-4 font-semibold text-lg hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        {loading ? 'Elaborazione...' : '✅ Accetta preventivo'}
      </button>
      <button
        onClick={handleDecline}
        disabled={loading}
        className="flex-1 bg-white text-red-600 border-2 border-red-600 rounded-xl px-8 py-4 font-semibold text-lg hover:bg-red-50 transition-colors disabled:opacity-50"
      >
        {loading ? 'Elaborazione...' : '❌ Rifiuta'}
      </button>
    </div>
  )
}
