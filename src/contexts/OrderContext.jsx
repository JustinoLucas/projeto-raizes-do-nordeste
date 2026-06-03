import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const OrderContext = createContext()

export function OrderProvider({ children }) {
  const [orders, setOrders] = useLocalStorage('orders', [])

  function createOrder(orderData) {
    const order = {
      id: `ORD-${Date.now()}`,
      ...orderData,
      status: 'received',
      createdAt: new Date().toISOString(),
    }
    setOrders((prev) => [order, ...prev])
    return order
  }

  function updateOrderStatus(orderId, status) {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    )
  }

  function getOrder(orderId) {
    return orders.find((o) => o.id === orderId)
  }

  return (
    <OrderContext.Provider
      value={{ orders, createOrder, updateOrderStatus, getOrder }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (!context) throw new Error('useOrder must be used within OrderProvider')
  return context
}
