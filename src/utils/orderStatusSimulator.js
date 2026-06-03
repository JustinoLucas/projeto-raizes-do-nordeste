const STATUSES = [
  { key: 'received', label: 'Pedido Recebido', icon: 'ClipboardCheck' },
  { key: 'preparing', label: 'Preparando', icon: 'ChefHat' },
  { key: 'ready', label: 'Pronto para Retirada', icon: 'Package' },
  { key: 'picked_up', label: 'Retirado', icon: 'CheckCircle' },
]

export { STATUSES }

export function simulateOrderProgress(onStatusChange) {
  let currentIndex = 0
  onStatusChange(STATUSES[currentIndex])

  const interval = setInterval(() => {
    currentIndex++
    if (currentIndex >= STATUSES.length) {
      clearInterval(interval)
      return
    }
    onStatusChange(STATUSES[currentIndex])
  }, 5000)

  return () => clearInterval(interval)
}
