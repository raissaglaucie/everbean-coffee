import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { listProductDetails } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';

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

	if (loading) return <p style={{ padding: '2rem' }}>Loading...</p>;
	if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>;

	return (
		<div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
			<button
				onClick={() => navigate(-1)}
				style={{
					backgroundColor: 'transparent',
					border: '1px solid var(--coffee)',
					color: 'var(--coffee)',
					padding: '0.5rem 1rem',
					borderRadius: '8px',
					cursor: 'pointer',
					marginBottom: '2rem',
					fontFamily: 'Lato, sans-serif',
				}}
			>
				← Back
			</button>

			<div
				style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}
			>
				<div
					style={{
						backgroundColor: 'var(--cream)',
						borderRadius: '16px',
						height: '350px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: '5rem',
					}}
				>
					☕
				</div>

				<div>
					<h1
						style={{
							fontFamily: 'Playfair Display, serif',
							color: 'var(--espresso)',
							fontSize: '2rem',
							marginBottom: '1rem',
						}}
					>
						{product.name}
					</h1>

					<p
						style={{
							color: 'var(--latte)',
							fontSize: '1.8rem',
							fontWeight: '700',
							marginBottom: '1rem',
						}}
					>
						${product.price}
					</p>

					{product.origin && (
						<p style={{ marginBottom: '0.5rem', color: 'var(--coffee)' }}>
							🌍 <strong>Origin:</strong> {product.origin}
						</p>
					)}

					{product.roast_level && (
						<p style={{ marginBottom: '0.5rem', color: 'var(--coffee)' }}>
							🔥 <strong>Roast:</strong> {product.roast_level}
						</p>
					)}

					<p
						style={{
							margin: '1rem 0',
							color: 'var(--text-dark)',
							lineHeight: '1.6',
						}}
					>
						{product.description}
					</p>

					<p
						style={{
							marginBottom: '1rem',
							color: product.countInStock > 0 ? 'green' : 'red',
						}}
					>
						{product.countInStock > 0 ? '✅ In Stock' : '❌ Out of Stock'}
					</p>

					{product.countInStock > 0 && (
						<div style={{ marginBottom: '1rem' }}>
							<label style={{ color: 'var(--coffee)', marginRight: '0.5rem' }}>
								Qty:
							</label>
							<select
								value={qty}
								onChange={(e) => setQty(Number(e.target.value))}
								style={{
									padding: '0.3rem 0.6rem',
									borderRadius: '6px',
									border: '1px solid var(--latte)',
									color: 'var(--espresso)',
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

					<button
						onClick={addToCartHandler}
						disabled={product.countInStock === 0}
						style={{
							backgroundColor: 'var(--espresso)',
							color: 'var(--cream)',
							border: 'none',
							padding: '0.8rem 2rem',
							borderRadius: '8px',
							fontSize: '1rem',
							cursor: product.countInStock > 0 ? 'pointer' : 'not-allowed',
							fontFamily: 'Lato, sans-serif',
							letterSpacing: '1px',
							width: '100%',
						}}
					>
						🛒 Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductPage;
