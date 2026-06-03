import { useNavigate } from 'react-router-dom'
import { Star, Gift, BookOpen } from 'lucide-react'
import PageContainer from '../../components/Layout/PageContainer'
import StampCard from '../../components/Loyalty/StampCard'
import Button from '../../components/UI/Button'
import { useAuth } from '../../contexts/AuthContext'
import loyaltyData from '../../data/loyalty.json'

export default function LoyaltyPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { program } = loyaltyData

  if (!user) {
    return (
      <PageContainer className="flex flex-col items-center justify-center min-h-[60vh]">
        <Star className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="font-bold text-xl text-gray-800 mb-2">
          Programa de Fidelidade
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Faça login para participar e acumular carimbos!
        </p>
        <Button onClick={() => navigate('/login')}>Entrar</Button>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="font-display font-bold text-2xl text-gray-800">
            {program.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">{program.description}</p>
        </div>

        <StampCard
          stamps={user.loyaltyStamps || 0}
          total={program.stampsRequired}
        />

        <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-accent-dark" />
            <h3 className="font-bold text-gray-800">Prêmio</h3>
          </div>
          <div className="bg-accent/10 rounded-xl p-4 text-center">
            <span className="text-3xl mb-2 block">🎉</span>
            <p className="font-bold text-gray-800">{program.reward}</p>
            <p className="text-xs text-gray-500 mt-1">
              Complete {program.stampsRequired} carimbos para resgatar
            </p>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-secondary" />
            <h3 className="font-bold text-gray-800">Regras</h3>
          </div>
          <ul className="space-y-2">
            {program.rules.map((rule, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="w-5 h-5 bg-secondary/10 text-secondary rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageContainer>
  )
}
