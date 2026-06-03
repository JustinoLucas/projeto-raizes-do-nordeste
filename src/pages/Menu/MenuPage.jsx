import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import PageContainer from '../../components/Layout/PageContainer'
import ProductCard from '../../components/Card/ProductCard'
import { useUnit } from '../../contexts/UnitContext'
import menus from '../../data/menus.json'
import { useEffect } from 'react'

export default function MenuPage() {
  const { selectedUnit } = useUnit()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')

  useEffect(() => {
    if (!selectedUnit) navigate('/')
  }, [selectedUnit, navigate])

  const products = selectedUnit ? menus[selectedUnit.id] || [] : []

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))]
    return ['Todos', ...cats]
  }, [products])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        activeCategory === 'Todos' || p.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [products, search, activeCategory])

  if (!selectedUnit) return null

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-gray-800">
          Cardápio
        </h1>
        <p className="text-sm text-gray-500">{selectedUnit.name}</p>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar no cardápio..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-primary outline-none transition-colors"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-primary text-white shadow-md shadow-primary/30'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <SlidersHorizontal className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum produto encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </PageContainer>
  )
}
