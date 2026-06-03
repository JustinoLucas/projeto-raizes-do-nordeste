import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CreditCard,
  Smartphone,
  QrCode,
  Banknote,
  Loader2,
} from 'lucide-react'
import PageContainer from '../../components/Layout/PageContainer'
import Button from '../../components/UI/Button'
import ConsentModal from '../../components/LGPD/ConsentModal'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { useOrder } from '../../contexts/OrderContext'
import { useLGPD } from '../../contexts/LGPDContext'
import { useUnit } from '../../contexts/UnitContext'
import { formatCurrency } from '../../utils/formatCurrency'
import { simulatePayment } from '../../utils/paymentSimulator'

const paymentMethods = [
  { id: 'credit', label: 'Cartão de Crédito', icon: CreditCard },
  { id: 'debit', label: 'Cartão de Débito', icon: CreditCard },
  { id: 'pix', label: 'PIX', icon: QrCode },
  { id: 'wallet', label: 'Carteira Digital', icon: Smartphone },
]

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [showLGPD, setShowLGPD] = useState(false)
  const { items, totalPrice, clearCart } = useCart()
  const { user, updateUser } = useAuth()
  const { createOrder } = useOrder()
  const { consent } = useLGPD()
  const { selectedUnit } = useUnit()
  const navigate = useNavigate()

  function handlePay() {
    if (!consent) {
      setShowLGPD(true)
      return
    }
    processPayment()
  }

  async function processPayment() {
    setProcessing(true)
    const result = await simulatePayment()

    if (result.approved) {
      const order = createOrder({
        items: [...items],
        total: totalPrice,
        paymentMethod: selectedMethod,
        transactionId: result.transactionId,
        unit: selectedUnit,
      })
      updateUser({
        loyaltyStamps: (user.loyaltyStamps || 0) + 1,
        totalOrders: (user.totalOrders || 0) + 1,
      })
      clearCart()
      navigate(`/payment/approved?orderId=${order.id}`)
    } else {
      navigate('/payment/denied')
    }
  }

  if (items.length === 0) {
    navigate('/menu')
    return null
  }

  return (
    <PageContainer>
      <h1 className="font-display font-bold text-2xl text-gray-800 mb-6">
        Pagamento
      </h1>

      {processing ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            Processando pagamento...
          </h2>
          <p className="text-gray-500 text-sm">
            Conectando com o gateway de pagamento
          </p>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="lg:col-span-2 mb-6 lg:mb-0">
            <h2 className="font-semibold text-gray-800 mb-3">
              Forma de Pagamento
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSelectedMethod(id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedMethod === id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-medium text-center">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {selectedMethod === 'pix' && (
              <div className="mt-4 p-4 bg-white rounded-xl border border-gray-100 text-center">
                <QrCode className="w-32 h-32 text-gray-800 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  QR Code simulado — escaneie para pagar
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 h-fit">
            <h3 className="font-bold text-gray-800 mb-3">Resumo</h3>

            <div className="space-y-2 text-sm mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span className="truncate mr-2">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="shrink-0">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-2">
                <div className="flex justify-between font-bold text-lg text-gray-800">
                  <span>Total</span>
                  <span className="text-primary">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handlePay}
              disabled={!selectedMethod}
              className="w-full"
            >
              <Banknote className="w-5 h-5" />
              Pagar {formatCurrency(totalPrice)}
            </Button>
          </div>
        </div>
      )}

      <ConsentModal
        open={showLGPD}
        onAccept={() => {
          setShowLGPD(false)
          processPayment()
        }}
      />
    </PageContainer>
  )
}
