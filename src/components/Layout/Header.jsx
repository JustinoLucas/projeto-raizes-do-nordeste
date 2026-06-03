import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, MapPin, LogOut } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { useUnit } from '../../contexts/UnitContext'
import { useAuth } from '../../contexts/AuthContext'
import Badge from '../UI/Badge'

export default function Header() {
  const { totalItems } = useCart()
  const { selectedUnit } = useUnit()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="text-2xl">🌿</span>
          <div className="flex flex-col">
            <span className="font-display font-bold text-primary text-lg leading-tight">
              Raízes
            </span>
            <span className="text-[10px] text-gray-500 leading-tight hidden sm:block">
              do Nordeste
            </span>
          </div>
        </Link>

        {selectedUnit && (
          <button
            onClick={() => navigate('/')}
            className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors bg-surface-dark/50 px-3 py-1.5 rounded-full"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span className="max-w-[180px] truncate">{selectedUnit.name}</span>
          </button>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/loyalty"
                className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="max-w-[100px] truncate">
                  {user.name.split(' ')[0]}
                </span>
              </Link>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-danger transition-colors"
                title="Sair"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Entrar
            </Link>
          )}

          <Link to="/cart" className="relative p-2">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary transition-colors" />
            <Badge count={totalItems} />
          </Link>
        </div>
      </div>
    </header>
  )
}
