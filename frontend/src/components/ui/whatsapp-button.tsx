'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const PHONE_NUMBER = '393892407827'
const DEFAULT_MESSAGE = encodeURIComponent(
  'Ciao! Vorrei informazioni sui vostri servizi di parquet.'
)

export function WhatsAppButton() {
  const href = `https://wa.me/${PHONE_NUMBER}?text=${DEFAULT_MESSAGE}`

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp — risposta entro 5 minuti"
      className="fixed bottom-6 right-6 z-50 hidden md:flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#128C7E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 transition-colors duration-200"
      style={{ width: 56, height: 56 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
    >
      {/* Pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
          delay: 4,
        }}
        aria-hidden="true"
      />
      <MessageCircle
        size={26}
        fill="white"
        strokeWidth={0}
        aria-hidden="true"
      />
    </motion.a>
  )
}
