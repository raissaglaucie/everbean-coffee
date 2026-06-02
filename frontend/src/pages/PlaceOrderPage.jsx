import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createOrder } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';

function PlaceOrderPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { cartItems, shippingAddress, paymentMethod } = useSelector(
		(state) => state.cart,
	);
	const { order, success, loading, error } = useSelector(
		(state) => state.order,
	);
	const { userInfo } = useSelector((state) => state.user);

	useEffect(() => {
		if (!userInfo) navigate('/login');
	}, [userInfo, navigate]);

	useEffect(() => {
		if (success) {
			dispatch(clearCart());
			navigate(`/order/${order._id}`);
		}
	}, [success, navigate, order, dispatch]);

	const itemsPrice = cartItems
		.reduce((acc, item) => acc + item.qty * item.price, 0)
		.toFixed(2);
	const shippingPrice = itemsPrice > 30 ? 0 : 5.99;
	const taxPrice = (Number(itemsPrice) * 0.08).toFixed(2);
	const totalPrice = (
		Number(itemsPrice) +
		Number(shippingPrice) +
		Number(taxPrice)
	).toFixed(2);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
			}),
		);
	};

	const sectionStyle = {
		backgroundColor: 'white',
		borderRadius: '12px',
		padding: '1.5rem',
		marginBottom: '1rem',
		boxShadow: '0 2px 8px rgba(28,10,0,0.08)',
	};

	const rowStyle = {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '0.5rem',
		color: 'var(--coffee)',
	};

	return (
		<div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
			<h1
				style={{
					fontFamily: 'Playfair Display, serif',
					color: 'var(--espresso)',
					marginBottom: '2rem',
				}}
			>
				📋 Order Review
			</h1>

			<div
				style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}
			>
				<div>
					<div style={sectionStyle}>
						<h2
							style={{
								fontFamily: 'Playfair Display, serif',
								color: 'var(--espresso)',
								marginBottom: '1rem',
							}}
						>
							📦 Shipping
						</h2>
						<p style={{ color: 'var(--coffee)' }}>
							{shippingAddress.address}, {shippingAddress.city}{' '}
							{shippingAddress.postalCode}, {shippingAddress.country}
						</p>
					</div>

					<div style={sectionStyle}>
						<h2
							style={{
								fontFamily: 'Playfair Display, serif',
								color: 'var(--espresso)',
								marginBottom: '1rem',
							}}
						>
							💳 Payment
						</h2>
						<p style={{ color: 'var(--coffee)' }}>{paymentMethod}</p>
					</div>

					<div style={sectionStyle}>
						<h2
							style={{
								fontFamily: 'Playfair Display, serif',
								color: 'var(--espresso)',
								marginBottom: '1rem',
							}}
						>
							☕ Items
						</h2>
						{cartItems.map((item) => (
							<div
								key={item.product}
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									padding: '0.8rem 0',
									borderBottom: '1px solid var(--cream)',
								}}
							>
								<div
									style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
								>
									<span style={{ fontSize: '1.5rem' }}>☕</span>
									<Link
										to={`/product/${item.product}`}
										style={{
											color: 'var(--espresso)',
											textDecoration: 'none',
										}}
									>
										{item.name}
									</Link>
								</div>
								<span style={{ color: 'var(--coffee)' }}>
									{item.qty} x ${item.price} = $
									{(item.qty * item.price).toFixed(2)}
								</span>
							</div>
						))}
					</div>
				</div>

				<div style={{ ...sectionStyle, height: 'fit-content' }}>
					<h2
						style={{
							fontFamily: 'Playfair Display, serif',
							color: 'var(--espresso)',
							marginBottom: '1.5rem',
						}}
					>
						Order Summary
					</h2>

					<div style={rowStyle}>
						<span>Items:</span>
						<span>${itemsPrice}</span>
					</div>
					<div style={rowStyle}>
						<span>Shipping:</span>
						<span>{shippingPrice === 0 ? 'FREE' : `$${shippingPrice}`}</span>
					</div>
					<div style={rowStyle}>
						<span>Tax (8%):</span>
						<span>${taxPrice}</span>
					</div>
					<div
						style={{
							...rowStyle,
							fontWeight: '700',
							fontSize: '1.2rem',
							color: 'var(--espresso)',
							borderTop: '1px solid var(--cream)',
							paddingTop: '0.8rem',
							marginTop: '0.5rem',
						}}
					>
						<span>Total:</span>
						<span>${totalPrice}</span>
					</div>

					{error && (
						<p
							style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}
						>
							{error.detail || 'Something went wrong'}
						</p>
					)}

					<button
						onClick={placeOrderHandler}
						disabled={cartItems.length === 0 || loading}
						style={{
							width: '100%',
							padding: '0.9rem',
							backgroundColor:
								cartItems.length === 0 ? 'var(--latte)' : 'var(--espresso)',
							color: 'var(--cream)',
							border: 'none',
							borderRadius: '8px',
							fontSize: '1rem',
							cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer',
							fontFamily: 'Lato, sans-serif',
							letterSpacing: '1px',
							marginTop: '1rem',
						}}
					>
						{loading ? 'Placing Order...' : '☕ Place Order'}
					</button>

					<p
						style={{
							textAlign: 'center',
							fontSize: '0.75rem',
							color: 'var(--latte)',
							marginTop: '0.8rem',
						}}
					>
						{Number(itemsPrice) > 30
							? '🎉 Free shipping!'
							: `Add $${(30 - Number(itemsPrice)).toFixed(2)} more for free shipping`}
					</p>
				</div>
			</div>
		</div>
	);
}

export default PlaceOrderPage;
