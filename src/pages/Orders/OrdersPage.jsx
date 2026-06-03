import { useNavigate } from 'react-router-dom'
import { ClipboardList, ChevronRight, RotateCcw } from 'lucide-react'
import PageContainer from '../../components/Layout/PageContainer'
import Button from '../../components/UI/Button'
import { useOrder } from '../../contexts/OrderContext'
import { useAuth } from '../../contexts/AuthContext'
import { formatCurrency } from '../../utils/formatCurrency'

const statusLabels = {
  received: 'Recebido',
  preparing: 'Preparando',
  ready: 'Pronto',
  picked_up: 'Retirado',
}

const statusColors = {
  received: 'bg-blue-100 text-blue-700',
  preparing: 'bg-amber-100 text-amber-700',
  ready: 'bg-green-100 text-green-700',
  picked_up: 'bg-gray-100 text-gray-600',
}

function handleClearCache() {
  if (window.confirm('Isso vai limpar todos os dados (login, carrinho, pedidos, fidelidade). Deseja continuar?')) {
    localStorage.clear()
    window.location.href = '/'
  }
}

export default function OrdersPage() {
  const { orders } = useOrder()
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return (
      <PageContainer className="flex flex-col items-center justify-center min-h-[60vh]">
        <ClipboardList className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="font-bold text-xl text-gray-800 mb-2">Meus Pedidos</h2>
        <p className="text-gray-500 text-sm mb-6">
          Faça login para ver seus pedidos
        </p>
        <Button onClick={() => navigate('/login')}>Entrar</Button>
      </PageContainer>
    )
  }

  if (orders.length === 0) {
    return (
      <PageContainer className="flex flex-col items-center justify-center min-h-[60vh]">
        <ClipboardList className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="font-bold text-xl text-gray-800 mb-2">
          Nenhum pedido ainda
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Que tal experimentar nossos sabores?
        </p>
        <Button onClick={() => navigate('/menu')}>Ver Cardápio</Button>

        <button
          onClick={handleClearCache}
          className="mt-8 flex items-center gap-1.5 text-xs text-gray-400 hover:text-danger transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Resetar dados do app
        </button>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-gray-800">
          Meus Pedidos
        </h1>
        <button
          onClick={handleClearCache}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-danger transition-colors cursor-pointer"
          title="Limpar todos os dados e recomeçar"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Resetar
        </button>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <button
            key={order.id}
            onClick={() => navigate(`/order/${order.id}`)}
            className="w-full bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition-shadow text-left cursor-pointer"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-sm text-gray-800 font-semibold">
                  {order.id}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    statusColors[order.status]
                  }`}
                >
                  {statusLabels[order.status]}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {order.items.map((i) => i.name).join(', ')}
              </p>
              <p className="text-sm font-bold text-primary mt-1">
                {formatCurrency(order.total)}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
          </button>
        ))}
      </div>
    </PageContainer>
  )
}
