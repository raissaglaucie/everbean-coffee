import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../redux/slices/cartSlice';

function CartPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { cartItems } = useSelector((state) => state.cart);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		navigate('/shipping');
	};

	const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
	const totalPrice = cartItems
		.reduce((acc, item) => acc + item.qty * item.price, 0)
		.toFixed(2);

	return (
		<div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
			<h1
				style={{
					fontFamily: 'Playfair Display, serif',
					color: 'var(--espresso)',
					marginBottom: '2rem',
				}}
			>
				🛒 Your Cart
			</h1>

			{cartItems.length === 0 ? (
				<div style={{ textAlign: 'center', padding: '3rem' }}>
					<p
						style={{
							fontSize: '1.2rem',
							color: 'var(--coffee)',
							marginBottom: '1rem',
						}}
					>
						Your cart is empty ☕
					</p>
					<Link to='/' style={{ color: 'var(--accent-gold)' }}>
						Browse our coffees →
					</Link>
				</div>
			) : (
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '2fr 1fr',
						gap: '2rem',
					}}
				>
					<div>
						{cartItems.map((item) => (
							<div
								key={item.product}
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									padding: '1rem',
									marginBottom: '1rem',
									backgroundColor: 'white',
									borderRadius: '12px',
									boxShadow: '0 2px 8px rgba(28,10,0,0.08)',
								}}
							>
								<div
									style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
								>
									<span style={{ fontSize: '2rem' }}>☕</span>
									<div>
										<Link
											to={`/product/${item.product}`}
											style={{
												color: 'var(--espresso)',
												textDecoration: 'none',
												fontWeight: '700',
											}}
										>
											{item.name}
										</Link>
										<p style={{ color: 'var(--latte)' }}>${item.price}</p>
									</div>
								</div>

								<div
									style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
								>
									<span style={{ color: 'var(--coffee)' }}>
										Qty: {item.qty}
									</span>
									<button
										onClick={() => removeFromCartHandler(item.product)}
										style={{
											backgroundColor: 'transparent',
											border: 'none',
											color: 'red',
											cursor: 'pointer',
											fontSize: '1rem',
										}}
									>
										🗑️
									</button>
								</div>
							</div>
						))}
					</div>

					<div
						style={{
							backgroundColor: 'white',
							borderRadius: '12px',
							padding: '1.5rem',
							boxShadow: '0 2px 8px rgba(28,10,0,0.08)',
							height: 'fit-content',
						}}
					>
						<h2
							style={{
								fontFamily: 'Playfair Display, serif',
								color: 'var(--espresso)',
								marginBottom: '1rem',
							}}
						>
							Order Summary
						</h2>
						<p style={{ color: 'var(--coffee)', marginBottom: '0.5rem' }}>
							Items: {totalItems}
						</p>
						<p
							style={{
								color: 'var(--espresso)',
								fontSize: '1.3rem',
								fontWeight: '700',
								marginBottom: '1.5rem',
							}}
						>
							Total: ${totalPrice}
						</p>
						<button
							onClick={checkoutHandler}
							style={{
								backgroundColor: 'var(--espresso)',
								color: 'var(--cream)',
								border: 'none',
								padding: '0.8rem 1.5rem',
								borderRadius: '8px',
								fontSize: '1rem',
								cursor: 'pointer',
								width: '100%',
								fontFamily: 'Lato, sans-serif',
							}}
						>
							Proceed to Checkout
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default CartPage;
