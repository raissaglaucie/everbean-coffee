import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../redux/slices/cartSlice';

const productImages = {
	drinks:
		'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&q=80',
	beans:
		'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&q=80',
	food: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&q=80',
	merch:
		'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200&q=80',
};

function CartPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { cartItems } = useSelector((state) => state.cart);

	const removeFromCartHandler = (id) => dispatch(removeFromCart(id));
	const checkoutHandler = () => navigate('/shipping');

	const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
	const totalPrice = cartItems
		.reduce((acc, item) => acc + item.qty * item.price, 0)
		.toFixed(2);

	return (
		<div style={{ backgroundColor: 'var(--milk-foam)', minHeight: '100vh' }}>
			{/* Header */}
			<div
				style={{
					backgroundColor: 'var(--espresso)',
					padding: '4rem 4rem 3rem',
					borderBottom: '1px solid rgba(201,169,110,0.15)',
				}}
			>
				<p
					style={{
						color: 'var(--accent-gold)',
						fontSize: '0.6rem',
						letterSpacing: '4px',
						textTransform: 'uppercase',
						fontFamily: 'Montserrat',
						marginBottom: '0.8rem',
					}}
				>
					Your Selection
				</p>
				<h1
					style={{
						fontFamily: 'Cormorant Garamond, serif',
						color: '#FFFFFF',
						fontSize: 'clamp(2.5rem, 5vw, 4rem)',
						fontWeight: '300',
						letterSpacing: '-1px',
					}}
				>
					Shopping Cart
				</h1>
			</div>

			<div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem' }}>
				{cartItems.length === 0 ? (
					<div
						style={{
							textAlign: 'center',
							padding: '8rem 2rem',
						}}
					>
						<p
							style={{
								fontFamily: 'Cormorant Garamond, serif',
								color: 'var(--coffee)',
								fontSize: '2rem',
								fontWeight: '300',
								fontStyle: 'italic',
								marginBottom: '2rem',
							}}
						>
							Your cart is empty
						</p>
						<Link
							to='/'
							style={{
								color: 'var(--accent-gold)',
								textDecoration: 'none',
								fontSize: '0.7rem',
								letterSpacing: '3px',
								textTransform: 'uppercase',
								fontFamily: 'Montserrat',
								fontWeight: '600',
								borderBottom: '1px solid var(--accent-gold)',
								paddingBottom: '0.2rem',
							}}
						>
							Explore Our Menu →
						</Link>
					</div>
				) : (
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '2fr 1fr',
							gap: '4rem',
						}}
					>
						{/* Items */}
						<div>
							{cartItems.map((item, index) => (
								<div
									key={item.product}
									style={{
										display: 'grid',
										gridTemplateColumns: '80px 1fr auto',
										gap: '1.5rem',
										alignItems: 'center',
										padding: '2rem 0',
										borderBottom: '1px solid var(--cream)',
									}}
								>
									{/* Image */}
									<div
										style={{
											width: '80px',
											height: '80px',
											overflow: 'hidden',
										}}
									>
										<img
											src={productImages[item.category] || productImages.drinks}
											alt={item.name}
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'cover',
											}}
										/>
									</div>

									{/* Details */}
									<div>
										<Link
											to={`/product/${item.product}`}
											style={{
												fontFamily: 'Cormorant Garamond, serif',
												color: 'var(--espresso)',
												textDecoration: 'none',
												fontSize: '1.3rem',
												fontWeight: '400',
												display: 'block',
												marginBottom: '0.3rem',
											}}
										>
											{item.name}
										</Link>
										<p
											style={{
												color: 'var(--accent-gold)',
												fontSize: '0.85rem',
												fontFamily: 'Montserrat',
												fontWeight: '300',
											}}
										>
											${item.price} × {item.qty}
										</p>
									</div>

									{/* Remove */}
									<button
										onClick={() => removeFromCartHandler(item.product)}
										style={{
											backgroundColor: 'transparent',
											border: 'none',
											color: 'rgba(74,37,21,0.3)',
											cursor: 'pointer',
											fontSize: '1.2rem',
											fontFamily: 'Montserrat',
											transition: 'color 0.2s',
											padding: '0.5rem',
										}}
										onMouseEnter={(e) =>
											(e.target.style.color = 'var(--coffee)')
										}
										onMouseLeave={(e) =>
											(e.target.style.color = 'rgba(74,37,21,0.3)')
										}
									>
										×
									</button>
								</div>
							))}
						</div>

						{/* Summary */}
						<div
							style={{
								position: 'sticky',
								top: '120px',
								height: 'fit-content',
							}}
						>
							<div
								style={{
									backgroundColor: 'var(--espresso)',
									padding: '2.5rem',
								}}
							>
								<h2
									style={{
										fontFamily: 'Cormorant Garamond, serif',
										color: '#FFFFFF',
										fontSize: '1.8rem',
										fontWeight: '300',
										marginBottom: '2rem',
										letterSpacing: '-0.5px',
									}}
								>
									Order Summary
								</h2>

								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginBottom: '1rem',
										paddingBottom: '1rem',
										borderBottom: '1px solid rgba(201,169,110,0.15)',
									}}
								>
									<span
										style={{
											color: 'rgba(242,232,220,0.5)',
											fontSize: '0.7rem',
											letterSpacing: '2px',
											textTransform: 'uppercase',
											fontFamily: 'Montserrat',
										}}
									>
										Items ({totalItems})
									</span>
									<span
										style={{
											color: 'var(--cream)',
											fontFamily: 'Montserrat',
											fontSize: '0.9rem',
										}}
									>
										${totalPrice}
									</span>
								</div>

								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginBottom: '2.5rem',
									}}
								>
									<span
										style={{
											fontFamily: 'Cormorant Garamond, serif',
											color: '#FFFFFF',
											fontSize: '1.3rem',
											fontWeight: '300',
										}}
									>
										Total
									</span>
									<span
										style={{
											fontFamily: 'Cormorant Garamond, serif',
											color: 'var(--accent-gold)',
											fontSize: '1.8rem',
											fontWeight: '300',
										}}
									>
										${totalPrice}
									</span>
								</div>

								<button
									onClick={checkoutHandler}
									style={{
										width: '100%',
										padding: '1.2rem',
										backgroundColor: 'var(--accent-gold)',
										color: 'var(--espresso)',
										border: 'none',
										fontSize: '0.65rem',
										fontFamily: 'Montserrat, sans-serif',
										fontWeight: '700',
										letterSpacing: '3px',
										textTransform: 'uppercase',
										cursor: 'pointer',
										transition: 'all 0.3s',
										marginBottom: '1rem',
									}}
									onMouseEnter={(e) =>
										(e.target.style.backgroundColor = '#E8C080')
									}
									onMouseLeave={(e) =>
										(e.target.style.backgroundColor = 'var(--accent-gold)')
									}
								>
									Proceed to Checkout
								</button>

								<Link
									to='/'
									style={{
										display: 'block',
										textAlign: 'center',
										color: 'rgba(242,232,220,0.4)',
										textDecoration: 'none',
										fontSize: '0.65rem',
										letterSpacing: '2px',
										textTransform: 'uppercase',
										fontFamily: 'Montserrat',
										transition: 'color 0.2s',
									}}
									onMouseEnter={(e) =>
										(e.target.style.color = 'rgba(242,232,220,0.7)')
									}
									onMouseLeave={(e) =>
										(e.target.style.color = 'rgba(242,232,220,0.4)')
									}
								>
									Continue Shopping
								</Link>

								{Number(totalPrice) < 30 && (
									<p
										style={{
											textAlign: 'center',
											color: 'rgba(201,169,110,0.5)',
											fontSize: '0.7rem',
											fontFamily: 'Montserrat',
											marginTop: '1.5rem',
											lineHeight: '1.6',
										}}
									>
										Add ${(30 - Number(totalPrice)).toFixed(2)} more for free
										shipping
									</p>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default CartPage;
