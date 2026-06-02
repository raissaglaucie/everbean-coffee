import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { listProductDetails } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';

const productImages = {
	drinks:
		'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=85',
	beans:
		'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&q=85',
	food: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=85',
	merch:
		'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&q=85',
};

const fallbackImage =
	'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85';

function ProductPage() {
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const { product, loading, error } = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(listProductDetails(id));
	}, [dispatch, id]);

	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, product: product._id, qty }));
		navigate('/cart');
	};

	if (loading)
		return (
			<div
				style={{
					height: '80vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'var(--espresso)',
					fontFamily: 'Cormorant Garamond, serif',
					color: 'var(--accent-gold)',
					fontSize: '1.5rem',
					fontWeight: '300',
					letterSpacing: '3px',
				}}
			>
				Brewing...
			</div>
		);

	if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>;

	return (
		<div style={{ backgroundColor: 'var(--milk-foam)', minHeight: '100vh' }}>
			{/* Back button */}
			<div
				style={{
					padding: '2rem 3rem',
					borderBottom: '1px solid var(--cream)',
					backgroundColor: 'var(--milk-foam)',
				}}
			>
				<button
					onClick={() => navigate(-1)}
					style={{
						backgroundColor: 'transparent',
						border: 'none',
						color: 'var(--coffee)',
						cursor: 'pointer',
						fontFamily: 'Montserrat, sans-serif',
						fontSize: '0.7rem',
						letterSpacing: '2px',
						textTransform: 'uppercase',
						display: 'flex',
						alignItems: 'center',
						gap: '0.8rem',
					}}
				>
					← Back to Menu
				</button>
			</div>

			{/* Main content */}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					minHeight: '80vh',
				}}
			>
				{/* Image */}
				<div
					style={{
						position: 'relative',
						overflow: 'hidden',
						minHeight: '600px',
					}}
				>
					<img
						src={productImages[product.category] || fallbackImage}
						alt={product.name}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							objectPosition: 'center',
						}}
					/>
					<div
						style={{
							position: 'absolute',
							inset: 0,
							background:
								'linear-gradient(to right, rgba(13,7,5,0.2) 0%, transparent 100%)',
						}}
					/>
				</div>

				{/* Details */}
				<div
					style={{
						padding: '5rem 4rem',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						backgroundColor: 'var(--milk-foam)',
					}}
				>
					{/* Category & Origin */}
					<p
						style={{
							color: 'var(--accent-gold)',
							fontSize: '0.65rem',
							letterSpacing: '4px',
							textTransform: 'uppercase',
							fontFamily: 'Montserrat',
							marginBottom: '1.5rem',
						}}
					>
						{product.category}
						{product.origin && ` · ${product.origin}`}
					</p>

					{/* Name */}
					<h1
						style={{
							fontFamily: 'Cormorant Garamond, serif',
							color: 'var(--espresso)',
							fontSize: 'clamp(2.5rem, 4vw, 4rem)',
							fontWeight: '300',
							lineHeight: '1.05',
							marginBottom: '1.5rem',
							letterSpacing: '-1px',
						}}
					>
						{product.name}
					</h1>

					{/* Rating */}
					{product.rating > 0 && (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
								marginBottom: '2rem',
							}}
						>
							<div style={{ display: 'flex', gap: '0.2rem' }}>
								{[1, 2, 3, 4, 5].map((star) => (
									<span
										key={star}
										style={{
											color:
												star <= Math.round(product.rating)
													? 'var(--accent-gold)'
													: 'var(--cream)',
											fontSize: '0.8rem',
										}}
									>
										★
									</span>
								))}
							</div>
							<span
								style={{
									color: 'var(--coffee)',
									fontSize: '0.75rem',
									fontFamily: 'Montserrat',
								}}
							>
								{product.rating} ({product.numReviews} reviews)
							</span>
						</div>
					)}

					{/* Divider */}
					<div
						style={{
							width: '40px',
							height: '1px',
							backgroundColor: 'var(--accent-gold)',
							marginBottom: '2rem',
						}}
					/>

					{/* Description */}
					<p
						style={{
							color: 'var(--coffee)',
							fontSize: '0.95rem',
							lineHeight: '2',
							fontWeight: '300',
							marginBottom: '2.5rem',
							maxWidth: '420px',
						}}
					>
						{product.description}
					</p>

					{/* Details */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '0.8rem',
							marginBottom: '2.5rem',
							padding: '1.5rem',
							backgroundColor: 'var(--cream)',
						}}
					>
						{product.origin && (
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<span
									style={{
										color: 'var(--coffee)',
										fontSize: '0.7rem',
										letterSpacing: '2px',
										textTransform: 'uppercase',
										fontFamily: 'Montserrat',
									}}
								>
									Origin
								</span>
								<span
									style={{
										color: 'var(--espresso)',
										fontSize: '0.85rem',
										fontFamily: 'Cormorant Garamond',
										fontWeight: '600',
									}}
								>
									{product.origin}
								</span>
							</div>
						)}
						{product.roast_level && (
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<span
									style={{
										color: 'var(--coffee)',
										fontSize: '0.7rem',
										letterSpacing: '2px',
										textTransform: 'uppercase',
										fontFamily: 'Montserrat',
									}}
								>
									Roast
								</span>
								<span
									style={{
										color: 'var(--espresso)',
										fontSize: '0.85rem',
										fontFamily: 'Cormorant Garamond',
										fontWeight: '600',
										textTransform: 'capitalize',
									}}
								>
									{product.roast_level}
								</span>
							</div>
						)}
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span
								style={{
									color: 'var(--coffee)',
									fontSize: '0.7rem',
									letterSpacing: '2px',
									textTransform: 'uppercase',
									fontFamily: 'Montserrat',
								}}
							>
								Availability
							</span>
							<span
								style={{
									color: product.countInStock > 0 ? '#2D6A4F' : '#E63946',
									fontSize: '0.85rem',
									fontFamily: 'Montserrat',
									fontWeight: '600',
								}}
							>
								{product.countInStock > 0 ? 'In Stock' : 'Sold Out'}
							</span>
						</div>
					</div>

					{/* Price & Add to Cart */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: '1.5rem',
						}}
					>
						<p
							style={{
								fontFamily: 'Cormorant Garamond, serif',
								color: 'var(--espresso)',
								fontSize: '2.5rem',
								fontWeight: '300',
							}}
						>
							${product.price}
						</p>

						{product.countInStock > 0 && (
							<div
								style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
							>
								<span
									style={{
										color: 'var(--coffee)',
										fontSize: '0.7rem',
										letterSpacing: '2px',
										textTransform: 'uppercase',
										fontFamily: 'Montserrat',
									}}
								>
									Qty
								</span>
								<select
									value={qty}
									onChange={(e) => setQty(Number(e.target.value))}
									style={{
										padding: '0.5rem 1rem',
										border: '1px solid var(--latte)',
										backgroundColor: 'transparent',
										color: 'var(--espresso)',
										fontFamily: 'Montserrat',
										fontSize: '0.85rem',
										cursor: 'pointer',
									}}
								>
									{[...Array(Math.min(product.countInStock, 10)).keys()].map(
										(x) => (
											<option key={x + 1} value={x + 1}>
												{x + 1}
											</option>
										),
									)}
								</select>
							</div>
						)}
					</div>

					<button
						onClick={addToCartHandler}
						disabled={product.countInStock === 0}
						style={{
							backgroundColor:
								product.countInStock > 0 ? 'var(--espresso)' : 'var(--cream)',
							color:
								product.countInStock > 0 ? 'var(--cream)' : 'var(--coffee)',
							border: 'none',
							padding: '1.2rem 3rem',
							fontSize: '0.7rem',
							fontFamily: 'Montserrat, sans-serif',
							fontWeight: '600',
							letterSpacing: '3px',
							textTransform: 'uppercase',
							cursor: product.countInStock > 0 ? 'pointer' : 'not-allowed',
							transition: 'all 0.3s',
							width: '100%',
						}}
						onMouseEnter={(e) => {
							if (product.countInStock > 0)
								e.target.style.backgroundColor = 'var(--coffee)';
						}}
						onMouseLeave={(e) => {
							if (product.countInStock > 0)
								e.target.style.backgroundColor = 'var(--espresso)';
						}}
					>
						{product.countInStock > 0 ? 'Add to Cart' : 'Sold Out'}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductPage;
