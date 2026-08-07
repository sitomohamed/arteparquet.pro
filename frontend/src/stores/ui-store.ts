'use client'

import { create } from 'zustand'

interface UIState {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  toggleMobileMenu: () => void

  cookieConsent: 'pending' | 'accepted' | 'rejected' | 'customized'
  setCookieConsent: (status: UIState['cookieConsent']) => void

  analyticsEnabled: boolean
  marketingEnabled: boolean
  setAnalyticsEnabled: (v: boolean) => void
  setMarketingEnabled: (v: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  cookieConsent: 'pending',
  setCookieConsent: (status) => set({ cookieConsent: status }),

  analyticsEnabled: false,
  marketingEnabled: false,
  setAnalyticsEnabled: (v) => set({ analyticsEnabled: v }),
  setMarketingEnabled: (v) => set({ marketingEnabled: v }),
}))
