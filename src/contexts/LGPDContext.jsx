import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const LGPDContext = createContext()

export function LGPDProvider({ children }) {
  const [consent, setConsent] = useLocalStorage('lgpdConsent', false)

  function acceptConsent() {
    setConsent(true)
  }

  function revokeConsent() {
    setConsent(false)
  }

  return (
    <LGPDContext.Provider value={{ consent, acceptConsent, revokeConsent }}>
      {children}
    </LGPDContext.Provider>
  )
}

export function useLGPD() {
  const context = useContext(LGPDContext)
  if (!context) throw new Error('useLGPD must be used within LGPDProvider')
  return context
}
