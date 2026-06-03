import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const UnitContext = createContext()

export function UnitProvider({ children }) {
  const [selectedUnit, setSelectedUnit] = useLocalStorage('selectedUnit', null)

  return (
    <UnitContext.Provider value={{ selectedUnit, setSelectedUnit }}>
      {children}
    </UnitContext.Provider>
  )
}

export function useUnit() {
  const context = useContext(UnitContext)
  if (!context) throw new Error('useUnit must be used within UnitProvider')
  return context
}
