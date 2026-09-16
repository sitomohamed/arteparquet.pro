import { notFound } from 'next/navigation'
import { getQuoteByToken, trackQuoteView } from '@/lib/quotes'
import { formatMoney } from '@/lib/money'
import { BUSINESS } from '@/lib/constants'
import QuoteActions from './_components/quote-actions'

type Props = {
  params: Promise<{ token: string }>
}

export default async function QuotePublicPage({ params }: Props) {
  const { token } = await params
  const quote = await getQuoteByToken(token)

  if (!quote) {
    notFound()
  }

  // Track view (async, non blocca render)
  void trackQuoteView(token)

  const isAccepted = quote.status === 'accepted'
  const isDeclined = quote.status === 'declined'
  const isExpired = quote.status === 'expired'
  const canInteract = !isAccepted && !isDeclined && !isExpired

  return (
    <main className="min-h-screen bg-travertino font-sans">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 py-6">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-serif text-3xl text-legno-bruciato">ARTEPARQUET</p>
          <p className="text-sm text-neutral-600 mt-1">Proposta di fornitura e posa</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Status banner */}
        {isAccepted && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8 text-center">
            <p className="text-2xl mb-2">✅</p>
            <p className="font-semibold text-green-900 text-lg">Preventivo accettato</p>
            <p className="text-sm text-green-700 mt-1">
              {quote.acceptedAt && (
                <>Accettato il {new Date(quote.acceptedAt).toLocaleDateString('it-IT')}</>
              )}
            </p>
          </div>
        )}

        {isDeclined && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8 text-center">
            <p className="text-2xl mb-2">❌</p>
            <p className="font-semibold text-red-900 text-lg">Preventivo rifiutato</p>
          </div>
        )}

        {isExpired && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8 text-center">
            <p className="text-2xl mb-2">⏰</p>
            <p className="font-semibold text-amber-900 text-lg">Preventivo scaduto</p>
          </div>
        )}

        {/* Preventivo card */}
        <article className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
          {/* Number & Date */}
          <div className="mb-8 pb-6 border-b border-neutral-200">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
              Preventivo
            </p>
            <p className="font-bold text-2xl text-legno-bruciato">{quote.number}</p>
            <p className="text-sm text-neutral-600 mt-1">
              {new Date(quote.createdAt).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            {quote.validUntil && (
              <p className="text-sm text-neutral-600 mt-1">
                Valido fino al {new Date(quote.validUntil).toLocaleDateString('it-IT')}
              </p>
            )}
          </div>

          {/* Cliente */}
          <div className="mb-8 pb-6 border-b border-neutral-200">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
              Cliente
            </p>
            <p className="font-semibold text-lg text-legno-bruciato">{quote.clientName}</p>
            <p className="text-sm text-neutral-600">{quote.clientPhone}</p>
            {quote.clientEmail && <p className="text-sm text-neutral-600">{quote.clientEmail}</p>}
            {quote.clientCity && <p className="text-sm text-neutral-600">{quote.clientCity}</p>}
          </div>

          {/* Progetto */}
          {quote.projectTitle && (
            <div className="mb-8 pb-6 border-b border-neutral-200">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                Progetto
              </p>
              <p className="font-semibold text-lg text-legno-bruciato">{quote.projectTitle}</p>
              {quote.projectDescription && (
                <p className="text-neutral-600 mt-2 whitespace-pre-wrap">
                  {quote.projectDescription}
                </p>
              )}
              {quote.projectAddress && (
                <p className="text-sm text-neutral-600 mt-2">📍 {quote.projectAddress}</p>
              )}
            </div>
          )}

          {/* Lavorazioni */}
          {quote.lines.length > 0 && (
            <div className="mb-8 pb-6 border-b border-neutral-200">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
                Lavorazioni
              </p>
              <div className="space-y-4">
                {quote.lines.map((line, idx) => (
                  <div key={line.id} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="text-legno-bruciato font-medium">
                        {idx + 1}. {line.description}
                      </p>
                      <p className="text-sm text-neutral-500 mt-1">
                        {line.quantity} {line.unit} × {formatMoney(line.unitPriceCents)}
                      </p>
                    </div>
                    <p className="font-semibold text-legno-bruciato whitespace-nowrap">
                      {formatMoney(
                        Math.round(line.quantity * line.unitPriceCents),
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Totali */}
          <div className="mb-8 pb-6 border-b border-neutral-200">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
              Riepilogo
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-neutral-700">
                <span>Subtotale</span>
                <span>{formatMoney(quote.subtotalCents)}</span>
              </div>
              {quote.discountPercent > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Sconto ({quote.discountPercent}%)</span>
                  <span>
                    -{formatMoney(Math.round(quote.subtotalCents * (quote.discountPercent / 100)))}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-neutral-700">
                <span>IVA ({quote.taxPercent}%)</span>
                <span>{formatMoney(quote.totalCents - Math.round(quote.subtotalCents * (1 - quote.discountPercent / 100)))}</span>
              </div>
              <div className="border-t-2 border-neutral-300 pt-4 mt-4" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl text-legno-bruciato">TOTALE</span>
                <span className="font-bold text-3xl text-legno-bruciato">
                  {formatMoney(quote.totalCents)}
                </span>
              </div>
            </div>
          </div>

          {/* Condizioni */}
          {quote.terms && (
            <div className="mb-8 pb-6 border-b border-neutral-200">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                Condizioni
              </p>
              <p className="text-sm text-neutral-700 whitespace-pre-wrap">{quote.terms}</p>
            </div>
          )}

          {/* Note */}
          {quote.notes && (
            <div className="mb-8 pb-6 border-b border-neutral-200">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                Note
              </p>
              <p className="text-sm text-neutral-700 whitespace-pre-wrap">{quote.notes}</p>
            </div>
          )}

          {/* Actions */}
          {canInteract && (
            <div className="mt-8">
              <QuoteActions token={token} />
            </div>
          )}
        </article>

        {/* Footer contact */}
        <div className="mt-12 text-center">
          <p className="text-sm text-neutral-600 mb-2">Hai domande su questo preventivo?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="text-rovere font-semibold hover:underline"
            >
              📞 {BUSINESS.phone}
            </a>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-semibold hover:underline"
            >
              💬 WhatsApp
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="text-rovere font-semibold hover:underline">
              ✉️ {BUSINESS.email}
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
