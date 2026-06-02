import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../redux/slices/productSlice';

function HomePage() {
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<div style={{ padding: '2rem' }}>
			<h1
				style={{
					fontFamily: 'Playfair Display, serif',
					color: 'var(--espresso)',
					marginBottom: '2rem',
					fontSize: '2.5rem',
				}}
			>
				Our Coffees ☕
			</h1>

			{loading && <p>Loading...</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
					gap: '1.5rem',
				}}
			>
				{products.map((product) => (
					<Link
						key={product._id}
						to={`/product/${product._id}`}
						style={{ textDecoration: 'none' }}
					>
						<div
							style={{
								backgroundColor: 'white',
								borderRadius: '12px',
								padding: '1.5rem',
								boxShadow: '0 2px 8px rgba(28,10,0,0.1)',
								transition: 'transform 0.2s, box-shadow 0.2s',
								cursor: 'pointer',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'translateY(-4px)';
								e.currentTarget.style.boxShadow =
									'0 8px 20px rgba(28,10,0,0.15)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = '0 2px 8px rgba(28,10,0,0.1)';
							}}
						>
							<h3 style={{ color: 'var(--coffee)', marginBottom: '0.5rem' }}>
								{product.name}
							</h3>
							<p
								style={{
									color: 'var(--latte)',
									fontWeight: '700',
									fontSize: '1.1rem',
								}}
							>
								${product.price}
							</p>
							{product.category && (
								<span
									style={{
										display: 'inline-block',
										marginTop: '0.5rem',
										padding: '0.2rem 0.6rem',
										backgroundColor: 'var(--cream)',
										color: 'var(--coffee)',
										borderRadius: '20px',
										fontSize: '0.75rem',
										textTransform: 'uppercase',
										letterSpacing: '1px',
									}}
								>
									{product.category}
								</span>
							)}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default HomePage;
