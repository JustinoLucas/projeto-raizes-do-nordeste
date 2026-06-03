import { useNavigate } from 'react-router-dom'
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react'
import PageContainer from '../../components/Layout/PageContainer'
import CartItem from '../../components/Cart/CartItem'
import Button from '../../components/UI/Button'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { formatCurrency } from '../../utils/formatCurrency'

export default function CartPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  function handleCheckout() {
    if (!user) {
      navigate('/login')
      return
    }
    navigate('/payment')
  }

  if (items.length === 0) {
    return (
      <PageContainer className="flex flex-col items-center justify-center min-h-[60vh]">
        <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="font-bold text-xl text-gray-800 mb-2">
          Carrinho vazio
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Adicione itens deliciosos do nosso cardápio!
        </p>
        <Button onClick={() => navigate('/menu')}>Ver Cardápio</Button>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-800">
            Carrinho
          </h1>
          <p className="text-sm text-gray-500">
            {totalItems} {totalItems === 1 ? 'item' : 'itens'}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-danger transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          Limpar
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-2 space-y-3 mb-6 lg:mb-0">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 h-fit lg:sticky lg:top-24">
          <h3 className="font-bold text-gray-800 mb-4">Resumo do Pedido</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Retirada na loja</span>
              <span className="text-secondary font-medium">Grátis</span>
            </div>
            <div className="border-t border-gray-100 pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg text-gray-800">
                <span>Total</span>
                <span className="text-primary">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          <Button onClick={handleCheckout} className="w-full mt-4">
            {user ? 'Ir para Pagamento' : 'Entrar para Pagar'}
          </Button>

          <button
            onClick={() => navigate('/menu')}
            className="flex items-center justify-center gap-1.5 w-full mt-3 text-sm text-gray-500 hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Continuar comprando
          </button>
        </div>
      </div>
    </PageContainer>
  )
}
