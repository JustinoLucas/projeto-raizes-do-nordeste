import { NavLink } from 'react-router-dom'
import { UtensilsCrossed, ShoppingCart, ClipboardList, Star, Tag } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import Badge from '../UI/Badge'

const navItems = [
  { to: '/menu', icon: UtensilsCrossed, label: 'Cardápio' },
  { to: '/cart', icon: ShoppingCart, label: 'Carrinho', showBadge: true },
  { to: '/orders', icon: ClipboardList, label: 'Pedidos' },
  { to: '/loyalty', icon: Star, label: 'Fidelidade' },
  { to: '/promotions', icon: Tag, label: 'Promoções' },
]

export default function BottomNav() {
  const { totalItems } = useCart()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] sm:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ to, icon: Icon, label, showBadge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors relative py-1 px-2 ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`
            }
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {showBadge && <Badge count={totalItems} className="!-top-1.5 !-right-2.5 !w-4 !h-4 !text-[9px]" />}
            </div>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
