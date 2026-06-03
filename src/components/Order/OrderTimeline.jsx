import { ClipboardCheck, ChefHat, Package, CheckCircle } from 'lucide-react'

const steps = [
  { key: 'received', label: 'Recebido', icon: ClipboardCheck },
  { key: 'preparing', label: 'Preparando', icon: ChefHat },
  { key: 'ready', label: 'Pronto', icon: Package },
  { key: 'picked_up', label: 'Retirado', icon: CheckCircle },
]

export default function OrderTimeline({ currentStatus }) {
  const currentIndex = steps.findIndex((s) => s.key === currentStatus)

  return (
    <div className="flex items-center justify-between w-full py-4">
      {steps.map((step, index) => {
        const Icon = step.icon
        const isCompleted = index <= currentIndex
        const isCurrent = index === currentIndex
        const isLast = index === steps.length - 1

        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isCompleted
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                    : 'bg-gray-100 text-gray-400'
                } ${isCurrent ? 'ring-4 ring-secondary/20 scale-110' : ''}`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span
                className={`text-[10px] sm:text-xs font-medium text-center ${
                  isCompleted ? 'text-secondary' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div className="flex-1 h-1 mx-1 sm:mx-2 rounded-full overflow-hidden bg-gray-100">
                <div
                  className={`h-full bg-secondary transition-all duration-700 ${
                    index < currentIndex ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
