import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b border-gray-100 rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
