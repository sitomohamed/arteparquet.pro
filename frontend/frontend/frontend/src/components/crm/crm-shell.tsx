'use client'

import { useCallback, useEffect, useState } from 'react'

export function CrmShell({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const check = useCallback(async () => {
    const res = await fetch('/api/crm/leads')
    setAuthed(res.status !== 401)
    setChecking(false)
  }, [])

  useEffect(() => {
    void check()
  }, [check])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/crm/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null
      setError(data?.error ?? 'Accesso negato.')
      return
    }
    setPassword('')
    setChecking(true)
    await check()
  }

  if (checking) {
    return (
      <main className="crm-app min-h-screen bg-travertino flex items-center justify-center px-4 font-sans">
        <p className="text-neutral-500">Caricamento...</p>
      </main>
    )
  }

  if (!authed) {
    return (
      <main className="crm-app min-h-screen bg-travertino flex items-center justify-center px-4 font-sans">
        <form onSubmit={login} className="w-full max-w-sm bg-white rounded-2xl p-8 border border-neutral-200">
          <h1 className="font-serif text-2xl text-legno-bruciato mb-2">CRM</h1>
          <p className="text-sm text-neutral-500 mb-6">Pagina riservata. Non è in Google.</p>
          <label className="block text-sm font-semibold text-legno-bruciato mb-2" htmlFor="crm-pass">
            Password
          </label>
          <input
            id="crm-pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-neutral-200 rounded-xl px-3 py-2 mb-4 text-legno-bruciato"
            autoComplete="current-password"
          />
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
          <button type="submit" className="w-full bg-rovere text-white rounded-xl py-2.5 font-semibold">
            Entra
          </button>
        </form>
      </main>
    )
  }

  return <>{children}</>
}
