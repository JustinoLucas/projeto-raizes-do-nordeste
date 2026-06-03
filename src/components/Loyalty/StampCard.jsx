import { Star, Gift } from 'lucide-react'

export default function StampCard({ stamps = 0, total = 10 }) {
  return (
    <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-lg">Cartão Fidelidade</h3>
          <p className="text-white/70 text-sm">
            {stamps}/{total} carimbos
          </p>
        </div>
        <Gift className="w-8 h-8 text-accent" />
      </div>

      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-xl flex items-center justify-center transition-all ${
              i < stamps
                ? 'bg-accent text-accent-dark shadow-md'
                : 'bg-white/20 text-white/40'
            }`}
          >
            <Star
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill={i < stamps ? 'currentColor' : 'none'}
            />
          </div>
        ))}
      </div>

      {stamps >= total && (
        <div className="mt-4 bg-accent text-accent-dark text-center py-2 rounded-xl font-bold text-sm animate-pulse">
          Parabéns! Resgate seu prêmio!
        </div>
      )}
    </div>
  )
}
