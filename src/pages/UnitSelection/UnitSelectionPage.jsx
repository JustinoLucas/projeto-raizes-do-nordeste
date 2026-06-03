import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import PageContainer from '../../components/Layout/PageContainer'
import UnitCard from '../../components/Card/UnitCard'
import { useUnit } from '../../contexts/UnitContext'
import units from '../../data/units.json'

export default function UnitSelectionPage() {
  const { setSelectedUnit } = useUnit()
  const navigate = useNavigate()

  function handleSelect(unit) {
    setSelectedUnit(unit)
    navigate('/menu')
  }

  return (
    <PageContainer>
      <div className="text-center mb-8">
        <span className="text-5xl mb-4 block">🌿</span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-gray-800">
          Rede Raízes do Nordeste
        </h1>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          Sabores autênticos da nossa terra. Escolha a unidade mais próxima de
          você para começar.
        </p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-primary" />
        <h2 className="font-semibold text-gray-800">Nossas Unidades</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {units.map((unit) => (
          <UnitCard key={unit.id} unit={unit} onSelect={handleSelect} />
        ))}
      </div>
    </PageContainer>
  )
}
