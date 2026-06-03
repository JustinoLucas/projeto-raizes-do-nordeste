import { useNavigate } from 'react-router-dom'
import { ChefHat, ArrowRight } from 'lucide-react'
import { useOrder } from '../../contexts/OrderContext'

const statusLabels = {
  received: 'Pedido recebido',
  preparing: 'Preparando seu pedido...',
  ready: 'Pronto para retirada!',
}

const statusColors = {
  received: 'from-primary to-primary-dark',
  preparing: 'from-amber-500 to-amber-600',
  ready: 'from-secondary to-secondary-dark',
}

export default function ActiveOrderBanner() {
  const { orders } = useOrder()
  const navigate = useNavigate()

  const activeOrder = orders.find(
    (o) => o.status !== 'picked_up'
  )

  if (!activeOrder) return null

  return (
    <button
      onClick={() => navigate(`/order/${activeOrder.id}`)}
      className={`fixed bottom-18 sm:bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-30 bg-gradient-to-r ${statusColors[activeOrder.status] || statusColors.received} text-white rounded-2xl p-4 shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
          <ChefHat className="w-5 h-5" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-bold">
            {statusLabels[activeOrder.status] || 'Pedido em andamento'}
          </p>
          <p className="text-xs text-white/70">{activeOrder.id}</p>
        </div>
        <ArrowRight className="w-5 h-5 shrink-0" />
      </div>
    </button>
  )
}
