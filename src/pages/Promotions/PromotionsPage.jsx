import { Tag } from 'lucide-react'
import PageContainer from '../../components/Layout/PageContainer'
import PromoCard from '../../components/Card/PromoCard'
import promotions from '../../data/promotions.json'

export default function PromotionsPage() {
  const activePromos = promotions.filter((p) => p.active)

  return (
    <PageContainer>
      <div className="flex items-center gap-2 mb-6">
        <Tag className="w-6 h-6 text-primary" />
        <h1 className="font-display font-bold text-2xl text-gray-800">
          Promoções
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activePromos.map((promo) => (
          <PromoCard key={promo.id} promo={promo} />
        ))}
      </div>
    </PageContainer>
  )
}
