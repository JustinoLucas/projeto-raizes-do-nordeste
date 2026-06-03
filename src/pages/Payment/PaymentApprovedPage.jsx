import { useSearchParams, useNavigate } from 'react-router-dom'
import { CheckCircle, ArrowRight, MapPin, Clock, Receipt } from 'lucide-react'
import PageContainer from '../../components/Layout/PageContainer'
import Button from '../../components/UI/Button'
import { useOrder } from '../../contexts/OrderContext'
import { useAuth } from '../../contexts/AuthContext'
import { formatCurrency } from '../../utils/formatCurrency'

export default function PaymentApprovedPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { getOrder } = useOrder()
  const { user } = useAuth()
  const orderId = searchParams.get('orderId')
  const order = orderId ? getOrder(orderId) : null

  return (
    <PageContainer className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>

          <h1 className="font-display font-bold text-2xl text-gray-800 mb-2">
            Pagamento Aprovado!
          </h1>
          <p className="text-gray-500">
            Seu pedido foi confirmado e já está sendo preparado.
          </p>
        </div>

        {order && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Receipt className="w-4 h-4" />
              <span className="font-mono font-semibold text-gray-700">{order.id}</span>
            </div>

            {order.unit && (
              <div className="flex items-start gap-3 p-3 bg-secondary/5 rounded-xl">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Retirar em</p>
                  <p className="text-sm text-gray-600">{order.unit.name}</p>
                  <p className="text-xs text-gray-400">{order.unit.address}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-xl">
              <Clock className="w-5 h-5 text-accent-dark" />
              <p className="text-sm text-gray-700">
                Tempo estimado: <strong>15–25 minutos</strong>
              </p>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Itens do pedido</h3>
              <div className="space-y-1 text-sm">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-600">
                    <span>{item.quantity}x {item.name}</span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-gray-50">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>

            {user && (
              <p className="text-xs text-center text-secondary font-medium">
                +1 carimbo adicionado ao seu Cartão Fidelidade!
              </p>
            )}
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={() => navigate(`/order/${orderId}`)}
            className="w-full"
          >
            Acompanhar Pedido
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/menu')}
            className="w-full"
          >
            Voltar ao Cardápio
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}
