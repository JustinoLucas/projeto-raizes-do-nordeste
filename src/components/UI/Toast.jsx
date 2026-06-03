import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Info } from 'lucide-react'

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
}

const colors = {
  success: 'bg-success',
  error: 'bg-danger',
  info: 'bg-primary',
}

let toastId = 0
let addToastFn = null

export function toast(message, type = 'success') {
  addToastFn?.({ id: ++toastId, message, type })
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    addToastFn = (t) => setToasts((prev) => [...prev, t])
    return () => {
      addToastFn = null
    }
  }, [])

  useEffect(() => {
    if (toasts.length === 0) return
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1))
    }, 3000)
    return () => clearTimeout(timer)
  }, [toasts])

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => {
        const Icon = icons[t.type]
        return (
          <div
            key={t.id}
            className={`${colors[t.type]} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slide-in`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{t.message}</span>
          </div>
        )
      })}
    </div>
  )
}
