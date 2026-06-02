import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import ProfilePage from './pages/ProfilePage';
import OrderPage from './pages/OrderPage';
import Footer from './components/Footer';

function App() {
	return (
		<Router>
			<Navbar />
			<main style={{ minHeight: '80vh' }}>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/product/:id' element={<ProductPage />} />
					<Route path='/cart' element={<CartPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/shipping' element={<ShippingPage />} />
					<Route path='/payment' element={<PaymentPage />} />
					<Route path='/placeorder' element={<PlaceOrderPage />} />
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/order/:id' element={<OrderPage />} />
				</Routes>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
