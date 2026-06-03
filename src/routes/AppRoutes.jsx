import { Routes, Route } from 'react-router-dom'
import UnitSelectionPage from '../pages/UnitSelection/UnitSelectionPage'
import LoginPage from '../pages/Login/LoginPage'
import RegisterPage from '../pages/Register/RegisterPage'
import MenuPage from '../pages/Menu/MenuPage'
import CartPage from '../pages/Cart/CartPage'
import PaymentPage from '../pages/Payment/PaymentPage'
import PaymentApprovedPage from '../pages/Payment/PaymentApprovedPage'
import PaymentDeniedPage from '../pages/Payment/PaymentDeniedPage'
import OrderTrackingPage from '../pages/OrderTracking/OrderTrackingPage'
import OrdersPage from '../pages/Orders/OrdersPage'
import LoyaltyPage from '../pages/Loyalty/LoyaltyPage'
import PromotionsPage from '../pages/Promotions/PromotionsPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UnitSelectionPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment/approved" element={<PaymentApprovedPage />} />
      <Route path="/payment/denied" element={<PaymentDeniedPage />} />
      <Route path="/order/:id" element={<OrderTrackingPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/loyalty" element={<LoyaltyPage />} />
      <Route path="/promotions" element={<PromotionsPage />} />
    </Routes>
  )
}
