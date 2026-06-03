import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Clock } from 'lucide-react'
import PageContainer from '../../components/Layout/PageContainer'
import OrderTimeline from '../../components/Order/OrderTimeline'
import Button from '../../components/UI/Button'
import { useOrder } from '../../contexts/OrderContext'
import { formatCurrency } from '../../utils/formatCurrency'
import { simulateOrderProgress } from '../../utils/orderStatusSimulator'

export default function OrderTrackingPage() {
  const { id } = useParams()
  const { getOrder, updateOrderStatus } = useOrder()
  const navigate = useNavigate()
  const order = getOrder(id)
  const [currentStatus, setCurrentStatus] = useState(
    order?.status || 'received'
  )

  useEffect(() => {
    if (!order) return

    const cleanup = simulateOrderProgress((status) => {
      setCurrentStatus(status.key)
      updateOrderStatus(order.id, status.key)
    })

    return cleanup
  }, [order?.id])

  if (!order) {
    return (
      <PageContainer className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 mb-4">Pedido não encontrado</p>
        <Button onClick={() => navigate('/menu')}>Voltar ao Cardápio</Button>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6">
          <h1 className="font-display font-bold text-2xl text-gray-800">
            Acompanhar Pedido
          </h1>
          <p className="text-sm text-gray-400 font-mono">{order.id}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
          <OrderTimeline currentStatus={currentStatus} />
        </div>

        {order.unit && (
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm text-gray-800">
                  Retirar em
                </h3>
                <p className="text-sm text-gray-500">{order.unit.name}</p>
                <p className="text-xs text-gray-400">{order.unit.address}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Itens do Pedido</h3>
          <div className="space-y-2 text-sm">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-600">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span className="text-primary">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
