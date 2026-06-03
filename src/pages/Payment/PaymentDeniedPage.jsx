import { useNavigate } from 'react-router-dom'
import { XCircle, RefreshCw } from 'lucide-react'
import PageContainer from '../../components/Layout/PageContainer'
import Button from '../../components/UI/Button'

export default function PaymentDeniedPage() {
  const navigate = useNavigate()

  return (
    <PageContainer className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-sm">
        <div className="w-24 h-24 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-danger" />
        </div>

        <h1 className="font-display font-bold text-2xl text-gray-800 mb-2">
          Pagamento Recusado
        </h1>
        <p className="text-gray-500 mb-6">
          Não foi possível processar seu pagamento. Verifique os dados e tente
          novamente.
        </p>

        <div className="space-y-3">
          <Button onClick={() => navigate('/payment')} className="w-full">
            <RefreshCw className="w-4 h-4" />
            Tentar Novamente
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
