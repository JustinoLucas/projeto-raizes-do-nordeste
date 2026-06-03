import { BrowserRouter } from 'react-router-dom'
import { UnitProvider } from './contexts/UnitContext'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { OrderProvider } from './contexts/OrderContext'
import { LGPDProvider } from './contexts/LGPDContext'
import Header from './components/Layout/Header'
import BottomNav from './components/Layout/BottomNav'
import ToastContainer from './components/UI/Toast'
import ActiveOrderBanner from './components/Order/ActiveOrderBanner'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <UnitProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <LGPDProvider>
                <div className="min-h-dvh flex flex-col">
                  <Header />
                  <div className="flex-1">
                    <AppRoutes />
                  </div>
                  <ActiveOrderBanner />
                  <BottomNav />
                  <ToastContainer />
                </div>
              </LGPDProvider>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </UnitProvider>
    </BrowserRouter>
  )
}
