import { Tag, Copy } from 'lucide-react'
import { toast } from '../UI/Toast'

export default function PromoCard({ promo }) {
  function handleCopyCode() {
    if (promo.code) {
      navigator.clipboard.writeText(promo.code)
      toast('Cupom copiado!')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="h-36 sm:h-44 overflow-hidden">
        <img
          src={promo.image}
          alt={promo.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-primary" />
          <h3 className="font-bold text-gray-800">{promo.title}</h3>
        </div>

        <p className="text-sm text-gray-600">{promo.description}</p>

        {promo.code && (
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 bg-accent/20 text-accent-dark px-3 py-2 rounded-lg text-sm font-mono font-bold hover:bg-accent/30 transition-colors cursor-pointer"
          >
            <span>{promo.code}</span>
            <Copy className="w-3.5 h-3.5" />
          </button>
        )}

        <p className="text-xs text-gray-400">
          Válido até {new Date(promo.validUntil).toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  )
}
