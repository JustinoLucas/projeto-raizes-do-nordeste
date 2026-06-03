import { Minus, Plus, Trash2 } from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'
import { useCart } from '../../contexts/CartContext'

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-3 bg-white p-3 rounded-xl border border-gray-100">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 rounded-lg object-cover shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-800 text-sm truncate">
          {item.name}
        </h4>
        <p className="text-primary font-bold text-sm mt-1">
          {formatCurrency(item.price * item.quantity)}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-sm font-semibold w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => removeItem(item.id)}
            className="ml-auto w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-danger hover:bg-danger/10 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
