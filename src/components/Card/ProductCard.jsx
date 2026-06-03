import { Plus } from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'
import { useCart } from '../../contexts/CartContext'
import { toast } from '../UI/Toast'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  function handleAdd() {
    addItem(product)
    toast(`${product.name} adicionado!`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.originalPrice && (
          <span className="absolute top-2 left-2 bg-danger text-white text-xs font-bold px-2 py-1 rounded-full">
            PROMO
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="font-bold text-gray-800 text-sm sm:text-base leading-tight">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="text-lg font-bold text-primary">
              {formatCurrency(product.price)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.available}
            className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary-dark active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
