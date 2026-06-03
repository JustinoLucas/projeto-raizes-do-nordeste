import { MapPin, Clock, Phone } from 'lucide-react'

export default function UnitCard({ unit, onSelect }) {
  return (
    <button
      onClick={() => onSelect(unit)}
      className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all text-left group cursor-pointer"
    >
      <div className="h-40 sm:h-48 overflow-hidden">
        <img
          src={unit.image}
          alt={unit.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-gray-800 text-base sm:text-lg group-hover:text-primary transition-colors">
          {unit.name}
        </h3>

        <div className="flex items-start gap-2 text-sm text-gray-500">
          <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{unit.address}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{unit.hours}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Phone className="w-3.5 h-3.5" />
          <span>{unit.phone}</span>
        </div>
      </div>
    </button>
  )
}
